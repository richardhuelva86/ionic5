import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FruitDetailsPage } from './fruit-details.page';
import { FruitsService } from '../../services/fruits.service';

const routes: Routes = [
  {
    path: '',
    component: FruitDetailsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [FruitsService],
})
export class FruitDetailsPageRoutingModule {}
