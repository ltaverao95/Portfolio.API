export interface UpdateBlogDto {
  id: string;
  title: { [key: string]: string };
  content: { [key: string]: string };
  tags: string[];
  imageUrl: string;
  url: string;
}
