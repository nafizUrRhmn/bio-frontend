import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-pocket-statement',
  templateUrl: './pocket-statement.component.html',
  styleUrls: ['./pocket-statement.component.scss']
})
export class PocketStatementComponent {

 rowData: any[] = [];
 
 colDefs: ColDef[] = [
  { headerName: 'Reference', field: 'reference' },
  { headerName: 'Date', field: 'date' },
  { headerName: 'Narration', field: 'narration' },
  { headerName: 'Details', field: 'details' },
  { headerName: 'Credit', field: 'credit' },
  { headerName: 'Debit', field: 'debit' },
  { headerName: 'MenuBar', field: '' }
];



}
