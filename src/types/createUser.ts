export interface CreateUserInput {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
  role?: string; // default is "farmer"
}
