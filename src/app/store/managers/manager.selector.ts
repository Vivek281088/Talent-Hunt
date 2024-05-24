import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { managerState,getManagerData } from "./manager.reducer";

const managerKey="managerData";
export const  managerData=createFeatureSelector<managerState>(managerKey);
export const managerDataFeature=createFeature({
    name:managerKey,
    reducer:getManagerData
})
export const getManager=createSelector(
    managerData,
    (state)=>state.managers
)
