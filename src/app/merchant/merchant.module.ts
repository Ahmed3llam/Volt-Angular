import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { OrderFormComponent } from './order-form/order-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OrderFormComponent,

  ],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    SharedModule
  ]
})
export class MerchantModule { }
