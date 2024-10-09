export interface User {
    id: number;
    username: string;
    email: string;
    roles: Role[]; 
}
  
export interface Role {
    name: string; 
}
