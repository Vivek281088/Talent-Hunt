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
export const ManagerActions = createActionGroup(
  {
    source : 'Manager',
    events : {
      'get Manager Data' : emptyProps,
      'get Manager Data Success' : props<{managerData : Manager[]}>(),
      'get Manager Data Failure' : props<{error: string}>()
    }
  }
)
