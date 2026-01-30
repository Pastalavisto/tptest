import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeSearch } from './poke-search';

describe('PokeSearch', () => {
  let component: PokeSearch;
  let fixture: ComponentFixture<PokeSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokeSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
