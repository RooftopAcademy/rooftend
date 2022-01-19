/*
 * @param sellerId - Show only items published by the user with this id
 * @param categoryId - Show only items published in the category with this id
 * @param orderBy - Sort items by this property
 * @param dir - Sort direction
 */

export interface ItemSearchOptions {
  /**
   * Id of the user to filter items by
   */
  sellerId?: number;

  /**
   * Id of the category to filter items by
   */
  categoryId?: number;

  /**
   * If true, do not show items published by the user making the request
   */
  exclude?: boolean;

  /**
   * Sort property
   * @example price
   */
  orderBy?: string;

  /**
   * Sort direction
   */
  dir?: 'ASC' | 'DESC';
}
