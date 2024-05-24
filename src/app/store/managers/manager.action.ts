
import { createActionGroup,emptyProps,props } from "@ngrx/store"
export interface Manager {
    deleted: string
    department: string
    email: string
    empid: number
    managerLocation: string
    managerName: string
    password: string
    phoneNo: string
    role: string
    selection: boolean
  }

  
export const managerActions = createActionGroup({
    source : 'manager',
    events : {
        'Get Manager' : emptyProps,
        'Get Manager Success' : props<{Manager : Manager[]}>(),
        'Get Manager Failure' : props<{error : string}>(),
        
    }
}) 