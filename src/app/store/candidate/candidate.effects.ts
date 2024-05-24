import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { NewScheduleService } from "src/app/services/new-schedule.service";
import { Candidate, candidateActions } from "./candidate.action";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { ManagernameService } from "src/app/services/managername.service";
import { error } from "console";

export const loadCandidate$ = createEffect(
(action$ = inject(Actions) , candidateService = inject(NewScheduleService)) => {
    return action$.pipe(
        ofType(candidateActions.getCandidate),
        exhaustMap(()=> 
            candidateService.getUniqueCandidate().pipe(
                tap((candidates) => console.log(candidates)),
                map((candidates) => candidateActions.getCandidateSuccess({candidates})),
                catchError((error : {message : string}) =>
                    of(candidateActions.getCandidateFailure({error : error.message}))
                )
            )
        )
    )
},
{functional:true}
)

export const updateCandidate$ = createEffect(
    (action$ = inject(Actions) , candidateService = inject(ManagernameService)) =>{
        return action$.pipe(
            ofType(candidateActions.updateCandidate),
            exhaustMap((candidate) => 
                    candidateService.updateSingleCandidate(candidate.candidate).pipe(
                        tap(candidate => console.log(candidate)),
                        map((candidate) => candidateActions.updateCandidateSuccess({candidate})),
                        catchError((error : {message : string}) => 
                            of(candidateActions.updateCandidateFailure({error: error.message}))
                        )
                    )
            )
        )
    },{functional:true}
)

export const deleteCandidate$=createEffect(
    (action$=inject(Actions),deleteservice=inject(ManagernameService))=>{
        return action$.pipe(
            ofType(candidateActions.deleteCnadidate),
            exhaustMap((candidate)=>
                deleteservice.deleteCandidate(candidate.candidateDelete).pipe(
                    tap(candidate=>console.log(candidate)),
                map((candidateDelete) => candidateActions.deleteCnadidateSuccess({candidateDelete})),
                catchError(
                    (error: { message: string; }) => of(candidateActions.deleteCandidateFailure({ error: error.message }))
                )

            ))

        )

    },{functional:true}
    
)