export const DEFAULT_CATEGORY_SLUG = "masculino";

export type CategoryFilter =
  | { category: { $in: (string | null)[] } }
  | { category: string };

export const buildCategoryFilter = (
  categoryId: string,
  slug: string
): CategoryFilter =>
  slug === DEFAULT_CATEGORY_SLUG
    ? { category: { $in: [categoryId, null] } }
    : { category: categoryId };