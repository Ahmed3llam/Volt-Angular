import { CityService } from './../shared/Services/city.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../shared/Services/employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../shared/pipe/search.pipe';
import { PaginationPipe } from '../shared/pipe/pagination.pipe';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
import { DeliveryListComponent } from './deliveries/delivery-list/delivery-list.component';
import { DeliveryFormComponent } from './deliveries/delivery-form/delivery-form.component';
import { MerchantListComponent } from './merchants/merchant-list/merchant-list.component';
import { StateFormComponent } from './States/state-form/state-form.component';
import { MerchantFormComponent } from './merchants/merchant-form/merchant-form.component';
import { StateListComponent } from './States/state-list/state-list.component';
import { BranchListComponent } from './Branches/branch-list/branch-list.component';
import { BranchFormComponent } from './Branches/branch-form/branch-form.component';
import { CityFormComponent } from './Cities/city-form/city-form.component';
import { CityListComponent } from './Cities/city-list/city-list.component';
import { WightSettingComponent } from './Weight/wight-setting/wight-setting.component';
import { PermissionListComponent } from './Permissions/permission-list/permission-list.component';
import { AddPermissionComponent } from './Permissions/add-permission/add-permission.component';
import { UpdatePermissionComponent } from './Permissions/update-permission/update-permission.component';
import { EmployeeRoutingModule } from './employee-routing.module';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeFormComponent,
    DeliveryListComponent,
    DeliveryFormComponent,
    MerchantListComponent,
    MerchantFormComponent,
    StateFormComponent,
    StateListComponent,
    BranchListComponent,
    BranchFormComponent,
    CityFormComponent,
    CityListComponent,
    WightSettingComponent,
    PermissionListComponent,
    AddPermissionComponent,
    UpdatePermissionComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SearchPipe,
    MatIconModule
  ],
  providers: [EmployeeService],

  exports: [RouterModule]

})
export class EmployeeModule { }
