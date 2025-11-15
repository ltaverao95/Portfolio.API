import { firestoreDb } from "../config/firebase";
import { Blog } from "./models/blog.model";
import { CreateBlogDto } from "./models/create-blog-dto";
import { UpdateBlogDto } from "./models/update-blog-dto";
import { CacheService } from "../cache/cache.service";

const blogCache = new CacheService<Blog[]>();

export namespace BlogService {
  
  const maximumBlogsAllowed = 20;

  /**
   * Retrieves a list of blog posts.
   * @param limit The maximum number of blog posts to retrieve.
   * @returns A promise that resolves to an array of blog posts.
   */
  export const getBlogs = async (
    limit: number = null
  ): Promise<Blog[]> => {

    if (!limit || limit <= 0 || limit > maximumBlogsAllowed) {
      limit = maximumBlogsAllowed;
    }

    const cacheKey = `blogs_limit_${limit}`;
    const cachedBlogs = blogCache.get(cacheKey);

    if (cachedBlogs) {
      return cachedBlogs;
    }

    const blogs: Blog[] = [];

    const querySnapshot = await firestoreDb
      .collection("blogPosts")
      .where("archived", "!=", true)
      .limit(limit)
      .get();

    querySnapshot.forEach((doc) => {
      const { archived, ...data } = doc.data();
      blogs.push({ id: doc.id, ...data } as Blog);
    });

    blogCache.set(cacheKey, blogs);
    return blogs;
  };

  /**
   * Creates a new blog post.
   * @param userId The ID of the user creating the blog.
   * @param createBlogDto The data for the new blog post.
   * @returns The created blog post.
   */
  export const createBlog = async (
    userId: string,
    createBlogDto: CreateBlogDto
  ): Promise<Blog> => {
    const newBlog: Omit<Blog, "id"> = {
      title: createBlogDto.title,
      content: createBlogDto.content,
      defaultLanguage: createBlogDto.defaultLanguage,
      authorId: userId,
      publicationDate: new Date().toISOString(),
      lastModifiedDate: new Date().toISOString(),
      tags: createBlogDto.tags,
      imageUrl: createBlogDto.imageUrl,
      url: createBlogDto.url,
      archived: false,
    };
    const docRef = await firestoreDb.collection("blogPosts").add(newBlog);

    blogCache.clear();
    return { id: docRef.id, ...newBlog } as Blog;
  };

  /**
   * Updates an existing blog post.
   * @param blogId The ID of the blog to update.
   * @param updateBlogDto The data to update the blog with.
   * @param userId The ID of the user attempting to update the blog.
   * @returns The updated blog post.
   * @throws An error if the blog is not found or the user is not the author.
   */
  export const updateBlog = async (
    blogId: string,
    updateBlogDto: UpdateBlogDto,
    userId: string
  ): Promise<Blog> => {
    const blogRef = firestoreDb.collection("blogPosts").doc(blogId);
    const doc = await blogRef.get();

    if (!doc.exists) {
      throw new Error("Blog not found");
    }

    const blog = { id: doc.id, ...doc.data() } as Blog;

    if (blog.authorId !== userId) {
      throw new Error("User is not the author of this blog");
    }

    const updatedBlog: Partial<Blog> = {
      title: updateBlogDto.title,
      content: updateBlogDto.content,
      lastModifiedDate: new Date(),
      tags: updateBlogDto.tags,
      imageUrl: updateBlogDto.imageUrl,
      url: updateBlogDto.url,
    };

    await blogRef.update(updatedBlog);

    blogCache.clear();
    const newDoc = await blogRef.get();
    return { id: newDoc.id, ...newDoc.data() } as Blog;
  };

  /**
   * Deletes a blog post.
   * @param blogId The ID of the blog to delete.
   * @param userId The ID of the user attempting to delete the blog.
   * @throws An error if the blog is not found or the user is not the author.
   */
  export const deleteBlogById = async (
    blogId: string,
    userId: string
  ): Promise<void> => {
    const blogRef = firestoreDb.collection("blogPosts").doc(blogId);
    const doc = await blogRef.get();

    if (!doc.exists) {
      throw new Error("Blog not found");
    }

    const blog = { id: doc.id, ...doc.data() } as Blog;

    if (blog.authorId !== userId) {
      throw new Error("User is not the author of this blog");
    }

    await blogRef.update({ archived: true, lastModifiedDate: new Date() });
    blogCache.clear();
  };

  /**
   * Deletes multiple blog posts in a batch.
   * @param blogIds An array of blog IDs to delete.
   * @param userId The ID of the user attempting to delete the blogs.
   * @throws An error if any of the blogs are not found or the user is not the author.
   */
  export const deleteBlogs = async (
    blogIds: string[],
    userId: string
  ): Promise<void> => {
    const batch = firestoreDb.batch();
    const blogRefs = blogIds.map((id) =>
      firestoreDb.collection("blogPosts").doc(id)
    );

    const blogDocs = await firestoreDb.getAll(...blogRefs);

    for (const doc of blogDocs) {
      if (!doc.exists) {
        throw new Error(`Blog with ID ${doc.id} not found`);
      }
      const blog = { id: doc.id, ...doc.data() } as Blog;
      if (blog.authorId !== userId) {
        throw new Error(`User is not the author of blog with ID ${doc.id}`);
      }
      batch.update(doc.ref, { archived: true, lastModifiedDate: new Date() });
    }

    await batch.commit();
    blogCache.clear();
  };
}
