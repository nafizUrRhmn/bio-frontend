import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AgGridEvent, GridApi, GridReadyEvent, SelectionChangedEvent} from "ag-grid-community";

@Component({
  selector: 'app-nrx-grid',
  templateUrl: './nrx-grid.component.html',
  styleUrls: ['./nrx-grid.component.scss'],
})
export class NrxGridComponent implements OnInit {

  constructor() {
  }

  @Input() columnDefs;
  @Input() rowData;
  @Input() rowSelection: "single" | "multiple" = "single";
  @Input() rowHeight = 40;
  @Input() suppressRowSelection = true;
  @Output() onSelectionChange = new EventEmitter<any>();
  @Output() onRowClickEvent = new EventEmitter<any>();
  @Input() gridSize = 'width: auto; height: 400px;';

  gridApi: GridApi;

  defaultColDef = {flex:1, minWidth: 100};


  ngOnInit(): void {
    // Row Data: The data to be displayed.
    // this.rowData =

    // Column Definitions: Defines the columns to be displayed.
    // this.columnDefs =
  }

  onGridReady(params: GridReadyEvent<any[]>) {
    this.gridApi = params.api;
    this.gridApi.setGridOption('rowHeight', this.rowHeight);
    this.gridApi.setGridOption('suppressRowClickSelection', this.suppressRowSelection);
  }

  onSortChanged(e: AgGridEvent) {
    this.gridApi.refreshCells();
  }

  onFilterChanged(e: AgGridEvent) {
    this.gridApi.refreshCells();
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    const selectedData = this.gridApi.getSelectedRows()[0];
    this.onSelectionChange.emit(selectedData);
  }

  onRowClick($event){
    this.onRowClickEvent.emit($event);
  }
  onGridReset(row, type){
    console.log(type);
    console.log(row);
    this.gridApi.getRowNode(row.parMenuCode);
    this.gridApi!.applyTransaction({[type]: row});
  }


}
