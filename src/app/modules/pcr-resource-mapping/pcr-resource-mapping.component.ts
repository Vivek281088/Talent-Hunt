import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PcrMappingService } from 'src/app/services/pcr-mapping.service';
import {
  AggregatedData,
  PcrCandidateActions,
  PcrData,
  CandidateData,
} from 'src/app/store/PCR-Mapping/pcr-mapping.action';
import { getMappingData } from 'src/app/store/PCR-Mapping/pcr-mapping.selector';
import { PCR, PcrActions } from 'src/app/store/pcr/pcr.action';
import { getPcr } from 'src/app/store/pcr/pcr.selector';

@Component({
  selector: 'app-pcr-resource-mapping',
  templateUrl: './pcr-resource-mapping.component.html',
  styleUrls: ['./pcr-resource-mapping.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class PcrResourceMappingComponent {
  items: MenuItem[] | undefined;
  todayDate!: Date;
  globalSearchValue!: string;
  pcrData !: PCR[];
  mappingData!: AggregatedData[];
  selectedMappedData!: AggregatedData[];
  mappingDialogVisible: boolean = false;
  selectedPcrId !: string;
  selectedCandidates =[];

  constructor(
    private MappingService: PcrMappingService,
    private readonly store: Store
  ) {}
  ngOnInit() {
    sessionStorage.setItem('Component-Name', 'user');
    this.getPcrMappingData();
    this.getPcrData();
    this.todayDate = new Date();
    console.log('Date--------', this.todayDate);

    this.items = [
      { label: 'Home', routerLink: '/mtalent/thdashboard', icon: 'pi pi-home' },
      { label: 'PCR-Emp Mapping', routerLink: '/mtalent/pcr-mapping' },
    ];
  }

  clear(table: Table) {
    table.clear();
    this.globalSearchValue = '';
  }
  getPcrData(){
    this.store.dispatch(PcrActions.getPCR());
    this.store.select(getPcr).subscribe((data) => {
      console.log("Pcr Details",data);
      this.pcrData = data;
    })
  }
  getPcrMappingData() {
    this.store.dispatch(PcrCandidateActions.getPcrMappingData());
    this.store.select(getMappingData).subscribe((data) => {
      console.log('Client Manager Details From Store', data);
      this.mappingData = data;
    });
  }

  toggleSelection(data: any) {
    console.log(data);
    console.log('Selected Data ', this.selectedMappedData);
  }
  cancelButton() {
    this.mappingDialogVisible = false;
  }
  mappingPCR(){
    this.mappingDialogVisible = true
  }
  mapPCR(){

  }
}
