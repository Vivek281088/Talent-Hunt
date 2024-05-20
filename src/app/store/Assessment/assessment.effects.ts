import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AssessmentActions } from "./assessment.action";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import{ManagernameService}  from 'src/app/services/managername.service';

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
