import { createReducer, on } from '@ngrx/store';
import { Manager, ManagerActions } from './manage-manager.action';

export interface ManagerState {
  managerData: Manager[];
  error: string;
  managerCount: number;
  status: number | null;
}

const initialState: ManagerState = {
  managerData: [],
  error: '',
  managerCount: 0,
  status : null,
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
  }),
  on(ManagerActions.postManagerDataSuccess , (state, {manager}) => {
    console.log(state, manager);
    return {
      ...state,
      managerData: [...state.managerData, manager],
      managerCount: state.managerCount + 1,
      error: "",
      status : null,
    };
  }),
  on(ManagerActions.postManagerDataFailure, (state,  { error, status }) => {
    return {
      ...state,
      error,
      status,
    };
  }),
  on(ManagerActions.deleteManagerDataSuccess , (state, {deleteManager}) => {
    console.log(state, deleteManager);
    return {
      ...state,
      managerData: state.managerData.filter(data => !deleteManager.some((deletedManager: {
        email: string; empid: number;
}) => deletedManager.empid === data.empid && deletedManager.email === data.email)),
      managerCount: state.managerCount - deleteManager.length,
      error: "",
    };
  }),
  on(ManagerActions.deleteManagerDataFailure , (state, action) => {
    console.log(state, action);
    return {
      ...state,
      error: action.error
    };
  }),
);
