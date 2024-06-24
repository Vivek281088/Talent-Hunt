import { HttpClient } from '@angular/common/http';
import {
  Component,
  Injector,
  OnInit,
  Signal,
  ViewChild,
  signal,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { PcrService } from 'src/app/services/pcr.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { transformDataToInputFields } from 'src/app/shared/utils/transformDataToInputFields';
import { formatJson } from 'src/app/shared/utils/formatJson';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pcr-details',
  templateUrl: './pcr-details.component.html',
  styleUrls: ['./pcr-details.component.scss'],
})
export class PcrDetailsComponent implements OnInit {
  jsonData: any;
  constructor(private pcrService: PcrService, private injector: Injector) {}
  @ViewChild('dt') dt!: Table;
  todayDate!: string | number | Date;
  items: MenuItem[] = [
    { label: 'Home', routerLink: '/mtalent/thdashboard', icon: 'pi pi-home' },
    { label: 'PCR', routerLink: '/mtalent/manage-pcr' },
    { label: 'PCR details', routerLink: '/mtalent/pcrdetails' },
  ];
  inputFields: any = [];
  mappingDetails: any = [];
  ngOnInit(): void {
    let id = sessionStorage.getItem('currentPCRid')
      ? sessionStorage.getItem('currentPCRid')
      : '';
    this.pcrService.getIndividualPCR(id).subscribe((data) => {
      this.mappingDetails = data.mappingDetails;
      this.inputFields = transformDataToInputFields(data.pcr);
    });
  }
  pcrTableData = {
    headers: [
      {
        title: 'Candidate Id',
        sortable: true,
        filterable: true,
        filterMode: 'contains',
        filterType: 'input',
      },
      {
        title: 'Test Status',
        sortable: false,
        filterable: true,
        filterMode: 'contains',
        filterType: 'input',
      },
      {
        title: 'Current Staus',
        sortable: true,
        filterable: false,
      },
      {
        title: 'All Details',
      },
    ],
  };

  applyFilter(value: any, field: string, mode: string) {
    this.dt.filter(value, field, mode);
  }
  allDetails(event: any, op: OverlayPanel, data: any) {
    this.jsonData = formatJson(data);
    op.toggle(event);
  }
  agileUpload(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      const tempdata = reader.readAsBinaryString(file);
      console.log('temp data', tempdata);
      reader.onload = (event) => {
        console.log(event);
        let binaryData = event.target?.result;
        let workbook = XLSX.read(binaryData, { type: 'binary' });
        console.log(workbook);
        workbook.SheetNames.forEach((sheet) => {
          const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          const value = this.agileFormatData(data);
          if (value.length > 0) {
            const tempValue = value.map((temp: any) => ({
              deleted: false,
              ...temp,
            }));
            console.log(tempValue);
            this.pcrService.addAgile1Details(tempValue).subscribe((data) => {
              console.log('data fromt he backend ', data);
            });
          }
        });
      };
    }
  }
  agileFormatData(data: any) {
    let lastEntryWithId: any;
    return data.reduce(
      (
        result: any[],
        item: {
          ID: string;
          Job_Status: any;
          Job_Vendor_Submitted: any;
          Name: any;
          Numubers: any;
        }
      ) => {
        if (item.ID) {
          const entry = {
            ...item,
            ID: item.ID.toString(),
            employeeDetails: [],
          };
          result.push(entry);
          lastEntryWithId = entry;
        } else if (lastEntryWithId && item.ID === '') {
          const additionalDetail = {
            Job_Status: item.Job_Status,
            Job_Vendor_Submitted: item.Job_Vendor_Submitted,
            Name: item.Name,
            Numubers: item.Numubers,
          };
          lastEntryWithId.employeeDetails.push(additionalDetail);
        }
        return result;
      },
      []
    );
  }

  PCRUpload(event: any) {
    console.log('event object', event);
    const file = event.target.files[0];
    const fileReader = new FileReader();
    const tempData = fileReader.readAsArrayBuffer(file);
    fileReader.onload = (event) => {
      console.log('file reader event', event);
      const binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      console.log('Workbook data', workbook);
      workbook.SheetNames.forEach((sheet) => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        const pcrData = data.map((pcr: any) => ({
          pcrId: pcr['BPM ID'],
          createdBy: pcr['APPROVED BY'],
          createdData: pcr['APPROVED DATE'],
          jobTitle: pcr['ROLE'],
          location: pcr['ONSITE/OFFSHORE'],
          pcrStatus: pcr['POSITION STATUS'],
          requestedBy: pcr['POS REQUESTED BY'],
          skills: {
            primarySkills: pcr['PRIMARY SKILL']
              .split(',')
              .map((skill: string) => skill.trim()),
            secondarySkills: pcr['SECONDARY SKILL']
              .split(',')
              .map((skill: string) => skill.trim()),
          },
        }));
        console.log('data from excel sheet', data);
        console.log('modified data', pcrData);
      });
    };
  }
}
