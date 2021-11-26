export interface Questions {
  id: number;
  item_id: number;
  user_id: number;
  created_at: number;
  question: string;
  answer?: string;
}
