import { ManagerActions } from './manage-manager.action';
import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap,map, of, tap } from 'rxjs';
import { ManagernameService } from 'src/app/services/managername.service';

export const loadManager$= createEffect(
  (action$= inject(Actions), managerService = inject(ManagernameService)) =>{
    return action$.pipe(
      ofType(ManagerActions.getManagerData),
      exhaustMap(()=>
        managerService.getclientManagerData().pipe(
          tap((managerData) => console.log(managerData)),
          map(managers => managers.map(manager =>({
            ...manager,
            selection : manager.selection || false
          }))),
          map((managerData) => ManagerActions.getManagerDataSuccess({managerData})),
          catchError((error : {message: string}) =>
          of(ManagerActions.getManagerDataFailure({error : error.message}))
          )
        )
      )
    )
  },
  {functional : true}
);
