export type Category = {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCategoryInput = {
  name: string;
  slug: string;
};

export type UpdateCategoryInput = {
  name?: string;
  slug?: string;
};