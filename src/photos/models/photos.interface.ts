export interface PhotosInterface {
  id?: number;
  createdAt?: Date;
  url: string;
  width: number;
  height: number;
  size: number;
  entityId: number;
  entityType: string;
  redirectUrl?: string;
}
