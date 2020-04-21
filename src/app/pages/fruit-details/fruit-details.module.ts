import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FruitDetailsPageRoutingModule } from './fruit-details-routing.module';

import { FruitDetailsPage } from './fruit-details.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FruitDetailsPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  declarations: [FruitDetailsPage],
})
export class FruitDetailsPageModule {}
