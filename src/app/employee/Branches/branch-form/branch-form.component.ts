import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../../../shared/Services/branch.service';
import { getAllBranch } from '../../../shared/models/branch';
import { GovernmentService } from '../../../shared/Services/government.service';
import { Government } from '../../../shared/models/government';

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrl: './branch-form.component.css',
})
export class BranchFormComponent {
  branchId: number | null = 0;
  branch: getAllBranch | null = null;
  GovernmentData: Government[] = [];

  BranchData = new FormGroup({
    roleName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    governmentId: new FormControl(0, Validators.required), // Add this line
  });
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _BranchService: BranchService,
    private _GovernmentService: GovernmentService
  ) {}

  // ngOnDestroy(): void {
  //   if (this.updateSubscription) {
  //     this.updateSubscription.unsubscribe();
  //   }
  //   if (this.addSubscription) {
  //     this.addSubscription.unsubscribe();
  //   }
  // }

  ngOnInit(): void {
    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    this.branchId = id !== null ? +id : null;
    this._GovernmentService.getGovernments().subscribe({
      next: (response) => {
        this.GovernmentData = response;
        console.log(this.GovernmentData);
      },
      error: (err) => {
        console.log(err);
      },
    });
    if (this.branchId !== null && this.branchId != 0) {
      this._BranchService.getBranchById(this.branchId).subscribe({
        next: (response) => {
          this.branch = response;
          this.BranchData.patchValue({
            roleName: this.branch.name,
            governmentId: this.branch.stateId, // Assuming stateId corresponds to governmentId
          });
          console.log(this.branch);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  onSubmit() {
    if (this.BranchData.valid) {
      const branch: getAllBranch = {
        id: this.branchId || 0,
        name: this.BranchData.value.roleName!,
        isDeleted: false, // Assuming a default value
        status: true, // Assuming a default value
        stateId: this.BranchData.value.governmentId!,
      };

      if (this.branchId && this.branchId !== 0) {
        this._BranchService.updateBranchById(this.branchId, branch).subscribe({
          next: (response) => {
            console.log('Branch updated successfully', response);
            this._Router.navigate(['/employee/branch']);
          },
          error: (err) => {
            console.error('Error updating branch', err);
          },
        });
      } else {
        this._BranchService.addBranch(branch).subscribe({
          next: (response) => {
            this._Router.navigate(['/employee/branch']);
            console.log('Branch added successfully', response);
          },
          error: (err) => {
            this._Router.navigate(['/employee/branch']);           
          },
        });
        console.log('Adding new branch', branch);
      }
    }
  }

 
  onCancel() {
    this._Router.navigate(['employee/branch']);
  }
}
