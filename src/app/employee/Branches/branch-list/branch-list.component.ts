import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../../shared/Services/branch.service';
import { Branch, getAllBranch } from '../../../shared/models/branch';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit {
  branchData: getAllBranch[] = [];
  searchterm = "";
  recordLimit: number = 5;
  branch:Branch={
    
  id: 0,
  name: '',
  stateId:0,
  status:true


  }
  constructor(private _BranchService: BranchService,private _Router:Router) {}

  ngOnInit(): void {
    this._BranchService.getBranches().subscribe({
      next: (response) => {
        this.branchData = response;
        console.log(this.branchData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteBranch(id: number) {
    this._BranchService.deleteBranch(id).subscribe({
      next: () => {
        console.log(`Branch with id ${id} deleted successfully`);
        this.branchData = this.branchData.filter(branch => branch.id !== id);
      },
      error: (err) => {
        console.error(`Error deleting branch with id ${id}`, err);
      }
    });
  }
  updateBranchStatus(id:number)
  {
    this._BranchService.updateBranchById(id, this.branch).subscribe({
      next: (response) => {
        console.log('Branch updated successfully', response);
        this._Router.navigate(['/employee/branch']);
      },
      error: (err) => {
        console.error('Error updating branch', err);
      },
    });
  }
}
