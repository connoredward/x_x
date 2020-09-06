export type Project = {
  _id?: string;
  title?: string;
  img?: string;
  video?: string;
  createdAt?: string;
  updatedAt?: string;
  slug?: string;
  category?: string;
  row?: number;
  column?: number;
};

export type User = {
  id: number;
  name: string;
};
