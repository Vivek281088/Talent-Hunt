import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { NewScheduleService } from "src/app/services/new-schedule.service";
import { CandidateDetails, manageCandidatesAction } from "./candidate-aishu.action";
import { catchError, exhaustMap, map, of, tap } from "rxjs";


export const loadCandidateDetails$ = createEffect(
    (action$ = inject(Actions), candidateService = inject(NewScheduleService)) => {
        return action$.pipe(
            ofType(manageCandidatesAction.getUniqueCandidate),
            exhaustMap(() =>
                candidateService.getUniqueCandidate().pipe(
                    tap((candidateDetails) => console.log(candidateDetails)),
                    map((candidateDetails)=> manageCandidatesAction.getUniqueCandidateSuccess({candidateDetails})),
                    catchError((error:{message : string}) => 
                        of(manageCandidatesAction.getUniqueCandidateFailure({error: error.message}))
                )
        )
           
                )
        )
        
    },
        
        
        
        {functional:true}
)