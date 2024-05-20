import { createActionGroup, emptyProps, props } from "@ngrx/store"

export interface Assessment{

    department: string
    questions: string[]
    loginManagerid: string
    Skill: string[]
    candidate_location: string
    score: string
    candidatePhone: string
    confirmPassword: string
    scheduledTime: string
    durations: number
    password: string
    cutoff: number
    deleted: string
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

  export interface CandidateResponse {
    "1712560172227": string
  }




  export const AssessmentActions = createActionGroup(
    {
        source : 'Assessment',
        events : {
          'Get Assessment':emptyProps,
          'Get Assessment Success':props<{assessment:Assessment[]}>(),
          'Get Assessment Failure':props<{error:string}>()

       }
    }
)


