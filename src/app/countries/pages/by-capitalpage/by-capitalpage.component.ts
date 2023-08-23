import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capitalpage',
  templateUrl: './by-capitalpage.component.html',
  styleUrls: ['./by-capitalpage.component.css']
})
export class ByCapitalpageComponent implements OnInit{

  private _countries: Country[] = []
  public initialValue?: string = ''
  public isLoading: boolean = false

  constructor(
    private readonly _countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this._countries = this._countriesService.cacheCountries.byCapital.countries
    this.initialValue = this._countriesService.cacheCountries.byCapital.term
  }

  public get countries() {
    return this._countries
  }

  public searchCapital(term: string) {
   this.isLoading = true

    this._countriesService.searchByCapital(term)
      .subscribe(conuntries => {
        this._countries = conuntries
        this.isLoading = false
      })
  }
}
