
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
    source : 'resource',
    events : {
        'Get Resource' : emptyProps,
        'Get Resource Success' : props<{candidates : Candidates[]}>(),
        'Get Resource Failure' : props<{error : string}>(),
        'Update Resource' : props<{candidate : Candidates}>(),
        'Update Resource Success' : props<{candidate : Candidates}>(),
        'Update Resource Failure' : props<{error : string}>(),
        'Add Resource' : props<{candidate:Candidates}>(),
        'Add Resource Success' : props<{candidate:Candidates}>(),
        'Add Resource Failure' : props<{error : string}>(),
        // 'Clear Candidate Error' : emptyProps,
        // 'Clear Newcandidate' : emptyProps,
        // 'Clear DeleteCamdidateStatus' : emptyProps,
        // 'Delete Candidates' : props<{candidates:{id : string, candidateEmail : string}[]}>(),
        // 'Delete Candidate Success' : props<{candidates:{id : string, candidateEmail : string}[]}>(),
        // 'Delete Candidate Failure' : props<{error : string}>()

    }
})
