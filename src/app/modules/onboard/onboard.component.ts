import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { OnboardService } from 'src/app/services/onboard.service';

interface DataItem {
  id: string;
  name: string;
  mobile: string;
  email: string;
  dob: string;
}

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.scss']
})
export class OnboardComponent implements OnInit{
  data: any[] = [];
  filteredData!: any[];
  documents: any[] = [];
  selectedValue: any;
  originalData: any;

  constructor(private dataService: OnboardService) {}

  ngOnInit(): void {
    this.loadData();
    this.loadDocuments();
  }

  loadData(): void {
    this.dataService.getData().subscribe((data : any) => {
      this.data = data;
      this.filteredData = data;
    });
  }

  loadDocuments(): void {
    this.dataService.getDocuments().subscribe((data : any) => {
      this.documents = data;
      console.log(this.documents);
    });
  }

  filterData(event: any, field: string) {
    // Update the type of 'field' to string
    const filteredValue = event.target.value.toLowerCase();
    if (field in this.data[0]) {
      // Check if 'field' is a valid key of DataItem
      this.filteredData = this.data.filter((item) =>
        (item[field as keyof DataItem] as string)
          .toLowerCase()
          .includes(filteredValue)
      );
    }
  }

  getAllKeys(): string[] {
    if (this.documents.length > 0) {
        return Object.keys(this.documents[0]);
    }
    return [];
}


selectedValues: { [key: string]: string[] } = {};

handleCheckboxChange(event: any, itemName: string, key: string) {
  const selectedValue = event.target.checked ? 'selected' : 'deselected';

  if (!this.selectedValues[itemName]) {
    this.selectedValues[itemName] = [];
  }

  if (selectedValue === 'selected') {
    this.selectedValues[itemName].push(key);
  } else {
    const index = this.selectedValues[itemName].indexOf(key);
    if (index !== -1) {
      this.selectedValues[itemName].splice(index, 1);
    }
  }

  console.log('Selected Values:', this.selectedValues);
}

employeeType: SelectItem[] = [
  { label: 'Employee', value: 'Employee' },
  { label: 'Contract', value: 'Contract' },
  // Add more options as needed
];

onTypeFilterChange(event: any) {
  const selectedLocation = event.value;
  // Apply filtering based on the selected location
  // Update your filteredData array accordingly
  // For example:
  this.filteredData = this.originalData.filter((item: { location: any; }) => item.location === selectedLocation);
}
}
