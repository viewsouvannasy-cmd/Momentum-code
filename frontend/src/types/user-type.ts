export interface UserType {
  user_name: string;
  user_email: string;
  created_at: string;
  user_profile: string;
}

export interface ResponseStatus {
  success: boolean;
  point?: string;
  msg?: string;
}
