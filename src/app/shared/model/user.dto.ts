export interface User {
    id?: number;
    email: string;
    password: string;
    nom?: string;
    prenom?: string;
    photo?: String;
    type?: String;
    token?: string;
}