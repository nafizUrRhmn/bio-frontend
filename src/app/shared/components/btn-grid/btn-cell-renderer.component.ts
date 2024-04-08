import {ICellRendererAngularComp} from "ag-grid-angular";
import {Component} from "@angular/core";
import {ICellRendererParams} from "ag-grid-community";
import {EventBusService} from "../../../_services/event-bus.service";
import {EventNamesConstant} from "../../../_constants/event-names.constant";

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <button class="btn" (click)="onClick($event, 'edit')"><i class="ti ti-pencil"></i></button>
    <button class="btn" (click)="onClick($event, 'delete')"><i class="ti ti-trash"></i></button>
  `,
})
export class BtnCellRendererComponent implements ICellRendererAngularComp {

  constructor() {
  }
  private params: any;
  agInit(params: any): void {
    this.params = params;
  }
  onClick($event: any, type: string) {
    this.params.type = type;
    // console.log(this.params.data);
    this.params.clicked(this.params);
    // this.eventBus.publish({name: EventNamesConstant.MENU_PARENT_DATA, data: this.params})
    // this.params.clicked(this.params.value);
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }
}
