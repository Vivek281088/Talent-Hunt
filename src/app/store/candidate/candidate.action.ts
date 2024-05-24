import { createActionGroup, emptyProps, props } from "@ngrx/store"

export interface Candidate{
    id : string,
    empid:string,
    candidateEmail : string,
    candidate_location : string,
    candidateName : string,
    candidatePhone : string,
    department : string
}
export interface candidateDelete{
    id:string,
    candidateEmail:string
}

export const candidateActions = createActionGroup({
    source : 'candidate',
    events : {
        'Get Candidate' : emptyProps,
        'Get Candidate Success' : props<{candidates : Candidate[]}>(),
        'Get Candidate Failure' : props<{error : string}>(),
        'Update Candidate' : props<{candidate : Candidate}>(),
        'Update Candidate Success' : props<{candidate : Candidate}>(),
        'Update Candidate Failure' : props<{error : string}>(),
        'delete Cnadidate':props<{candidateDelete:candidateDelete[]}>(),
        'delete Cnadidate Success':props<{candidateDelete:candidateDelete[]}>(),
        'delete Candidate Failure':props<{error:string}>()
    }
})