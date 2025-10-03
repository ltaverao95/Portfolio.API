import { firestoreDb } from "../config/firebase";
import { Blog } from "./blogs.model";

export namespace BlogService {
  export const getBlogs = async (): Promise<Blog[]> => {
    const blogs: Blog[] = [];

    const querySnapshot = await firestoreDb.collection("blogPosts").get();

    querySnapshot.forEach((doc) => {
      blogs.push({ id: doc.id, ...doc.data() } as Blog);
    });
    return blogs;
  };
}
