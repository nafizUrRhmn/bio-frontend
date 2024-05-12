import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {CommonModule} from "@angular/common";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatNativeDateModule} from "@angular/material/core";
import {NrxGridModule} from "../../../../shared/components/nrx-grid/nrx-grid.module";
import {AlertService} from "../../../../_services/alert-service";
import {BtnCellRendererComponent} from "../../../../shared/components/btn-grid/btn-cell-renderer.component";
import {NrxGridComponent} from "../../../../shared/components/nrx-grid/nrx-grid.component";
import {OnboardingConstant} from "../onboarding.constant";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, FormsModule, ReactiveFormsModule,
    NrxGridModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  styleUrls: ['./documents.component.scss']
})

export class DocumentsComponent {
  panelOpenState = false;

  @Output() submitEvent = new EventEmitter<any>();
  @Output() previousEvent = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private alertService: AlertService) {
  }


  //////////////////////////////////////////////////
  documentsForm = this.formBuilder.group({
    purposeType: ['', Validators.required],
    documentType: ['', Validators.required],
    docNumber: ['', Validators.required],
    authority: ['', Validators.required],
    issueDate: [''],
    expiryDate: [''],
    documentsVerified: ['']
  });
  purposeType = [{
    id: 1, name: 'Proof of Business'
  }, {
    id: 2, name: 'Proof of Address'
  },
    {
      id: 3, name: 'Proof of Identity'
    }
  ];

  documentTypeAll = [{
    id: 1, purposeType: 1, name: 'National ID'
  }, {
    id: 2, purposeType: 1, name: 'TIN'
  }, {
    id: 3, purposeType: 2, name: 'Passport'
  }
  ];
  documentType = [];
  actionType = '';
  documentsColDef = [
    // {field: 'id', hide: true},
    {field: 'purposeType', headerName: 'Purpose Type', colId: 'purposeType', hide: true},
    {field: 'purposeTypeName', headerName: 'Purpose Type', colId: 'purposeTypeName'},
    {field: 'documentType', headerName: 'Document Type', hide: true},
    {field: 'documentTypeName', headerName: 'Document Type'},
    {field: 'docNumber', headerName: 'Document Number'},
    {field: 'authority', headerName: 'Authority'},
    {
      field: 'button', cellRenderer: BtnCellRendererComponent,
      cellRendererParams: {
        onClick: (value) => {
          this.actionType = value;
        }
      }
    }
  ];

  documentObjList = [];
  // parentRows = [];
  isUpdate = false;
  // updateEvent: any;
  updateNode: any;

  @ViewChild(NrxGridComponent) nrxGrid: NrxGridComponent;

  onPurposeTypeChange() {
    const value = <any>this.documentsForm.get('purposeType').value;
    this.documentType = this.documentTypeAll.filter(u => u.purposeType === value?.id);
  }

  onRowClick($event) {
    this.updateNode = $event.node;
    const purposeTypeObj = this.purposeType.find(u => u.id === $event.data.purposeType);
    const documentTypeObj = this.documentTypeAll.find(u => u.id === $event.data.documentType);
    const payload = {...$event.data, 'purposeType': purposeTypeObj, 'documentType': documentTypeObj}
    if(this.actionType === 'delete'){
      const row = [$event.data]
      this.nrxGrid.gridApi.applyTransaction({ remove: row});
    }else{
      this.documentsForm.patchValue(payload);
      this.isUpdate = true;
    }
    // $event.data.delFlg = $event.data.delFlg === 'Y' ? true : false;
    // this.parentMenuForm.patchValue($event.data);
  }


  addOnParentGrid(type: string) {
    let rows = []
    this.nrxGrid?.gridApi.getRenderedNodes().forEach(u => rows.push(u.data));
    let formData: any = this.documentsForm.value;
    const purposeType = <any>this.documentsForm.get('purposeType').value;
    const documentType = <any>this.documentsForm.get('documentType').value;
    formData = {
      ...this.documentsForm.value,
      'id': rows.length+1,
      'purposeType': purposeType?.id,
      'purposeTypeName': purposeType?.name,
      'documentType': documentType?.id,
      'documentTypeName': documentType?.name
    }
    let parentRows = <any>this.nrxGrid.gridApi.getRenderedNodes();
    let arr = [];
    let obj = parentRows.find(u => u.purposeType === formData.purposeType && u.documentType === formData.documentType);
    if (!this.isUpdate && obj) {
      this.alertService.warningAlert(`Parent menu already exist ${obj.parMenuCode}`)
      return;
    }
    if (this.isUpdate) {
      this.updateNode.updateData(formData);
    } else {
      const data =
        arr.push(formData);
    }
    this.nrxGrid.onGridReset(arr, type);
    this.documentsForm.reset();
    this.isUpdate = false;
  }


  onAdd(): void {
    // console.log(this.documentsForm.value);
  }

  onSubmit(): void {
    console.log(this.documentsForm.value);
    const payload = {
      'payload': this.documentsForm.value, 'formName': OnboardingConstant.DOCUMENTS_FORM,
      'form': this.documentsForm
    }
    this.submitEvent.emit(payload);
  }

  previous(): void {
    const payload = {'currentForm': OnboardingConstant.DOCUMENTS_FORM}
    this.previousEvent.emit(payload);
  }


}
