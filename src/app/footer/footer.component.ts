import { Component, OnInit } from '@angular/core';
import { Car } from '../interfaces/ibuilder-creation';
import { BuildercreateServiceService } from '../services/buildercreate-service.service';
import { FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  cars: Car[];
  carslarge: Car[]
  cols: any[];

  multiAddValue=[];
  constructor(public carService: BuildercreateServiceService) { }

  ngOnInit() {
    this.carService.getCarsSmall().then(cars => this.cars = cars);
    
    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
    ];
  }
 
}
