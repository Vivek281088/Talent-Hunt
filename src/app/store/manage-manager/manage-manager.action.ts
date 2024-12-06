import { createActionGroup, emptyProps, props } from "@ngrx/store";

export interface Manager {
  managerName: string;
  department: string;
  password: string;
  deleted: boolean;
  role: string;
  empid: number;
  managerLocation: string;
  phoneNo: string;
  email: string;
  selection : boolean;
}
export interface DeleteManager {
  empid: number;
  email: string;
}
export const ManagerActions = createActionGroup(
  {
    source : 'Manager',
    events : {
      'get Manager Data' : emptyProps,
      'get Manager Data Success' : props<{managerData : Manager[]}>(),
      'get Manager Data Failure' : props<{error: string}>(),
      'post Manager Data ' : props<{manager : Manager}>(),
      'post Manager Data Success' : props<{manager : Manager}>(),
      'post Manager Data Failure' : props<{error : string, status : number}>(),
      'delete Manager Data ' : props<{deleteManager : DeleteManager[]}>(),
      'delete Manager Data Success' : props<{deleteManager : DeleteManager[]}>(),
      'delete Manager Data Failure' : props<{error : string}>(),
    }
  }
)
