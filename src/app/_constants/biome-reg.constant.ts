import { FingerprintCaptureComponent } from "../private/biome-reg/fingerprint-capture/fingerprint-capture.component";

export class BiomeRegConstant {
  public static readonly BIOME_REG_COMPONENT_MAP: Map<string, any> = new Map([
    ['fingerprintCap', {
      obj: FingerprintCaptureComponent
    }]
  ])
}
