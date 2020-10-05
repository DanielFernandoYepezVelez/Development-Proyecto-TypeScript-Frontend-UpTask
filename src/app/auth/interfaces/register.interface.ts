export interface IRegister {
    name: string,
    email: string,
    password: string,
    repeat_password: string,
    id?: string,
    img?: string,
    role?: string,
    state?: number,
    google?: number,
    created_at?: Date,
}