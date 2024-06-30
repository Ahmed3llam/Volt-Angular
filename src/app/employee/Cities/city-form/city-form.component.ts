import { Component } from '@angular/core';
import { city } from '../../../shared/models/city';
import { Government } from '../../../shared/models/government';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '../../../shared/Services/city.service';
import { GovernmentService } from '../../../shared/Services/government.service';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrl: './city-form.component.css'
})
export class CityFormComponent {
  cityId: number | null = 0;
  city: city | null = null;
  GovernmentData: Government[] = [];

  cityData = new FormGroup({
    roleName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    governmentId: new FormControl(0, Validators.required), // Add this line
    shippingPrice:new FormControl(0,Validators.required),
    pickUpPrice:new FormControl(0,Validators.required)
    
  });
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _cityService: CityService,
    private _GovernmentService: GovernmentService
  ) {}
 

  ngOnInit(): void {
    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    this.cityId = id !== null ? +id : null;
    this._GovernmentService.getGovernments().subscribe({
      next: (response) => {
        this.GovernmentData = response;
        console.log(this.GovernmentData);
      },
      error: (err) => {
        console.log(err);
      },
    });
    if (this.cityId !== null && this.cityId != 0) {
      this._cityService.getCityById(this.cityId).subscribe({
        next: (response) => {
          this.city = response;
          this.cityData.patchValue({
            roleName: this.city.name,
            governmentId: this.city.governmentId, // Assuming stateId corresponds to governmentId
          });
          console.log(this.city);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  onSubmit() {
    if (this.cityData.valid) {
      const city: city = {
        id: this.cityId || 0,
        name: this.cityData.value.roleName!,
        status: true, // Assuming a default value
        governmentId: this.cityData.value.governmentId!,
        shippingPrice:this.cityData.value.shippingPrice!,
        pickUpPrice:this.cityData.value.pickUpPrice!

      };
  
      if (this.cityId && this.cityId !== 0) {
        this._cityService.updatecityById(this.cityId, city).subscribe({
          next: (response) => {
            console.log('city updated successfully', response);
            this._Router.navigate(['/employee/city']);
          },
          error: (err) => {
            console.log(city)
            console.error('Error updating city', err);
          },
        });
      } else {
        this._cityService.addCity(city).subscribe({
          next: (response) => {
            this._Router.navigate(['/employee/city']);
            console.log('city added successfully', response);
          },
          error: (err) => {
            console.error('Error adding city', err);
          },
        });
        console.log('Adding new city', city);
      }
    }
  }
  
  onCancel() {
    this._Router.navigate(['employee/city']);
  }
}
