import { Timestamp } from 'firebase/firestore';

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
  publicationDate: Timestamp | Date;
  lastModifiedDate: Timestamp | Date;
  tags: string[];
  imageUrl: string;
  url: string;
}
