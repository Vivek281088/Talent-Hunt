import { createActionGroup, emptyProps, props } from "@ngrx/store"

export interface l1Details {

  pcrId:string,
  candidateId :string,
  // L1InterviewStatus:string,
  // L1PanelMembers:string[],
  // L1ScheduleDate:string,
  mailSend:boolean,
  screeningDate:string,
  submitTime:string,
  testScore:number,
  testStatus:string


}



export const l1Actions=createActionGroup({
  source : 'l1Details',
  events : {
      'Get l1Details' : emptyProps,
      'Get l1Details Success' : props<{l1Details : l1Details[]}>(),
      'Get l1Details Failure' : props<{error : string}>(),

  }
})
