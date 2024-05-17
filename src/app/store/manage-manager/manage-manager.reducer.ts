import { createReducer, on } from '@ngrx/store';
import { Manager, ManagerActions } from './manage-manager.action';

export interface ManagerState {
  managerData: Manager[];
  error: string;
  managerCount: number;
}

const initialState: ManagerState = {
  managerData: [],
  error: '',
  managerCount: 0,
};

export const getManagerDataReducer = createReducer(
  initialState,
  on(ManagerActions.getManagerDataSuccess, (state, action) => {
    console.log(state, action);
    return {
      ...state,
      managerData: action.managerData.map((manager) => ({
        ...manager,
        selection: manager.selection || false,
      })),
      managerCount: action.managerData.length,
      error: '',
    };
  }),
  on(ManagerActions.getManagerDataFailure, (state, action) => {
    console.log(state, action);
    return {
      ...state,
      managerData: [],
      managerCount: 0,
      error: action.error,
    };
  })
);
