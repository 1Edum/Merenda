export interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[]; 
}
  
export interface Role {
    name: string; 
}
