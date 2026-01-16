export const NEWS_DEFAULTS = {
  PAGE: 1,
  LIMIT: 18,
  MAX_LIMIT: 50,
  SORT_BY: 'publishedAt' as const,
  SORT_ORDER: 'desc' as const,
  SLUG_SEPARATOR: '-',
} as const;

export const NEWS_ERRORS = {
  NOT_FOUND: 'News article not found',
  SLUG_CONFLICT: 'This slug is already in use',
  CATEGORY_NOT_FOUND: 'Specified category does not exist',
  UNAUTHORIZED: 'Only administrators can create, update or delete news',
  IMAGE_REQUIRED_ON_CREATE: 'Image is required when creating a new article',
  SELF_DEMOTION_FORBIDDEN: 'You cannot downgrade your own role',
} as const;

export const NEWS_VALIDATION = {
  TITLE_MIN: 5,
  TITLE_MAX: 200,
  CONTENT_MIN: 20,
} as const;
