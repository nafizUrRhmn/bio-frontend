import {Component, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from "@angular/material/stepper";
import {MenuMaintenanceService} from "./menu-maintenance.service";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../../_services/alert-service";
import {AgbListComponent} from "../../../shared/components/agb-list/agb-list.component";
import {MrhBlock} from "../../../_models/socket-payload/mrh-block";

@Component({
  selector: 'app-menu1',
  templateUrl: './menu-maintenance.component.html',
  styleUrls: ['./menu-maintenance.component.scss'],
})
export class MenuMaintenanceComponent {

  @ViewChild('stepper', {read: MatStepper}) stepper: MatStepper;
  menuSearchForm = this._formBuilder.group({
    funcCode: '',
    menuId: ''
  });

  mopCodeDescList = [];
  mopPermList = [];
  menuObj = {'menuId': '', 'menuTp': 'N/A', 'menuDesc': 'N/A'};
  menuSaveForm = this._formBuilder.group({
    module: '',
    menuType: 'root',
    featureNames: new FormArray([]),
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

  getFormData: FormData;
  menuType = '';

  // languages = ['BAN', 'ENG'];
  modules = [{key: 'ACCESS_CONTROL', moduleName: 'ACCESS CONTROL'}, {key: 'OPERATIONS', moduleName: 'OPERATIONS'},
    {key: 'CCONF', moduleName: 'CORE CONFIG'}]


  constructor(private _formBuilder: FormBuilder,
              private menuMaintenanceService: MenuMaintenanceService,
              private dialog: MatDialog, private alertService: AlertService) {
    // this.menuCreationForm = this.fb.group({});
  }

  ngOnInit(): void {


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
      this.menuObj = res;
      this.setFormFields(this.menuObj);
    });
  }

  private setFormFields(menuObj: any) {
    this.menuSearchForm.get('menuId').setValue(menuObj.menuId);
  }

  get funCode() {
    return this.menuSearchForm.get('funcCode').value;
  }

  get menuId() {
    return this.menuSearchForm.get('menuId').value;
  }

  onNext() {
    this.menuMaintenanceService.menuVerification(this.menuSearchForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.getFormData = response?.genDataBlock?.formData;
        const mrhBlocks: MrhBlock[] = response?.mrhBlock.mrhBlocks;
        for (let mrhBlock of mrhBlocks) {
          if (mrhBlock.listName === 'mopCodeDescList' && mrhBlock.numberOfRecs > 0) {
            this.mopCodeDescList = this.mrhBlockToGrid(mrhBlock);
            for (const mop of this.mopCodeDescList) {
              let featureNameForm = new FormGroup({
                langCode: new FormControl('', Validators.required),
                langCodeDesc: new FormControl('', Validators.required),
                menuCodeDesc: new FormControl('', Validators.required)
              });
              (this.menuSaveForm.get('featureNames') as FormArray).push(featureNameForm);
            }

            this.menuSaveForm.get('featureNames').patchValue(<any[]> this.mopCodeDescList);
          } else if (mrhBlock.listName === 'mopPermList' && mrhBlock.numberOfRecs > 0) {
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
    console.log(this.menuSaveForm.getRawValue())
  }

  onMenuTypeChange($event) {
    this.menuType = $event.target.value;
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
}

interface FormData {
  delFlg: string;
  lchgTime: string,
  lchgUserId: string,
  secuInd: string,
  entityCreFlg: string,
  menuTp: string,
  rcreUserId: string,
  param1: string,
  param2: string,
  param3: string,
  param4: string,
  param5: string,
  rcreTime: string
}
