import { Component } from '@angular/core';
import { CityService } from '../../../shared/Services/city.service';
import { city } from '../../../shared/models/city';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css'
})
export class CityListComponent {
  cityData: city[] = [];
  searchterm = "";
  recordLimit: number = 5;

  constructor(private _CityService: CityService) {}

  ngOnInit(): void {
    this._CityService.getAllcities(1).subscribe({
      next: (response) => {
        this.cityData = response;
        console.log(this.cityData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteCity(id: number) {
    this._CityService.deleteCity(id).subscribe({
      next: () => {
        console.log(`City with id ${id} deleted successfully`);
        this.cityData = this.cityData.filter(City => City.id !== id);
      },
      error: (err) => {
        console.error(`Error deleting City with id ${id}`, err);
      }
    });
  }
  changeStatus(city: city) {
    const newStatus = !city.status;
    this._CityService.changeCityStatus(city.id, newStatus).subscribe({
      next: (response) => {
        city.status = newStatus;
        console.log('City status changed successfully', response);
      },
      error: (err) => {
        console.error('Error changing city status', err);
      }
    });
  }
}
