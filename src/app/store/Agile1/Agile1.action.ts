import { createActionGroup, emptyProps, props } from "@ngrx/store";

export interface agileDetails{
  ID: string;
  Ageing: string;
  AgeingGroup: string;
  Available: string;
  BillRate: string;
  Business_Unit_Level_2: string;
  category: string;
  Comments: string;
  Competitive_Bill_Bill_Rate: string;
  Competitive_Bill_Total: string;
  Contingent_Workers_Work_Location: string;
  Cost_Center: string;
  Created_Date: string;
  CSA_Assigned: string;
  CWR_Type: string;
  Department_Number: string;
  Direct_Send_Boolen: string;
  Direct_Send_value: string;
  employeeDetails: any[];
  EndDt: string;
  engaged: string;
  Funding_Type: string;
  Interview_Boolen: string;
  Interview_value: string;
  Jobs: string;
  Location: string;
  No: string;
  Number_of_Positions: string;
  Numubers: number;
  On_Hold_Boolen: string;
  On_Hold_Boolen_value: string;
  PayRate: string;
  Project_Name_Overview_Deliverable: string;
  Qualifications: string;
  Reason: string;
  Report_To: string;
  Requested_by: string;
  Responsibility: string;
  Resume_Boolen: string;
  Resume_value: string;
  StartDt: string;
  State: string;
  Status: string;
  Submittal_Status: string;
  System_Location: string;
  TClient: string;
  Title: string;
  Type: string;
  Vendor: string;


}

export const agileActions=createActionGroup({
source:'Agile1',
events : {
  'Get agileDetails' : emptyProps,
  'Get agileDetails Success' : props<{agileDetails : agileDetails[]}>(),
  'Get agileDetails Failure' : props<{error : string}>(),
}
})
