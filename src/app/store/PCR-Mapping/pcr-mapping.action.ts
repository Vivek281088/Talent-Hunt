import { createActionGroup, emptyProps, props } from "@ngrx/store";

export interface PcrData {
  projectId: string;
  requestResource: string;
  location: string;
  createdDate: string;
  deleted: boolean;
  pcrId: string;
  pcrStatus: string;
  skills: string[];
  jobTitle: string;
  createdBy: string;
  agileId: string;
}

export interface CandidateData {
  phoneNumber: number;
  experience: string;
  location: string;
  roles: string[];
  skillSet: {
    primarySkills: string[];
    secondarySkills: string[];
  };
  SPOC: string;
  emailId: string;
  candidateName: string;
  source: string;
  candidateId: string;
  currentLocation: string;
}
export interface AggregatedData {
  pcrData: PcrData;
  candidateData: CandidateData;
}
export interface MappingPCRCandidateData {
  pcrId: string;
  candidateId: string;
}

export const PcrCandidateActions = createActionGroup({
  source: 'PcrCandidate',
  events: {
    'Get PcrMapping Data': emptyProps(),
    'Get PcrMapping Data Success': props<{ mappingData: AggregatedData[] }>(),
    'Get PcrMapping Data Failure': props<{ error: string }>(),
    'Map PCR and Candidate' : props<{mappingPcrCandidateData :MappingPCRCandidateData[]}>(),
    'Map PCR and Candidate Success' : props<{mappingPcrCandidateData :MappingPCRCandidateData[]}>(),
    'Map PCR and Candidate failure' : props<{error :string}>()
  }
});
