import { LabelType, RoleType } from 'common/interfaces';

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

export interface ILabel {
  id: number;
  text: string;
  type: LabelType;
}

export interface ICreateLabelRequest extends Omit<ILabel, 'id'> {
  groupId: number;
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
  labels: ILabel[];
}

export interface ICreateGroupRequest {
  name: string;
  image?: string;
}

export interface ICollaborator {
  id: number;
  groupId: number;
  role: RoleType;
  userId: number;
  userName: string;
}

export interface ICreateCollaboratorRequest
  extends Pick<ICollaborator, 'userId' | 'groupId' | 'role'> {}

export interface IDeleteCollaboratorRequest
  extends Pick<ICollaborator, 'userId' | 'groupId'> {}

export interface INote {
  id: number;
  message: string;
  isImportant: boolean;
  groupId: number;
}

export interface ICreateNoteRequest extends Pick<INote, 'groupId' | 'message'> {}

export interface IUpdateNoteRequest
  extends Pick<INote, 'id'>,
    Pick<Partial<INote>, 'message' | 'isImportant'> {}

export interface IPlan {
  id: number;
  message: string;
  dateTo: string | null;
  isFinished: boolean;
  groupId: number;
  labelId: number | null;
  label: ILabel | null;
}

export interface ICreatePlanRequest
  extends Pick<IPlan, 'groupId' | 'message'>,
    Pick<Partial<IPlan>, 'dateTo' | 'isFinished'> {}

export interface IUpdatePlanRequest
  extends Pick<IPlan, 'id'>,
    Omit<Partial<IPlan>, 'id' | 'groupId' | 'label'> {}
