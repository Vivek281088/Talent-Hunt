import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AssessmentActions } from "./assessment.action";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import{ManagernameService}  from 'src/app/services/managername.service';
import { TableService } from 'src/app/services/table.service'

export const loadAssessment$= createEffect(
(actions$= inject(Actions), assessmentService= inject(ManagernameService))=>{
  return actions$.pipe(
      ofType(AssessmentActions.getAssessment),
      exhaustMap(()=>
        assessmentService.getCandidateStatus().pipe(
          tap((assessment)=>console.log(assessment)),
          map((assessment)=> AssessmentActions.getAssessmentSuccess({assessment})),
          catchError((error: { message: string }) =>
            of(AssessmentActions.getAssessmentFailure({ error: error.message }))
          )
        )
      ))
    },
    {functional:true}

);


export const sendAssessments$ = createEffect(
  (
    actions$ = inject(Actions),
    assessmentService = inject(TableService)
  ) => {
    return actions$.pipe(
      ofType(AssessmentActions.sendAssessment),
      tap((assess) => console.log(assess)),
      exhaustMap((assess) =>
        assessmentService.postInviteCandidate(assess.assessment).pipe(
          tap((assess) => console.log(assess)),
          map((assessment) => AssessmentActions.sendAssessmentSuccess( {assessment} )),
          catchError((error: { message: string }) =>
            of(AssessmentActions.sendAssessmentFailure({ error: error.message }))
          )
        )
      )
    );
  },
  {functional:true}
);
