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
}