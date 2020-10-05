export class User {
    constructor(
      public name: string,
      public email: string,
      public password: string,
      public repeat_password: string,
      public id?: string,
      public img?: string,
      public role?: string,
      public state?: number,
      public google?: number,
      public created_at?: Date,
    ) {}
  }
  