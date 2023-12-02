export interface ISessionResponse {
  id: number;
  login: string;
  email: string;
}

export interface ILoginRequest {
  email_login: string;
  password: string;
}

export interface IRegistrationRequest {
  email: string;
  login: string;
  password: string;
}

export interface IGroup {
  id: number;
  name: string;
  image?: string;
}

export interface ICreateGroupRequest {
  name: string;
  image?: string;
}
