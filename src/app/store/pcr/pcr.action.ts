import { createActionGroup, emptyProps, props } from "@ngrx/store"

export interface PCR{
    pcrId : string,
    agileId : string,
    createdBy : string,
    createdDate : Date,
    jobTitle : string,
    location ?: string,
    pcrStatus ?: string,
    projectId ?: string,
    requestResource : string,
    skills : string[]
}

export const PcrActions = createActionGroup({
    source : 'pcr',
    events : {
        'Get PCR' : emptyProps,
        'Get PCR Success' : props<{pcr : PCR[]}>(),
        'Get PCR Failure' : props<{error : string}>(),
        'Add PCR' : props<{pcr : PCR}>(),
        'Add PCR Success' : props<{pcr : PCR}>(),
        'Add PCR Failure' : props<{error : string}>(),
        'Add Multi PCR' : props<{pcr : PCR[]}>(),
        'Add Multi PCR Success' : props<{pcr : PCR[]}>(),
        'Add Multi PCR Failure' : props<{error : string}>(),
        'Update PCR' : props<{pcr : PCR}>(),
        'Update PCR Success' : props<{pcr : PCR}>(),
        'Update PCR Failure' : props<{error : string}>(),
        'Delete PCR' : props<{pcrIds : string[]}>(),
        'Delete PCR Success' : props<{pcrIds : string[]}>(),
        'Delete PCR Failure' : props<{error : string}>(),
    }
});
