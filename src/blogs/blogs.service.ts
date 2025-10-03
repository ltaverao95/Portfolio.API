import { firestoreDb } from "../config/firebase";
import { Blog } from "./models/blog.model";
import { BlogDto } from "./models/blog-dto.model";

export namespace BlogService {
  export const getBlogs = async (limit: number = 20): Promise<Blog[]> => {
    const blogs: Blog[] = [];

    const querySnapshot = await firestoreDb
      .collection("blogPosts")
      .limit(limit)
      .get();

    querySnapshot.forEach((doc) => {
      blogs.push({ id: doc.id, ...doc.data() } as Blog);
    });
    return blogs;
  };

  export const createBlog = async (blogDto: BlogDto): Promise<Blog> => {
    const { translations, imageUrl, url, tags } = blogDto;

    const title: { [key: string]: string } = {};
    const content: { [key: string]: string } = {};
    translations.forEach((t) => {
      title[t.lang] = t.title;
      content[t.lang] = t.content;
    });

    const newBlog: Omit<Blog, "id"> = {
      title,
      content,
      defaultLanguage: translations[0].lang,
      authorId: "admin", // Assuming a default author for now
      publicationDate: new Date(),
      lastModifiedDate: new Date(),
      tags: tags.split(",").map((tag) => tag.trim()),
      imageUrl,
      url,
    };

    const docRef = await firestoreDb.collection("blogPosts").add(newBlog);

    return { id: docRef.id, ...newBlog } as Blog;
  };

  /**
   * Updates an existing blog post.
   * @param blogId The ID of the blog to update.
   * @param blogDto The data to update the blog with.
   * @param userId The ID of the user attempting to update the blog.
   * @returns The updated blog post.
   * @throws An error if the blog is not found or the user is not the author.
   */
  export const updateBlog = async (
    blogId: string,
    blogDto: BlogDto,
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

    const { translations, imageUrl, url, tags } = blogDto;

    const title: { [key: string]: string } = {};
    const content: { [key: string]: string } = {};
    translations.forEach((t) => {
      title[t.lang] = t.title;
      content[t.lang] = t.content;
    });

    const updatedBlog: Partial<Blog> = {
      title,
      content,
      lastModifiedDate: new Date(),
      tags: tags.split(",").map((tag) => tag.trim()),
      imageUrl,
      url,
    };

    await blogRef.update(updatedBlog);

    const newDoc = await blogRef.get();
    return { id: newDoc.id, ...newDoc.data() } as Blog;
  };
}