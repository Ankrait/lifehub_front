import { baseConfig } from './baseConfig';
import { IUpdateNoteRequest } from './services.interface';
import {
  ICreateGroupRequest,
  IFullGroup,
  IGroup,
  INote,
  ICreateNoteRequest,
} from './services.interface';
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
  async get(id: number) {
    const { data } = await baseConfig.get<IFullGroup>(`/groups/${id}`);
    return data;
  },
  async getAll() {
    const { data } = await baseConfig.get<IGroup[]>('/groups');
    return data;
  },
  async create(req: ICreateGroupRequest) {
    const { data } = await baseConfig.post<IGroup>('/groups', req);
    return data;
  },
};

export const noteService = {
  async getByGroup(id: number) {
    const { data } = await baseConfig.get<INote[]>(`/notes?groupId=${id}`);
    return data;
  },
  async create(req: ICreateNoteRequest) {
    const { data } = await baseConfig.post<INote>('/notes', req);
    return data;
  },
  async update(req: IUpdateNoteRequest) {
    const { id, ...body } = req;
    const { data } = await baseConfig.patch<INote>(`/notes/${id}`, body);

    return data;
  },
};
