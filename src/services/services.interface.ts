export interface ISessionResponse {
	id: number;
	login: string;
	email: string;
}

export interface ILoginRequest {
	login_email: string;
	password: string;
}

export interface IRegistrationRequest {
	email: string;
	login: string;
	password: string;
}