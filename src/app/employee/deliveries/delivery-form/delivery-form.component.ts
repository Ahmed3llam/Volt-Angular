import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryService } from '../../../shared/Services/delivery.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent implements OnInit, OnDestroy {
  deliveryForm: FormGroup;
  id: string | null = null;
  deliverySubscription: Subscription | undefined;
  updateSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private deliveryService: DeliveryService
  ) {
    this.deliveryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      branchId: [0, Validators.required],
      government: ['', Validators.required],
      address: ['', Validators.required],
      discountType: [0, Validators.required],
      companyPercent: ['', Validators.required],
      status: [true, Validators.required],
      branchName: ['', Validators.required],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id && this.id !== '0') {
      this.deliverySubscription = this.deliveryService.getDeliveryById(this.id).subscribe({
        next: (delivery) => {
          this.deliveryForm.patchValue(delivery);
        },
        error: (err) => {
          console.error(err.message);
          Swal.fire(
            'Error!',
            'An error occurred while fetching the delivery data',
            'error'
          );
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.deliverySubscription) {
      this.deliverySubscription.unsubscribe();
    }
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.deliveryForm.valid) {
      const delivery: any = this.deliveryForm.value;
      if (this.id === '0') {
        this.updateSubscription = this.deliveryService.addDelivery(delivery).subscribe({
          next: () => {
            Swal.fire(
              'Success!',
              'Delivery added successfully',
              'success'
            );
            this.router.navigate(['/employee/delivery']);
          },
          error: (err) => {
            console.error('Error adding delivery', err);
            Swal.fire(
              'Error!',
              'An error occurred while adding the delivery',
              'error'
            );
          }
        });
      } else {
        delivery.deliveryId = this.id;
        this.updateSubscription = this.deliveryService.updateDelivery(this.id!, delivery).subscribe({
          next: () => {
            Swal.fire(
              'Success!',
              'Delivery updated successfully',
              'success'
            );
            this.router.navigate(['/employee/delivery']);
          },
          error: (err) => {
            console.error('Error updating delivery', err);
            Swal.fire(
              'Error!',
              'An error occurred while updating the delivery',
              'error'
            );
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/employee/delivery']);
  }

  navigateBack(): void {
    this.router.navigate(['/employee/delivery']);
  }
}
