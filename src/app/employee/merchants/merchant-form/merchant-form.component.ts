import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/Services/api.service';
import { IGovernmentDTO } from '../../../shared/Models/IGovernmentDTO';
import { ICityDTO } from '../../../shared/Models/ICityDTO';
import { IMerchantDTO, ISpecialPrice } from '../../../shared/Models/IMerchant';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merchant-form',
  templateUrl: './merchant-form.component.html',
  styleUrls: ['./merchant-form.component.css']
})
export class MerchantFormComponent implements OnInit {
  merchantForm: FormGroup;
  governments: IGovernmentDTO[] = [];
  cities: ICityDTO[] = [];
  specialCities: ICityDTO[][] = [];
  id:string|null = null;
  specialPrices:ISpecialPrice[] = [{}] as ISpecialPrice[];
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.merchantForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^01[0-9]{9}$')]],
      password: ['', Validators.minLength(8)],
      government: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      pickUpSpecialCost: [0],
      refusedOrderPercent: [0],
      specialCitiesPrices: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadGovernments();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id && this.id !== '0') {
      this.loadMerchantDetails(parseInt(this.id));
    }
  }

  loadMerchantDetails(id: number): void {
    this.apiService.get<IMerchantDTO>(`/Merchant/${id}`).subscribe({
      next: (res) => {
        this.merchantForm.patchValue({
          ...res,
          specialCitiesPrices: []
        });
        this.specialCitiesPrices.clear();
        this.specialPrices = Array.isArray(res.specialCitiesPrices.$values) ? res.specialCitiesPrices.$values : [];
        this.specialPrices.forEach((price: ISpecialPrice) => {
          this.specialCitiesPrices.push(
            this.fb.group({
              government: [this.serializeState(price.government), Validators.required],
              city: [{ value: price.city, disabled: true }, Validators.required],
              price: [price.price, Validators.required]
            })
          );
        });
        },
        error: err => {
          console.log(err);
          Swal.fire('خطأ', 'حدث خطأ في تحميل بيانات التاجر', 'error');
        }
    });
  }

  loadGovernments(): void {
    this.apiService.get<any>('/Government').subscribe({
      next: (res) => {
        this.governments = res.$values as IGovernmentDTO[];
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onGovChange(): void {
    const gov = this.merchantForm.get('government')?.value;
    const state = JSON.parse(gov);
    if (state) {
      this.apiService.get<any>(`/City/government/${state.id}`).subscribe({
        next: (res) => {
          this.cities = res.$values as ICityDTO[];
          this.merchantForm.get('city')?.enable();
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.cities = [];
      this.merchantForm.get('city')?.setValue('');
      this.merchantForm.get('city')?.disable();
    }
  }

  onSpecialGovChange(index: number): void {
    const gov = this.specialCitiesPrices.at(index).get('government')?.value;
    const state = JSON.parse(gov);
    if (state) {
      this.apiService.get<any>(`/City/government/${state.id}`).subscribe({
        next: (res) => {
          this.specialCities[index] = res.$values as ICityDTO[];
          const cityControl = this.specialCitiesPrices.at(index).get('city');
          cityControl?.enable();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  get specialCitiesPrices(): FormArray {
    return this.merchantForm.get('specialCitiesPrices') as FormArray;
  }

  addspecialCitiesPrices(): void {
    const specialFormGroup = this.fb.group({
      government: ['', Validators.required],
      city: [{ value: '', disabled: true }, Validators.required],
      price: [0, Validators.required]
    });
    this.specialCitiesPrices.push(specialFormGroup);
  }

  removespecialCitiesPrices(index: number): void {
    this.specialCitiesPrices.removeAt(index);
  }

  onSubmit(): void {
    this.merchantForm.controls['specialCitiesPrices'].value.forEach((value: any) => {
      const government = JSON.parse(value.government);
      value.government = government.name;
    });
    const merchant = this.merchantForm.value;
    const serializedGovernment = this.merchantForm.controls['government'].value;
    const government = JSON.parse(serializedGovernment);
    merchant.government = government.name;
    console.log(merchant);
    if (this.merchantForm.valid) {
      if (this.id && this.id == '0') {
        this.apiService.post<any, IMerchantDTO>('/Merchant/AddMerchant', merchant).subscribe({
          next: (res) => {
            this.router.navigateByUrl('/employee/merchant');
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
      else {}
    } else {
      this.merchantForm.markAllAsTouched();
    }
  }

  serializeState(state: any): string {
    return JSON.stringify(state);
  }
  
  trackByGov(index: number, gov: IGovernmentDTO): number|undefined {
    return gov.id; // or unique identifier for government
  }

  trackByCity(index: number, city: ICityDTO): number|undefined  {
    return city.id; // or unique identifier for city
  }
}
