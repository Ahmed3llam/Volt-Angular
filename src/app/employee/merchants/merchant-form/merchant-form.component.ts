import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../shared/Services/api.service';
import { IGovernmentDTO } from '../../../shared/Models/IGovernmentDTO';
import { IMerchantDTO } from '../../../shared/Models/IMerchant';
import { ICityDTO } from '../../../shared/Models/ICityDTO';

@Component({
  selector: 'app-merchant-form',
  templateUrl: './merchant-form.component.html',
  styleUrls: ['./merchant-form.component.css'] // Corrected styleUrl to styleUrls
})
export class MerchantFormComponent implements OnInit {

  merchant: IMerchantDTO = {} as IMerchantDTO;
  merchantID: string = '';
  governments: IGovernmentDTO[] = [];
  cities: ICityDTO[] = [];
  govID: number = 0;

  merchantForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^01[0125][0-9]{8}$')
    ]),
    status: new FormControl(true),
    branchName: new FormControl(null),
    branchId: new FormControl(null),
    role: new FormControl(null),
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.maxLength(255)
    ]),
    address: new FormControl('', [Validators.required]),
    government: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pickUpSpecialCost: new FormControl(0),
    refusedOrderPercent: new FormControl(0)
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadGovernments();

    this.activatedRoute.params.subscribe(paramsObject => {
      this.merchantID = paramsObject['id'];
      if (this.merchantID) {
        this.loadMerchant(this.merchantID);
      }
    });
  }

  loadGovernments(): void {
    this.apiService.get<any>('/Government').subscribe({
      next: (res) => {
        this.governments = res.$values as IGovernmentDTO[];
        console.log(this.governments);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadMerchant(id: string): void {
    this.apiService.get<any>(`/Merchant/${id}`).subscribe({
      next: (res) => {
        this.merchant = res as IMerchantDTO;
        this.merchantForm.patchValue(this.merchant);
        console.log(this.merchant);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onGovChange(govid: number): void {
    console.log(govid);
    if (govid !== 0) {
      this.govID = govid;
      this.apiService.get<any>(`/City/government/${this.govID}`).subscribe({
        next: (res) => {
          this.cities = res.$values as ICityDTO[];
          console.log(this.cities);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.merchantForm.valid) {
      this.merchant = this.merchantForm.value;
      this.apiService.post<any, IMerchantDTO>('/Merchant', this.merchant).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/employee/merchant');
        },
        error: (err) => {
          console.log(err);
        }
      });
      console.log(this.merchantForm.value);
    } else {
      // Handle form errors
      console.log('Form is invalid');
    }
  }

}
