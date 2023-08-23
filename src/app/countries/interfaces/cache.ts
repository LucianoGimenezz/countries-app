import { Country } from "./country"
import { Region } from "./region.type"

export interface CacheCountries {
  byCapital: TermCountries,
  byCountry: TermCountries,
  byRegion: RegionCountries
}

interface TermCountries {
  term: string
  countries: Country[]
}

interface RegionCountries {
  region?: Region
  countries: Country[]
}