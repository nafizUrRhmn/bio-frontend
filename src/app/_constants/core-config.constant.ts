import {RefCodeTypeMaintComponent} from "../private/core-config/refcodetype-maint/refcodetype-maint.component";
import {RefCodeMaintComponent} from "../private/core-config/refcode-maint/refcode-maint.component";

export class CoreConfigConstant {

  public static readonly CORE_CONFIG_COMPONENT_MAP: Map<string, any> = new Map([
    ['refCodeTypeMaint', {
      obj: RefCodeTypeMaintComponent
    }],
    ['refCodeMaint', {
      obj: RefCodeMaintComponent
    }],
  ])
}
