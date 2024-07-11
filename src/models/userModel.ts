export interface User {
  id?: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserConnect {
  id?: number;
  id_user: number;
  connect_date: Date;
  ip: string;
}
