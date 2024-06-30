
import { Component, OnInit } from '@angular/core';
import { Delivery } from '../../../shared/Models/Delivery/delivery';
import { DeliveryService } from '../../../shared/Services/delivery.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {
  deliveries: Delivery[] = [];
  allDeliveries: Delivery[] = [];

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.loadDeliveries();
  }

  loadDeliveries(): void {
    this.deliveryService.getAllDeliveries().subscribe({
      next: (deliveries: any) => {
        this.deliveries = deliveries.$values;
        this.allDeliveries = deliveries.$values;
      },
      error: err => console.error(err)
    });
  }

  deleteDelivery(id: string): void {
    Swal.fire({
      title: 'هل انت متأكد',
      text: 'سيتم حذف هذا المندوب',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم, قم بالحذف',
      cancelButtonText: 'لا, الغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deliveryService.deleteDelivery(id).subscribe({
          next: () => {
            this.deliveries = this.deliveries.filter(d => d.deliveryId !== id);
            this.allDeliveries = this.allDeliveries.filter(d => d.deliveryId !== id);
            Swal.fire(
              'حذف المندوب!',
              'تم حذف هذا المندوب.',
              'success'
            );
          },
          error: (err) => {
            Swal.fire(
              'حذف المندوب!',
              'لم يتم حذف هذا المندوب.',
              'error'
            );
            console.log("error", err);
          }
        });
      }
    });
  }

  changeStatus(id: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.deliveryService.changeStatus(id, checked).subscribe(() => {
      this.loadDeliveries();
    });
  }

  onSearch(searchTerm: string): void {
    if (searchTerm) {
      this.deliveries = this.allDeliveries.filter(delivery =>
        delivery.name.includes(searchTerm) ||
        delivery.email.includes(searchTerm) ||
        delivery.phone.includes(searchTerm) ||
        delivery.branchName.includes(searchTerm)
      );
    } else {
      this.deliveries = [...this.allDeliveries];
    }
  }
}

