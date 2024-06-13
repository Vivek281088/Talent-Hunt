import { resourceActions } from 'src/app/store/resource/resource.action';
import { getCandidate } from '../candidate/candidate.selector';
import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, debounceTime, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { ResourceService } from 'src/app/services/resource.service';
// import { resourceActions } from '.resourceActions/resource.action';
// import { ResourceService } from "src/app/services/resource.service";
// import { resourceActions } from './resource.action';

export const getResources$ = createEffect(
(action$ = inject(Actions) , resourceService = inject(ResourceService)) => {
    return action$.pipe(
        ofType(resourceActions.getResource),
        exhaustMap((candidate)=>
            resourceService.getResourceData().pipe(
                tap((candidate) => console.log( "This is candidate details coming", candidate)),
                map((candidates) => resourceActions.getResourceSuccess({candidates})),
                catchError((error : {message : string}) =>
                    of(resourceActions.getResourceFailure({error : error.message}))
                )
            )
        )
    )
},
{functional:true}
)


export const AddResource$ = createEffect(
  (action$ = inject(Actions) , resourceService = inject(ResourceService) )  =>{
      return action$.pipe(
          ofType(resourceActions.addResource),
          switchMap((candidate) =>
            resourceService.addSingleCandidate(candidate.candidate).pipe(
                  tap((candidate) =>{
                      console.log("add cadidate.................." , candidate);
                  }),
                  map((candidate) => resourceActions.addResourceSuccess({candidate})),
                  catchError((error) => {
                      console.log(error)
                      return of(resourceActions.addResourceFailure({error : error.error}))
                  } )
              )
          )
      )
  },
  {functional:true}
)

export const deleteResource$ =createEffect(
  (actions$=inject(Actions),resourceService=inject(ResourceService))=>{
    return actions$.pipe(
      ofType(resourceActions.deleteResource),
      exhaustMap((candidateId) =>{
            return  resourceService.deleteResource(candidateId.candidateId).pipe(
              tap((candidateId:any) => console.log("delete pcr",candidateId)),
              map((candidateId : any) => resourceActions.deleteResourceSuccess({candidateId: candidateId as string[]})),
              catchError((error) => of(resourceActions.deleteResourceFailure({error : error.message})))
          )
   } )
  )
  },{functional:true}
)

export const updateResource$ = createEffect(
  (actions$ = inject(Actions) , updatePCRservice = inject(ResourceService)) => {
      return actions$.pipe(
          ofType(resourceActions.updateResource),
          exhaustMap((candidate) => updatePCRservice.updateResource(candidate.candidate).pipe(
              tap(candidate=>console.log("pcr data",candidate)),
              map((candidate)=>resourceActions.updateResourceSuccess({candidate})),
              catchError((error:{message:string})=>
              of(resourceActions.updateResourceFailure({error:error.message})))

          ) )
      )
  },
  {functional:true}
)




// export const updateCandidate$ = createEffect(
//     (action$ = inject(Actions) , candidateService = inject(ManagernameService)) =>{
//         return action$.pipe(
//             ofType(candidateActions.updateCandidate),
//             exhaustMap((candidate) =>
//                     candidateService.updateSingleCandidate(candidate.candidate).pipe(
//                         tap(candidate => console.log(candidate)),
//                         map((candidate) => candidateActions.updateCandidateSuccess({candidate})),
//                         catchError((error : {message : string}) =>
//                             of(candidateActions.updateCandidateFailure({error: error.message}))
//                         )
//                     )
//             )
//         )
//     },{functional:true}
// )



// export const deleteCandidate$ = createEffect(
//     (action$ = inject(Actions) , candidateService = inject(ManagernameService)) => {
//         return action$.pipe(
//             ofType(candidateActions.deleteCandidates),
//             exhaustMap((candidates) =>
//                 candidateService.deleteCandidates(candidates.candidates).pipe(
//                     tap((candidates) => console.log("sdfbv bg r",candidates)),
//                     map((candidates : any) => candidateActions.deleteCandidateSuccess({candidates})),
//                     catchError((error) => of(candidateActions.deleteCandidateFailure({error : error.message})))
//                 )
//             )
//         )
//     },
//     {functional :true}
// )
