import { Prisma } from '@prisma/client';

export enum NewsSortField {
  title = 'title',
  createdAt = 'createdAt',
  publishedAt = 'publishedAt',
}

export enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}

export interface NewsQueryParams {
  categoryId?: string;
  published?: boolean;
  page: number;
  limit: number;
  sortBy: NewsSortField;
  order: SortDirection;
}

export interface NewsItemResponse {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string | null;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  user: {
    id: string;
    email: string;
    fullName: string;
  } | null;

  newsCategory: {
    id: string;
    slug: string;
    title: string;
  } | null;
}

export interface NewsListResponse {
  items: NewsItemResponse[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}