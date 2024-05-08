import { createActionGroup, emptyProps, props } from "@ngrx/store";

export interface Schedule {
    id : string,
    cutoff : number,
    deleted ?: string,
    durations : number,
    JobDescription : string,
    Managername : string,
    questions : string[],
    Skill : string[]
}

export const ScheduleActions = createActionGroup(
    {
        source : 'Schedule',
        events : {
            'Get Schedule' : emptyProps,
            'Get Schedule Success' : props<{schedules : Schedule[]}>(),
            'Get Schedule Failure' : props<{error : string}>(),
            'Update Schedule' : props<{schedule : Schedule}>(),
            'Update Schedule Success' : props<{schedule : Schedule}>(),
            'Update Schedule Failure' : props<{error : string}>()
        }
    }
)