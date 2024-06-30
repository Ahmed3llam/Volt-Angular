import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchListComponent } from './Branches/branch-list/branch-list.component';
import { BranchFormComponent } from './Branches/branch-form/branch-form.component';
import { CityListComponent } from './Cities/city-list/city-list.component';
import { CityFormComponent } from './Cities/city-form/city-form.component';
import { WightSettingComponent } from './Weight/wight-setting/wight-setting.component';
import { StateListComponent } from './States/state-list/state-list.component';
import { StateFormComponent } from './States/state-form/state-form.component';
import { DeliveryListComponent } from './deliveries/delivery-list/delivery-list.component';
import { DeliveryFormComponent } from './deliveries/delivery-form/delivery-form.component';
import { MerchantListComponent } from './merchants/merchant-list/merchant-list.component';
import { MerchantFormComponent } from './merchants/merchant-form/merchant-form.component';
import { PermissionListComponent } from './Permissions/permission-list/permission-list.component';
import { UpdatePermissionComponent } from './Permissions/update-permission/update-permission.component';
import { AddPermissionComponent } from './Permissions/add-permission/add-permission.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';

const routes: Routes = [
  { path: 'branch' , component: BranchListComponent },
  { path: 'branch/:id' , component: BranchFormComponent },
  // ----------------------------------------------------------- //
  { path: 'city' , component: CityListComponent },
  { path: 'city/:id' , component: CityFormComponent },
  // ----------------------------------------------------------- //
  { path: 'state' , component: StateListComponent },
  { path: 'state/:id' , component: StateFormComponent },
  // ----------------------------------------------------------- //
  { path: 'delivery' , component: DeliveryListComponent },
  { path: 'delivery/:id' , component: DeliveryFormComponent },
  // ----------------------------------------------------------- //
  { path: 'merchant' , component: MerchantListComponent },
  { path: 'merchant/:id' , component: MerchantFormComponent },
  // ----------------------------------------------------------- //
  { path: 'employee' , component: EmployeeListComponent },
  { path: 'employee/new', component: EmployeeFormComponent },
  { path: 'employee/:id' , component: EmployeeFormComponent },
  // ----------------------------------------------------------- //
  { path: 'permission' , component: PermissionListComponent },
  { path: 'permission/:id' , component: UpdatePermissionComponent },
  { path: 'permission/form/:id' , component: AddPermissionComponent },
  // ----------------------------------------------------------- //
  { path: 'weight' , component: WightSettingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
