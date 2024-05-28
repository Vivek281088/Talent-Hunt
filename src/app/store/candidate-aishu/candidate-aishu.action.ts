import { createActionGroup, emptyProps, props } from "@ngrx/store";

export interface CandidateDetails{
    id: string;
    empid: string;
    candidateEmail: string;
    candidate_location: string;
    candidateName: string;
    candidatePhone: string;
    department: string;
}

export const manageCandidatesAction = createActionGroup({
source: 'candidate details',
events:{
'Get Unique Candidate': emptyProps,
'Get Unique Candidate Success': props<{candidateDetails: CandidateDetails[]}>(),
'Get Unique Candidate Failure': props<{error : string}>()
}
})
