import { Component, OnInit } from '@angular/core';
import { StateService } from './../../../shared/Services/state.service';
import { IState } from '../../../shared/models/IState';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.css']
})
export class StateListComponent implements OnInit {

  stateData: IState[] = [];
  searchterm = '';
  recordLimit: number = 5;

  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit(): void {
    this.loadStates();
  }

  loadStates(): void {
    this.stateService.getGovernments().subscribe({
      next: (response) => {
        this.stateData = response;
      },
      error: (error) => {
        console.error('Error fetching states:', error);
      }
    });
  }

  deleteState(stateId: number): void {
    Swal.fire({
      title: 'هل انت متأكد',
      text: 'سيتم حذف هذه المحافظة',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم, قم بالحذف',
      cancelButtonText: 'لا, الغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        this.stateService.deleteGovernment(stateId).subscribe({
          next: () => {
            // Update stateData after successful deletion
            this.stateData = this.stateData.filter(p => p.id !== stateId);
            Swal.fire(
              'حذف محافظة!',
              'تم حذف هذه المحافظة.',
              'success'
            );
          },
          error: (error: any) => {
            Swal.fire(
              'حذف المحافظة!',
              'لم يتم حذف هذه المحافظة.',
              'error'
            );
            console.error('Error deleting state:', error); // Log detailed error message
          }
        });
      }
    });
  }

  viewState(stateId: number): void {
    this.router.navigate(['/employee/state', stateId]);
  }

  editState(stateId: number): void {
    this.router.navigate(['/employee/state', stateId]);
  }
}
