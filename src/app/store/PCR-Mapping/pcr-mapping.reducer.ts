import { state } from '@angular/animations';
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
  }),
  on(PcrCandidateActions.mailMappedDataSuccess, (state, action) => {
    console.log(state, action);

    const updatedMappingData = state.mappingData.map(item => {
      const mailMatch = action.mailData.pcrId === item.pcrData.pcrId && action.mailData.candidateId === item.candidateData.candidateId

      if (mailMatch) {
        return { ...item, mappedData: { ...item.mappedData, mailSend: true, testStatus : "Scheduled" } };
      }

      return item;
    });

    return {
      ...state,
      mappingData: updatedMappingData,
      error: ''
    };
  }),
  on(PcrCandidateActions.mailMappedDataFailure, (state, action) => {
    console.log(state, action);
    return {
      ...state,
      error: action.error,
    };
  }),
  on(PcrCandidateActions.deleteMappedDataSuccess, (state, action) => {
    console.log("Effect--",state, action);

    return {
      ...state,
      mappingData: state.mappingData.filter(data => !action.deleteData.includes(data.mappedData.uniqueId)),
      error: ''
    };
  }),
  on(PcrCandidateActions.deleteMappedDataFailure, (state, action) => {
    console.log(state, action);
    return {
      ...state,
      error: action.error,
    };
  })
);
export const MapPcrCandidateReducer = createReducer(
  initialMappingState,
  on(PcrCandidateActions.mapPCRAndCandidateSuccess, (state, action) => {
    console.log(state, action);
    return {
      ...state,
      mappingPcrCandidateData: [...state.mappingPcrCandidateData,...action.mappingPcrCandidateData],
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
