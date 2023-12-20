import { baseConfig } from './baseConfig';
import {
  ICollaborator,
  ICreateCollaboratorRequest,
  ICreateLabelRequest,
  ICreatePlanRequest,
  IDeleteCollaboratorRequest,
  ILabel,
  IPlan,
  IUpdateNoteRequest,
  IUpdatePlanRequest,
} from './services.interface';
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

export const labelService = {
  async create(req: ICreateLabelRequest) {
    const { data } = await baseConfig.post<ILabel>('/labels', req);
    return data;
  },
  async delete(id: number) {
    await baseConfig.delete(`/labels/${id}`);
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
  async delete(id: number) {
    await baseConfig.delete(`/notes/${id}`);
  },
};

export const planService = {
  async getByGroup(id: number) {
    const { data } = await baseConfig.get<IPlan[]>(`/plans?groupId=${id}`);
    return data;
  },
  async create(req: ICreatePlanRequest) {
    const { data } = await baseConfig.post<IPlan>('/plans', req);
    return data;
  },
  async update(req: IUpdatePlanRequest) {
    const { id, ...body } = req;
    const { data } = await baseConfig.patch<IPlan>(`/plans/${id}`, body);
    return data;
  },
  async delete(id: number) {
    await baseConfig.delete(`/plans/${id}`);
  },
};

export const collaboratorService = {
  async getByGroup(id: number) {
    const { data } = await baseConfig.get<ICollaborator[]>(
      `/collaborators?groupId=${id}`,
    );

    return data;
  },
  async create(req: ICreateCollaboratorRequest) {
    const { data } = await baseConfig.post('/collaborators', req);
    return data;
  },
  async delete(req: IDeleteCollaboratorRequest) {
    await baseConfig.post('/collaborators/delete', req);
  },
};

export const userService = {
  async checkByName(name: string) {
    try {
      const { data } = await baseConfig.get<number>(`/users?name=${name}`);
      return data;
    } catch {
      return false;
    }
  },
};
