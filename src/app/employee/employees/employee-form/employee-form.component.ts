import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../shared/Services/employee.service';
import Swal from 'sweetalert2';
import { IEmployeeData } from '../../../shared/Models/Employees';

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employeeId :string ='';

    employee: IEmployeeData = {
        id: '',
        name: '',
        email: '',
        phone: '',
        branchName: '',
        role: '',
        password: '',
        status: false
    };

    isEditing: boolean = false;

    constructor(
        private empService: EmployeeService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.employeeId = params['id'];
            if (this.employeeId && this.employeeId !== '0') {
                this.isEditing = true;
                this.loadEmployee(this.employeeId);
            }
        });
    }

    loadEmployee(employeeId: string): void {
        this.empService.getEmployeeById(employeeId).subscribe({
            next: (employee) => {
                this.employee = employee;
            },
            error: (error) => {
                console.error('Error loading employee:', error);
            }
        });
    }

    onSubmit(): void {
        if (this.employeeId != '0') {
            this.updateEmployee();
        } else {
            this.addEmployee();
        }
    }

    addEmployee(): void {
      this.empService.addNewEmployee(this.employee).subscribe({
          next: (employeeDto: IEmployeeData) => {
              Swal.fire(
                  'إضافة موظف!',
                  'تم إضافة الموظف بنجاح.',
                  'success'
              );
              this.router.navigate(['/employee']);
          },
          error: (error: any) => {
              console.error('Error adding employee:', error);
              let errorMessage = 'حدث خطأ أثناء إضافة الموظف';
              if (error.error && error.error.message) {
                  errorMessage += `: ${error.error.message}`;
              }
              Swal.fire(
                  'إضافة موظف!',
                  errorMessage,
                  'error'
              );
          }
      });
  }
  

    updateEmployee(): void {
        this.empService.editEmployee(this.employee.id, this.employee).subscribe({
            next: () => {
                Swal.fire(
                    'تعديل موظف!',
                    'تم تعديل الموظف بنجاح.',
                    'success'
                );
                this.router.navigate(['/employee/employee']);
            },
            error: (error: any) => {
                Swal.fire(
                    'تعديل موظف!',
                    `حدث خطأ أثناء إضافة الموظف: ${error.error}`,
                    'error'
                );
                console.error('Error updating employee:', error);
            }
        });
    }
}
