import {Component, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from "@angular/material/stepper";
import {MenuMaintenanceService} from "./menu-maintenance.service";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../../_services/alert-service";
import {AgbListComponent} from "../../../shared/components/agb-list/agb-list.component";
import {MrhBlock} from "../../../_models/socket-payload/mrh-block";
import {ColDef} from "ag-grid-community";
import {NrxGridComponent} from "../../../shared/components/nrx-grid/nrx-grid.component";
import {MenuFormData} from "./menu-form-data";
import {EventBusService} from "../../../_services/event-bus.service";

@Component({
  selector: 'app-menu1',
  templateUrl: './menu-maintenance.component.html',
  styleUrls: ['./menu-maintenance.component.scss'],
})
export class MenuMaintenanceComponent {

  @ViewChild('stepper', {read: MatStepper}) stepper: MatStepper;

  @ViewChild(NrxGridComponent) nrxGrid: NrxGridComponent;
  menuSearchForm = this._formBuilder.group({
    funcCode: '',
    menuId: ''
  });
  parentMenuForm = this._formBuilder.group({
    parMenuCode: '',
    parMenuCodeDesc: '',
    levelCode: '',
    delFlg: '',
    entityCreFlg: '',
    lchgTime: ''
  });

  mopCodeDescMrh: MrhBlock;
  mopCodeDescList: any[];

  mopPermMrh: MrhBlock;
  mopPermList: any[];
  // menuObj = {'menuId': '', 'menuTp': 'N/A', 'menuDesc': 'N/A'};
  menuSaveForm = this._formBuilder.group({
    delFlg: '',
    lchgTime: '',
    menuId: '',
    module: '',
    menuTp: 'R',
    lchgUserId: '',
    secuInd: 'I',
    languageDetails: new FormArray([]),
    hasAdd: false,
    addAutoVerify: [{value: false, disabled: true}],
    hasDelete: false,
    deleteAutoVerify: [{value: false, disabled: true}],
    hasUndelete: false,
    undeleteAutoVerify: [{value: false, disabled: true}],
    hasModification: false,
    modificationAutoVerify: [{value: false, disabled: true}],
    hasVerify: false,
    hasCancel: false,
    param1: '',
    param2: '',
    param3: '',
    param4: '',
    param5: ''
  },);

  menuFormData: MenuFormData;

  mopParemListrowData: any;
  mopParemListcolumnDefs: ColDef[];

  // title: string;
  // messageDetails: string;
  // selectionMode: any = 'single';
  // paginationPageSize: number | undefined;

  modules = [{key: 'ACCESS_CONTROL', moduleName: 'ACCESS CONTROL'}, {key: 'OPERATIONS', moduleName: 'OPERATIONS'},
    {key: 'CCONF', moduleName: 'CORE CONFIG'}]

  // parentRows = [];
  isUpdate = false;
  // updateEvent: any;
  updateNode: any;

  constructor(private _formBuilder: FormBuilder,
              private menuMaintenanceService: MenuMaintenanceService,
              private dialog: MatDialog, private alertService: AlertService, private eventBus: EventBusService) {

  }

  ngOnInit(): void {
    this.mopParemListcolumnDefs = [
      {field: 'parMenuCode', headerName: 'Parent Menu', colId: 'parMenuCode'},
      {field: 'parMenuCodeDesc', headerName: 'Parent Menu Desc'},
      {field: 'entityCreFlg', hide: true},
      {field: 'lchgTime', hide: true},
      {field: 'levelCode', headerName: 'Level'},
      {field: 'delFlg', headerName: 'Delete?'}
    ];
  }

  onSearchMenuId() {
    this.menuMaintenanceService.getMenuByMenuId(this.menuSearchForm.value).subscribe({
      next: (response) => {
        this.openDialogue(response);
      },
      error: err => {
        this.alertService.errorAlert(err.error.message);
      }
    });
  }

  openDialogue(response: any) {
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      data: {title: 'Reference Type List', content: response},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(res => {
      this.menuFormData = {...this.menuFormData, ...res};
      this.menuSearchForm.get('menuId').setValue(this.menuFormData.menuId);
    });
  }


  get funCode() {
    return this.menuSearchForm.get('funcCode').value;
  }

  get menuId() {
    return this.menuSearchForm.get('menuId').value;
  }

  get isDisabled() {
    console.log(this.parentMenuForm.get('lchgTime').value)
    return (this.parentMenuForm.get('lchgTime').value && this.isUpdate) ? true : false;
  }

  onNext() {
    this.menuMaintenanceService.menuVerification(this.menuSearchForm.value).subscribe({
      next: (response) => {
        this.menuFormData = response?.genDataBlock?.formData;
        this.menuSaveForm.patchValue(this.menuFormData);
        const mrhBlocks: MrhBlock[] = response?.mrhBlock.mrhBlocks;
        for (let mrhBlock of mrhBlocks) {
          if (mrhBlock.listName === 'mopCodeDescList' && mrhBlock.numberOfRecs > 0) {
            this.mopCodeDescMrh = mrhBlock;
            this.mopCodeDescList = this.mrhBlockToGrid(mrhBlock);
            for (const mop of this.mopCodeDescList) {
              let featureNameForm = new FormGroup({
                langCode: new FormControl('', Validators.required),
                langCodeDesc: new FormControl('', Validators.required),
                menuDesc: new FormControl('', Validators.required),
                delFlg: new FormControl(''),
                lchgTime: new FormControl('')
              });
              (this.menuSaveForm.get('languageDetails') as FormArray).push(featureNameForm);
            }

            this.menuSaveForm.get('languageDetails').patchValue(this.mopCodeDescList);
          } else if (mrhBlock.listName === 'mopPermList' && mrhBlock.numberOfRecs > 0) {
            this.mopPermMrh = mrhBlock;
            this.mopPermList = this.mrhBlockToGrid(mrhBlock);
          }
        }
        this.stepper.next()
      },
      error: err => {
        this.alertService.errorAlert(err.error.message);
      }
    });

    // this.stepper.next()
  }

  onCancel() {
    this.stepper.reset()
  }

  onSave() {
    let rows = []
    this.nrxGrid.gridApi.getRenderedNodes().forEach(u => rows.push(u.data));
    let formData = this.menuSaveForm.getRawValue();
    formData = {...formData, 'menuId': this.menuId};
    let languageDetails = this.menuSaveForm.get('languageDetails').value;
    delete formData.languageDetails;
    this.mopPermMrh.dataBlock = this.gridToMrhBlock(rows, this.mopPermMrh.headerInfo);
    this.mopCodeDescMrh.dataBlock = this.gridToMrhBlock(languageDetails, this.mopCodeDescMrh.headerInfo);
    let payload = {
      'formData': formData, 'mopPermMrh': this.mopPermMrh,
      'mopCodeDescMrh': this.mopCodeDescMrh
    }

    this.menuMaintenanceService.menuSave(payload).subscribe({
      next: (v) => this.alertService.successAlert("Data Save Successfully")
        .then(() => {
          this.menuSaveForm.reset();
          this.stepper.reset();
        }),
      error: (e) => this.alertService.errorAlert("Password Change Failed")
    });
    console.log(payload);

  }

  onMenuTypeChange($event) {
    this.menuFormData.menuTp = $event.target.value;

  }

  checkBoxValues() {
    if (this.menuSaveForm.get('hasAdd').value) {
      this.menuSaveForm.get('addAutoVerify').enable({onlySelf: true});
    } else {
      this.menuSaveForm.get('addAutoVerify').setValue(false);
      this.menuSaveForm.get('addAutoVerify').disable({onlySelf: true});
    }
    if (this.menuSaveForm.get('hasDelete').value) {
      this.menuSaveForm.get('deleteAutoVerify').enable({onlySelf: true});
    } else {
      this.menuSaveForm.get('deleteAutoVerify').disable({onlySelf: true});
      this.menuSaveForm.get('deleteAutoVerify').setValue(false);
    }

    if (this.menuSaveForm.get('hasUndelete').value) {
      this.menuSaveForm.get('undeleteAutoVerify').enable({onlySelf: true});
    } else {
      this.menuSaveForm.get('undeleteAutoVerify').setValue(false);
      this.menuSaveForm.get('undeleteAutoVerify').disable({onlySelf: true});
    }
    if (this.menuSaveForm.get('hasModification').value) {
      this.menuSaveForm.get('modificationAutoVerify').enable({onlySelf: true});
    } else {
      this.menuSaveForm.get('modificationAutoVerify').setValue(false);
      this.menuSaveForm.get('modificationAutoVerify').disable({onlySelf: true});
    }
  }

  mrhBlockToGrid(mrhBlock: MrhBlock) {
    let list = [];
    for (let i = 0; i < mrhBlock.dataBlock.length; i++) {
      let obj = {}
      for (let j = 0; j < mrhBlock.headerInfo.length; j++) {
        let key = mrhBlock.headerInfo[j];
        let value = mrhBlock.dataBlock[i][j];
        obj = {...obj, [key]: value};
      }
      list.push(obj);
    }
    return list;
  }


  gridToMrhBlock(list: any[], headerInfo: string[]) {
    let dataBlock = [];
    let rowData = [];
    // Constructing dataBlock array
    for (let item of list) {
      let rowData = [];
      for (let key of headerInfo) {
        rowData.push(item[key]);
      }
      dataBlock.push(rowData);
    }
    return dataBlock;
  }


  onSearchParentMenuId() {
    const data = {
      'menuId': '',
      'funcCode': 'I'
    };
    this.menuMaintenanceService.getMenuByMenuId(data).subscribe({
      next: (response) => {
        this.openDialogueParent(response);
      },
      error: err => {
        this.alertService.errorAlert(err.error.message);
      }
    });
  }

  openDialogueParent(response: any) {
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      data: {title: 'Parent Menu List', content: response},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(res => {
      this.parentMenuForm.get('parMenuCode').patchValue(<never>res?.menuId)
      this.parentMenuForm.get('parMenuCodeDesc').patchValue(<never>res?.menuDesc)
    });
  }

  addOnParentGrid(type: string) {
    let formData = this.parentMenuForm.value;
    formData = {...formData, 'delFlg': formData.delFlg ? 'Y' : 'N'};
    let parentRows = <any>this.nrxGrid.gridApi.getRenderedNodes();
    let arr = [];
    let obj = parentRows.find(u => u.parMenuCode === formData.parMenuCode);
    if (!this.isUpdate && obj) {
      this.alertService.warningAlert(`Parent menu already exist ${obj.parMenuCode}`)
      return;
    }

    if (this.isUpdate) {
      console.log()
      this.updateNode.updateData(formData);
      // this.updateEvent.data = formData;
      // arr.push(obj);
      // this.nrxGrid.gridApi.({update: arr});
    } else {
      arr.push(formData);
    }
    this.nrxGrid.onGridReset(arr, type);
    this.parentMenuForm.reset();
    this.isUpdate = false;
  }

  onRowClick($event) {
    this.updateNode = $event.node;
    $event.data.delFlg = $event.data.delFlg === 'Y' ? true : false;
    console.log($event.data);
    this.parentMenuForm.patchValue($event.data);
    this.isUpdate = true;
  }
}

