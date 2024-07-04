import { Component } from '@angular/core';
import { agileActions } from 'src/app/store/Agile1/Agile1.action';
import { getAgile } from 'src/app/store/Agile1/Agile1.selector';
import { Store } from '@ngrx/store';
import * as XLSX from 'xlsx';
import { PcrService } from 'src/app/services/pcr.service';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-manage-agile1',
  templateUrl: './manage-agile1.component.html',
  styleUrls: ['./manage-agile1.component.scss'],
})
export class ManageAgile1Component {
  agileData: any;
  globalSearchValue!: string;
  constructor(private store: Store, private pcrService: PcrService) {}
  ngOnInit() {
    this.getAgileData();
  }

  getAgileData() {
    this.store.dispatch(agileActions.getAgileDetails());
    this.store.select(getAgile).subscribe((data) => {
      console.log('Agile Details', data);
      this.agileData = data;
    });
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
  clear(table: Table) {
    table.clear();
    this.globalSearchValue = '';
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
  extractAgile(agileData: any) {
    const worksheet = XLSX.utils.json_to_sheet(agileData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Agile details');
    XLSX.writeFile(workbook, 'Agile details.xlsx', { compression: true });
  }
}
