export interface PhotosInterface {
  id?: number;
  createdAt?: Date;
  url: string;
  width: number;
  height: number;
  size: number;
  subjectId: number;
  subjectType: string;
  redirectUrl?: string;
}
