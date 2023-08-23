import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {
 public country?: Country;
 public translations: string[] = []
 public languages: string [] = []

 constructor(
  private readonly _activatedRoute: ActivatedRoute,
  private readonly _countriesService: CountriesService,
  private readonly _router: Router
 ) {}

  public ngOnInit(): void {
    this._activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this._countriesService.searchByAlphaCode(id))
    )
    .subscribe(country => {

      if (!country) return this._router.navigateByUrl('')

      Object.values(country.translations).map(({ common }) => {
        this.translations.push(common)
      })

      this.languages = Object.values(country.languages)
      this.country = country
      return
    })
  }
}
