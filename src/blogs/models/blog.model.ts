export interface Blog {
  id: string;
  title: {
    [key: string]: string;
  };
  content: {
    [key: string]: string;
  };
  defaultLanguage: string;
  authorId: string;
  publicationDate: Date;
  lastModifiedDate: Date;
  tags: string[];
  imageUrl: string;
  url: string;
}
