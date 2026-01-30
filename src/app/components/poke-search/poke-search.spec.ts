import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokeSearch } from './poke-search';
import { PokeApiService } from '../../services/poke-api-service';
import { SelectedPokemonService } from '../../services/selected-pokemon-service';
import { signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FilterPokemonPipe } from '../../pipes/filter-pokemon-pipe';

describe('PokeSearch', () => {
  let component: PokeSearch;
  let fixture: ComponentFixture<PokeSearch>;
  let mockPokeApiService: jest.Mocked<PokeApiService>;
  let mockSelectedPokemonService: jest.Mocked<SelectedPokemonService>;

  beforeEach(async () => {
    mockPokeApiService = {
      loadPokemons: jest.fn(),
    } as any;

    mockSelectedPokemonService = {
      selectedPokemonId: signal(0),
      setId: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [PokeSearch, FilterPokemonPipe],
      providers: [
        { provide: PokeApiService, useValue: mockPokeApiService },
        { provide: SelectedPokemonService, useValue: mockSelectedPokemonService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PokeSearch);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedId from SelectedPokemonService', () => {
    expect(component.selectedId).toBe(mockSelectedPokemonService.selectedPokemonId);
  });

  it('should call loadPokemons on ngOnInit', () => {
    component.ngOnInit();
    expect(mockPokeApiService.loadPokemons).toHaveBeenCalled();
  });

  it('should call setId when onPokemonSelected is called with valid id', () => {
    component.onPokemonSelected(25);
    expect(mockSelectedPokemonService.setId).toHaveBeenCalledWith(25);
  });

  it('should not call setId when onPokemonSelected is called with null', () => {
    component.onPokemonSelected(null);
    expect(mockSelectedPokemonService.setId).not.toHaveBeenCalled();
  });

  it('should update nameFilter signal when onNameFilterChange is called', () => {
    component.onNameFilterChange('pikachu');
    expect(component.nameFilter()).toBe('pikachu');
  });

  it('should initialize nameFilter with empty string', () => {
    expect(component.nameFilter()).toBe('');
  });
});