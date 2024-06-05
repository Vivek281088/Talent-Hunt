
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { PcrMappingService } from 'src/app/services/pcr-mapping.service';
import { PcrCandidateActions } from './pcr-mapping.action';

export const loadMappedData$ = createEffect(
  (action$ = inject(Actions), mappingService = inject(PcrMappingService)) => {
    return action$.pipe(
      ofType(PcrCandidateActions.getPcrMappingData),
      exhaustMap(() =>
        mappingService.getPCRMappedData().pipe(
          tap((mappingData) => console.log(mappingData)),
          map((mappingData) =>
            PcrCandidateActions.getPcrMappingDataSuccess({ mappingData })
          ),
          catchError((error: { message: string }) =>
            of(PcrCandidateActions.getPcrMappingDataFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);
