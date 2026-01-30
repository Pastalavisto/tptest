import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeDisplayer } from './poke-displayer';

describe('PokeDisplayer', () => {
  let component: PokeDisplayer;
  let fixture: ComponentFixture<PokeDisplayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokeDisplayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeDisplayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
