export interface User {
    id?: number;
    email: string;
    password: string;
    confirm_password?: string;
    firstname?: string;
    lastname?: string;
    createAt?: string;
    updateAt?: string;
    appId?: string;
    token?: string;
}