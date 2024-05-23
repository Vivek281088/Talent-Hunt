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
export type Candidates=Candidate[];
export type candidatePick=Pick<Candidate,'id'|'candidateEmail'>;
export type candidatesPick=candidatePick[];
export const candidateActions = createActionGroup({
    source : 'candidate',
    events : {
        'Get Candidate' : emptyProps,
        'Get Candidate Success' : props<{candidates : Candidate[]}>(),
        'Get Candidate Failure' : props<{error : string}>(),
        'Update Candidate' : props<{candidate : Candidate}>(),
        'Update Candidate Success' : props<{candidate : Candidate}>(),
        'Update Candidate Failure' : props<{error : string}>(),
        'Delete Candidate':props<{deleteCandidate:candidatesPick}>(),
        'Delete Candidate Success':props<{deleteCandidate:candidatesPick}>(),
        'Delete Candidate Failure':props<{error:string}>()
    }
})
