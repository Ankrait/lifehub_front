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
  image: string | null;
}

export interface IFullGroup extends IGroup {
  stats: {
    notesCount: number;
    plansCount: {
      finished: number;
      started: number;
    };
  };
}

export interface ICreateGroupRequest {
  name: string;
  image?: string;
}

export interface INote {
  id: number;
  message: string;
  isImportant: boolean;
  groupId: number;
}

export interface ICreateNoteRequest extends Pick<INote, 'groupId' | 'message'> {}

export interface IUpdateNoteRequest
  extends Pick<INote, 'id'>,
    Partial<Pick<INote, 'message' | 'isImportant'>> {}
