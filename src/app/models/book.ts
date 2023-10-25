export interface book{
  id: string;
  volumeInfo:{
    title: string;
    subtitle: string;
    authors: any;
    categories: any;
    publishedDate: Date;
    description: string;
  }
};
