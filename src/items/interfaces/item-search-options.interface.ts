export interface ItemSearchOptions {
  sellerId?: number;
  userId?: number;
  categoryId?: number;
  exclude?: boolean;
  orderBy?: string;
  dir?: 'ASC' | 'DESC';
}
