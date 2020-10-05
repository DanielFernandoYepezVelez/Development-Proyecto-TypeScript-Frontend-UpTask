export interface ILogin {
    email: string,
    password: string,
    remember: boolean,
    id?: string,
    img?: string,
    name?: string,
    role?: string,
    state?: number,
    google?: number,
    created_at?: Date
}