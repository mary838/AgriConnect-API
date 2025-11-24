export interface RegisterInput {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    full_name: string;
    email: string;
    phone?: string;
    roles: string[];
    status: string;
  };
}
