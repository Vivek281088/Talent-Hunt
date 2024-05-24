import { createAction, createActionGroup, props } from "@ngrx/store";

export interface Invite{
    length: number;
    department: string
    questions: string[]
    loginManagerid: string
    Skill: string[]
    candidate_location: string
    score: number
    candidatePhone: string
    confirmPassword: string
    scheduledTime: string
    durations: number
    password: string
    cutoff: number
    deleted?: string
    roles: string
    candidateEmail: string
    empid: string
    email_Status: string
    candidateResponse?: CandidateResponse
    email_Managername: string
    email_Filename: string
    results: string
    candidateName: string
    id: string
    submitTime: string
}
export interface CandidateResponse{
    "1712560172227":string
}

export const inviteaction=createActionGroup({
    source:"invite",
    events:{
        "post invite":props<{assessment:Invite}>(),
        "post invite success":props<{assessment:Invite}>(),
        "post invite failure":props<{error:string}>()
    
    }

})