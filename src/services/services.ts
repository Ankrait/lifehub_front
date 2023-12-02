import { baseConfig } from './baseConfig';
import { ICreateGroupRequest, IGroup } from './services.interface';
import {
  ISessionResponse,
  ILoginRequest,
  IRegistrationRequest,
} from './services.interface';

export const authService = {
  async getSession() {
    const { data } = await baseConfig.get<ISessionResponse>('/auth/session');
    return data;
  },
  async login(req: ILoginRequest) {
    await baseConfig.post('/auth/login', req);
  },
  async registration(req: IRegistrationRequest) {
    await baseConfig.post('/auth/registration', req);
  },
  async logout() {
    await baseConfig.get('/auth/logout');
  },
};

export const groupService = {
  async getAll() {
    const { data } = await baseConfig.get<IGroup[]>('/groups');
    return data;
  },
  async create(req: ICreateGroupRequest) {
    const { data } = await baseConfig.post<IGroup>('/groups', req);
    return data;
  },
};
