export interface RegisterInput {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  roles?: string[];
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    full_name: string;
    email: string;
    phone?: string;
    address?: string;
    status: string;
    roles: string[];
  };
}
