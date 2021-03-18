import { User } from './User';
import { ExternalFirm } from './ExternalFirm';
export enum Campus {
  ELL = 'Ellermanstraat',
  NOO = 'Noorderplaats',
}

export enum Priority {
  HIGH = 'HIGH',
  NORMAL = 'NORMAL',
  LOW = 'LOW',
}

export enum Status {
  OPEN = 'Wachten op ontvangst door facilitaire diensten',
  PENDING = 'In behandeling',
  REQUESTED = 'Offerte aangevraagd',
  AWAIT_APPROVAL = 'Wachten op goedkeuring AP',
  FORWARDED = 'Werd doorgegeven aan de provincie',
  EXEC_AP = 'Wordt uitgevoerd door AP',
  EXEC_AP_EXT = 'Wordt uitgevoerd door externe contractor van AP',
  EXEC_GOV = 'Wordt uitgevoerd door externe contractor van de provincie',
  DISCARDED = 'Wordt niet uitgevoerd',
  FINISHED = 'Voltooid',
}

export class Category {
  id: string;
  department: string;
  categories: string[];
}

export class AzureGroups {
  Id: string;
  displayName: string;
  description: string;
}

export class Report {
  constructor(
    public id?: string,
    public reporterId?: string,
    public reporterName?: string,
    public title?: string,
    public description?: string,
    public location?: string,
    public closeTo?: boolean,
    public campus?: Campus,
    public floor?: string,
    public status?: Status,
    public statusHistory?: Status[],
    public priority?: Priority,
    public categoryDepartment?: string,
    public category?: string,
    public image?: File,
    public assignTo?: User,
    public assignToFirm?: ExternalFirm,
    public upVote?: number,
    public bytes?: any,
    public createdOn?: Date,
    public subscribers?: string[]
  ) {}
}

export class ReportComment {
  constructor(
    public id?: string,
    public reportId?: string,
    public reportCommentData?: ReportCommentData[]
  ) {
    this.reportCommentData = [];
  }
}
export class ReportCommentData {
  constructor(
    public commentId?: string,
    public createdByName?: string,
    public createdById?: string,
    public text?: string,
    public createdOn?: string
  ) {}
}
