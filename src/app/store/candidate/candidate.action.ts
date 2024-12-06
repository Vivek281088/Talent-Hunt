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

export const candidateActions = createActionGroup({
    source : 'candidate',
    events : {
        'Get Candidate' : emptyProps,
        'Get Candidate Success' : props<{candidates : Candidate[]}>(),
        'Get Candidate Failure' : props<{error : string}>(),
        'Update Candidate' : props<{candidate : Candidate}>(),
        'Update Candidate Success' : props<{candidate : Candidate}>(),
        'Update Candidate Failure' : props<{error : string}>(),
        'Add Candidate' : props<{candidate:Candidate}>(),
        'Add Candidate Success' : props<{candidate:Candidate}>(),
        'Add Candidate Failure' : props<{error : string}>(),
        'Clear Candidate Error' : emptyProps,
        'Clear Newcandidate' : emptyProps,
        'Clear DeleteCamdidateStatus' : emptyProps,
        'Delete Candidates' : props<{candidates:{id : string, candidateEmail : string}[]}>(),
        'Delete Candidate Success' : props<{candidates:{id : string, candidateEmail : string}[]}>(),
        'Delete Candidate Failure' : props<{error : string}>()

    }
})
