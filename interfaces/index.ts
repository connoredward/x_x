export type Post = {
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
  status?: string;
  uploadStatus?: string;
  tag?: string;
};

export type User = {
  id: number;
  name: string;
};

export type Content = {
  id?: string;
  title?: string;
  slug?: string;
  post?: string;
  img?: string;
  row?: number;
  column?: number;
  published?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};
