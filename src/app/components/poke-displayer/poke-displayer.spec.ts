import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';

import { PokeDisplayer } from './poke-displayer';
import { PokeApiService } from '../../services/poke-api-service';
import { SelectedPokemonService } from '../../services/selected-pokemon-service';

describe('PokeDisplayer', () => {
  let component: PokeDisplayer;
  let fixture: ComponentFixture<PokeDisplayer>;
  let mockPokeApiService: Partial<PokeApiService>;
  let selectedPokemonService: SelectedPokemonService;

  beforeEach(async () => {
    mockPokeApiService = {
      selectedPokemon: signal<any>(null),
      loadPokemonById: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PokeDisplayer],
      providers: [
        { provide: PokeApiService, useValue: mockPokeApiService },
        SelectedPokemonService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PokeDisplayer);
    component = fixture.componentInstance;
    selectedPokemonService = TestBed.inject(SelectedPokemonService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls loadPokemonById when selected id changes to non-zero', () => {
    expect((mockPokeApiService.loadPokemonById as jest.Mock)).not.toHaveBeenCalled();
    selectedPokemonService.setId(25);
    fixture.detectChanges();
    // effect in constructor should trigger immediately
    expect((mockPokeApiService.loadPokemonById as jest.Mock)).toHaveBeenCalledWith(25);
  });

  it('sets selectedPokemon to null when id is 0', () => {
    const spySet = jest.spyOn(mockPokeApiService.selectedPokemon as any, 'set');
    // ensure initial non-zero then back to zero
    selectedPokemonService.setId(12);
    fixture.detectChanges();
    expect((mockPokeApiService.loadPokemonById as jest.Mock)).toHaveBeenCalledWith(12);
    selectedPokemonService.setId(0);
    fixture.detectChanges();
    expect(spySet).toHaveBeenCalledWith(null);
  });

  it('renders selected pokemon name and id in the template when available', () => {
    const fake = { id: 7, name: 'squirtle', sprites: { front_default: 'url' }, stats: [] };
    // update the signal
    (mockPokeApiService.selectedPokemon as any).set(fake);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('#7');
    expect(el.textContent).toContain('squirtle');
  });
});
