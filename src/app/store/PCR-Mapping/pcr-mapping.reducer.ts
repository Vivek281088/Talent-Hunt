import { createReducer, on } from '@ngrx/store';
import {
  AggregatedData,
  MappingPCRCandidateData,
  PcrCandidateActions,
} from './pcr-mapping.action';

export interface MappingState {
  mappingData: AggregatedData[];
  error: string;
}

const initialState: MappingState = {
  mappingData: [],
  error: '',
};
export interface MappingPcrCandidateState {
  mappingPcrCandidateData: MappingPCRCandidateData[];
  error: string;
}

const initialMappingState: MappingPcrCandidateState = {
  mappingPcrCandidateData: [],
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
  })
);
export const MapPcrCandidateReducer = createReducer(
  initialMappingState,
  on(PcrCandidateActions.mapPCRAndCandidateSuccess, (state, action) => {
    console.log(state, action);
    return {
      mappingPcrCandidateData: action.mappingPcrCandidateData,
      error: '',
    };
  }),
  on(PcrCandidateActions.mapPCRAndCandidateFailure, (state, action) => {
    console.log(state, action);
    return {
      ...state,
      error: action.error,
    };
  })
);
