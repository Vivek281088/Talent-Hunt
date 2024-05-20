import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { NewScheduleService } from "src/app/services/new-schedule.service";
import { Candidate, candidateActions } from "./candidate.action";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { ManagernameService } from "src/app/services/managername.service";
import { ToastMessageService } from "src/app/services/toast-message.service";

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

export const AddCandidate$ = createEffect(
    (action$ = inject(Actions) , candidateService = inject(ManagernameService) , messageService = inject(ToastMessageService))  =>{
        return action$.pipe(
            ofType(candidateActions.addCandidate),
            exhaustMap((candidate) => 
                candidateService.addNewCandidate(candidate.candidate).pipe(
                    tap((candidate) =>{
                        console.log("add cadidate.................." , candidate);
                    }),
                    map((candidate) => candidateActions.addCandidateSuccess({candidate})),
                    catchError((error) => {
                        console.log(error)
                        return of(candidateActions.addCandidateFailure({error : error.error}))
                    } )
                )
            )
        )
    },
    {functional:true}
)