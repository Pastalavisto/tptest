import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PokeApiService } from './poke-api-service';

describe('PokemonService', () => {
  let service: PokeApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokeApiService]
    });
    service = TestBed.inject(PokeApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize pokemons signal as empty array', () => {
    expect(service.pokemons()).toEqual([]);
  });

  it('should initialize selectedPokemon signal as null', () => {
    expect(service.selectedPokemon()).toBeNull();
  });

  it('loadPokemons should fetch and set pokemons list', () => {
    const mockResponse = {
      pokemon_entries: [
        { entry_number: 1, pokemon_species: { name: 'bulbasaur', url: 'url' } },
        { entry_number: 2, pokemon_species: { name: 'ivysaur', url: 'url' } }
      ]
    };

    service.loadPokemons();

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokedex/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    const expectedPokemons = [
      { id: 1, name: 'bulbasaur', url: 'url' },
      { id: 2, name: 'ivysaur', url: 'url' }
    ];
    expect(service.pokemons()).toEqual(expectedPokemons);
  });

  it('loadPokemonById should fetch and set selectedPokemon', () => {
    const mockPokemon = { id: 25, name: 'pikachu', sprites: { front_default: 'url' } };

    service.loadPokemonById(25);

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/25');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);

    expect(service.selectedPokemon()).toEqual(mockPokemon);
  });

  it('loadPokemonByName should fetch and set selectedPokemon by name', () => {
    const mockPokemon = { id: 25, name: 'pikachu', sprites: { front_default: 'url' } };

    service.loadPokemonByName('pikachu');

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);

    expect(service.selectedPokemon()).toEqual(mockPokemon);
  });

  it('loadPokemonById should handle error gracefully', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    service.loadPokemonById(999);

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/999');
    req.error(new ErrorEvent('Network error'));

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erreur getPokemonById', expect.objectContaining({
      name: expect.stringContaining('HttpErrorResponse')
    }));
    consoleErrorSpy.mockRestore();
  });
});
