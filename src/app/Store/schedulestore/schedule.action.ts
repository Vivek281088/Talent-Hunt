import { createActionGroup, emptyProps, props } from "@ngrx/store"


export interface Schedule {
    durations: string
    questions: string[]
    cutoff: string
    deleted: boolean
    JobDescription: string
    Skill: string[]
    Managername: string
    id: string
  }
  
  export const ScheduleActions = createActionGroup(
    {
        source : 'Schedule',
        events : {
            'Get Schedule Data' : emptyProps,
            'Schedule Success' : props<{schedule : Schedule[]}>(),
            'Schedule Failure' : props<{error : string}>(),
            'Update Schedule Data' : props<{schedule : Schedule}>(),
            'Update Success' : props<{schedule :Schedule[] }>(),
            'Update Failure' : props<{error : string}>()
        }
    }
  )