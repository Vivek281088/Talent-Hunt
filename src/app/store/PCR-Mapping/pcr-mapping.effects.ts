
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
export const MapPcrCandidate$ = createEffect(
  (action$ = inject(Actions), mappingService = inject(PcrMappingService)) => {
    return action$.pipe(
      ofType(PcrCandidateActions.mapPCRAndCandidate),
      exhaustMap((mappingPcrCandidateData) =>
        mappingService.MapPCRData(mappingPcrCandidateData).pipe(
          tap((mappingPcrCandidateData) => console.log(mappingPcrCandidateData)),
          map((mappingPcrCandidateData) =>
            PcrCandidateActions.mapPCRAndCandidateSuccess({ mappingPcrCandidateData })
          ),
          catchError((error: { message: string }) =>
            of(PcrCandidateActions.mapPCRAndCandidateFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);
export const MailTheMappedData$ = createEffect(
  (action$ = inject(Actions), mappingService = inject(PcrMappingService)) => {
    return action$.pipe(
      ofType(PcrCandidateActions.mailMappedData),
      exhaustMap((action) =>
        mappingService.mailMappedData(action.mailData).pipe(
          tap((mailData) => console.log(mailData)),
          map((mailData) =>
            PcrCandidateActions.mailMappedDataSuccess({ mailData })
          ),
          catchError((error: { message: string }) =>
            of(PcrCandidateActions.mailMappedDataFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);
