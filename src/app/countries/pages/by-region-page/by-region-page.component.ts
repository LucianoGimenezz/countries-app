import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})

export class ByRegionPageComponent implements OnInit{

  public regions: Region[] = ['Africa', 'America' , 'Asia' , 'Europe' , 'Oceania']
  private _countries: Country[] = []
  public isLoading = false;
  public selectedRegion?: Region

  constructor(
    private readonly _countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this._countries = this._countriesService.cacheCountries.byRegion.countries
    this.selectedRegion = this._countriesService.cacheCountries.byRegion.region
  }

  get countries() {
    return this._countries
  }

  public searchRegion(term: Region) {

    this.selectedRegion = term
    this.isLoading = true

    this._countriesService.searchByRegion(term)
      .subscribe(response => {
        this._countries = response
        this.isLoading = false
      })
  }
}
