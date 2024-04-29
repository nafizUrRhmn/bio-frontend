import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BiomeRegComponent} from "./biome-reg.component";
import {TabsModule} from "../../theme/shared/components/tabs/tabs.module";

const routes: Routes = [
  {
    path: '',
    component: BiomeRegComponent
  },
];

@NgModule({
  declarations: [
    BiomeRegComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    TabsModule

  ],
})
export class BiomeRegModule {
}
