import { createReducer, on } from '@ngrx/store';
import { AggregatedData, PcrCandidateActions } from './pcr-mapping.action';

export interface MappingState {
  mappingData: AggregatedData[];
  error: string;
}

const initialState: MappingState = {
  mappingData: [],
  error: '',
};
export const getMappingDataReducer = createReducer(
  initialState,
  on(PcrCandidateActions.getPcrMappingDataSuccess, (state, action) => {
    console.log(state, action);
    return {
      mappingData: action.mappingData,
      error: '',
    };
  }),
  on(PcrCandidateActions.getPcrMappingDataFailure, (state, action) => {
    console.log(state, action);
    return {
      mappingData: [],
      error: action.error,
    };
  }),

);
