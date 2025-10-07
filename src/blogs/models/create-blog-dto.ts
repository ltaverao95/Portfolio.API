export interface CreateBlogDto {
  id: string;
  title: { [key: string]: string };
  content: { [key: string]: string };
  defaultLanguage: string;
  authorId: string;
  tags: string[];
  imageUrl: string;
  url: string;
}
