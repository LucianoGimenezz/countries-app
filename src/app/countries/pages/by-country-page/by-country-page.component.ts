import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit{

  private _countries: Country[] = []
  public isLoading = false

  constructor(
    private readonly _countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this._countries = this._countriesService.cacheCountries.byCountry.countries
  }

  get countries() {
    return this._countries
  }
  public searchCountry(term: string) {

    this.isLoading = true

    this._countriesService.searchByName(term)
      .subscribe(response => {
        this._countries = response
        this.isLoading = false
      })
  }
}
