import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FruitListPageRoutingModule } from './fruit-list-routing.module';

import { FruitListPage } from './fruit-list.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FruitListPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [FruitListPage],
})
export class FruitListPageModule {}
