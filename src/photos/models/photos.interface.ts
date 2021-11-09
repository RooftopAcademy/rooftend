export interface PhotosInterface {
  id?: number;
  created_at?: Date;
  url: string;
  width: number;
  height: number;
  size: number;
  subject_id: number;
  subject_type: string;
  redirect_url?: string;
}
