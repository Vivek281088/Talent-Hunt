
import { createActionGroup, emptyProps, props } from "@ngrx/store"
export interface Candidates{
    candidateId : string,
    candidateName:string,
    currentLocation : string,
    emailId : string,
    experience : string,
    location : string,
    phoneNumber : string,
    skillSet : Skill,
    roles: string[],
    source: string,
    SPOC: string,
    visaDetails: VisaDetails

}
export interface Skill {
    primarySkills : string,
    secondarySkills : string
}

export interface VisaDetails{

    validUntil: string,
    visaType: string,
    visaStamped: string
}
export const resourceActions = createActionGroup({
    source : 'candidate',
    events : {
        'Get Candidate' : emptyProps,
        'Get Candidate Success' : props<{candidates : Candidates[]}>(),
        'Get Candidate Failure' : props<{error : string}>(),
        'Update Candidate' : props<{candidate : Candidates}>(),
        'Update Candidate Success' : props<{candidate : Candidates}>(),
        'Update Candidate Failure' : props<{error : string}>(),
        'Add Candidate' : props<{candidate:Candidates}>(),
        'Add Candidate Success' : props<{candidate:Candidates}>(),
        'Add Candidate Failure' : props<{error : string}>(),
        // 'Clear Candidate Error' : emptyProps,
        // 'Clear Newcandidate' : emptyProps,
        // 'Clear DeleteCamdidateStatus' : emptyProps,
        // 'Delete Candidates' : props<{candidates:{id : string, candidateEmail : string}[]}>(),
        // 'Delete Candidate Success' : props<{candidates:{id : string, candidateEmail : string}[]}>(),
        // 'Delete Candidate Failure' : props<{error : string}>()

    }
})
