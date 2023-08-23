import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  private debouncer = new Subject<string>()
  private debounceSuscription?: Subscription;

  @Input()
  public placeholder!: string

  @Input()
  public initialValue?: string = ''

  @Output()
  private onValue: EventEmitter<string> = new EventEmitter()

  @ViewChild('inputSearch')
  public searchInput!: ElementRef<HTMLInputElement>

  public ngOnInit(): void {
    this.debounceSuscription = this.debouncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe( value => {
        this.onValue.emit(value)
    } )
  }


  public ngOnDestroy(): void {
    this.debounceSuscription?.unsubscribe()
  }

  public emittValue() {
    const value = this.searchInput.nativeElement.value

    if (!value) return

    this.onValue.emit(value)
    this.searchInput.nativeElement.value = ''
  }

  onKeyPress(value: string) {
    this.debouncer.next( value )
  }
}
