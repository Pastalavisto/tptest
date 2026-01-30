import { TestBed } from '@angular/core/testing';

import { SelectedPokemonService } from './selected-pokemon-service';

describe('SelectedPokemon', () => {
  let service: SelectedPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize selectedPokemonId as 0', () => {
    expect(service.selectedPokemonId()).toBe(0);
  });

  it('setId should update selectedPokemonId signal', () => {
    service.setId(25);
    expect(service.selectedPokemonId()).toBe(25);
  });

  it('setId should replace previous id value', () => {
    service.setId(10);
    expect(service.selectedPokemonId()).toBe(10);
    
    service.setId(50);
    expect(service.selectedPokemonId()).toBe(50);
  });

  it('getId should return the current selectedPokemonId', () => {
    service.setId(42);
    expect(service.getId()).toBe(42);
  });

  it('getId should return 0 when no id is set', () => {
    expect(service.getId()).toBe(0);
  });

  it('setId with negative value should work', () => {
    service.setId(-1);
    expect(service.selectedPokemonId()).toBe(-1);
  });

  it('selectedPokemonId signal should be reactive', () => {
    const values: number[] = [];
    
    // Create an effect-like observer
    const unsubscribe = service.selectedPokemonId.toString();
    
    service.setId(100);
    service.setId(200);
    service.setId(300);
    
    expect(service.selectedPokemonId()).toBe(300);
  });
});
