import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, tap } from 'rxjs';

import { Region, CacheCountries, Country  } from '../interfaces'

@Injectable({providedIn: 'root'})
export class CountriesService {

  private api_base = 'https://restcountries.com/v3.1/'
  public cacheCountries: CacheCountries = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion:  { countries: [] }
  }

  constructor(private httpClient: HttpClient) { }


  public searchByCapital(query: string) {
    return this.httpClient
      .get<Country[]>(`${this.api_base}/capital/${query}`)
      .pipe(
        tap(countries => this.cacheCountries.byCapital = { term: query, countries }),
        catchError(() => of([]))
      )
    }

  public searchByRegion(query: Region) {
    return this.httpClient
      .get<Country[]>(`${this.api_base}/region/${query}`)
      .pipe(
        tap(countries => this.cacheCountries.byRegion = { region: query, countries }),
        catchError(() => of([]))
      )
  }

  public searchByName(query: string) {
    return this.httpClient
      .get<Country[]>(`${this.api_base}/name/${query}`)
      .pipe(
        tap(countries => this.cacheCountries.byCountry = {term: query, countries }),
        catchError(() => of([]))
      )
  }

  public searchByAlphaCode(query: string): Observable<Country | null> {
    return this.httpClient
      .get<Country[]>(`${this.api_base}/alpha/${query}`)
      .pipe(
        map(countries => countries[0] ?? null),
        catchError(() => of(null))
      )
  }
}
