import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../shared/Services/employee.service';
import Swal from 'sweetalert2';
import {  Router } from '@angular/router';
import { IEmployeeData } from '../../../shared/Models/Employees';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeesData: IEmployeeData[] = [];
  searchterm = '';
  recordLimit: number = 5;

  constructor(private empService: EmployeeService , private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.empService.getAllEmployees().subscribe({
      next: (response) => {
        this.employeesData = response;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      }
    });
  }

  deleteEmployee(employeeId: string): void {
    Swal.fire({
      title: 'هل انت متأكد',
      text: 'سيتم حذف هذا الموظف',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم, قم بالحذف',
      cancelButtonText: 'لا, الغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        this.empService.deleteEmployee(employeeId).subscribe({
          next: () => {
            // Update employeesData after successful deletion
            this.employeesData = this.employeesData.filter(p => p.id !== employeeId);
            Swal.fire(
              'حذف موظف!',
              'تم حذف هذا الموظف.',
              'success'
            );
          },
          error: (error: any) => {
            Swal.fire(
              'حذف الموظف!',
              'لم يتم حذف هذا الموظف.',
              'error'
            );
            console.error('Error deleting employee:', error); // Log detailed error message
          }
        });
      }
    });
  }

  viewEmployee(employeeId: string): void {
    this.router.navigate(['/employee/employee', employeeId]);
}

editEmployee(employeeId: string): void {
    this.router.navigate(['/employee/employee', employeeId]);
}
  
}
