export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginRes {
  accessToken: string;
  refreshToken: string;
}

export interface ILogout {
  refreshToken: string;
}

export interface IRegister {
  email: string;
  password: string;
  name: string;
}
