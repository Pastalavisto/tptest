import { FilterPokemonPipe } from './filter-pokemon-pipe';

describe('FilterPokemonPipe', () => {
  let pipe: FilterPokemonPipe;

  beforeEach(() => {
    pipe = new FilterPokemonPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all pokemons when searchString is undefined', () => {
    const pokemons = [
      { name: 'bulbasaur', id: 1 },
      { name: 'ivysaur', id: 2 },
      { name: 'venusaur', id: 3 }
    ];
    const result = pipe.transform(pokemons, 'name', undefined);
    expect(result).toEqual(pokemons);
  });

  it('should filter pokemons by name property (case insensitive)', () => {
    const pokemons = [
      { name: 'bulbasaur', id: 1 },
      { name: 'ivysaur', id: 2 },
      { name: 'venusaur', id: 3 }
    ];
    const result = pipe.transform(pokemons, 'name', 'saur');
    expect(result).toEqual([
      { name: 'bulbasaur', id: 1 },
      { name: 'ivysaur', id: 2 },
      { name: 'venusaur', id: 3 }
    ]);
  });

  it('should filter pokemons and match uppercase searchString', () => {
    const pokemons = [
      { name: 'pikachu', id: 25 },
      { name: 'raichu', id: 26 },
      { name: 'ditto', id: 132 }
    ];
    const result = pipe.transform(pokemons, 'name', 'PIKACHU');
    expect(result).toEqual([{ name: 'pikachu', id: 25 }]);
  });

  it('should filter pokemons by different property (id as string)', () => {
    const pokemons = [
      { name: 'bulbasaur', id: '1' },
      { name: 'ivysaur', id: '2' },
      { name: 'venusaur', id: '25' }
    ];
    const result = pipe.transform(pokemons, 'id', '25');
    expect(result).toEqual([{ name: 'venusaur', id: '25' }]);
  });

  it('should return empty array when property is undefined', () => {
    const pokemons = [
      { name: 'pikachu', id: 25 },
      { name: 'raichu', id: 26 }
    ];
    const result = pipe.transform(pokemons, undefined, 'pikachu');
    expect(result).toEqual([]);
  });

  it('should return empty array when pokemons is undefined', () => {
    const result = pipe.transform(undefined, 'name', 'pikachu');
    expect(result).toEqual([]);
  });

  it('should return empty array when no pokemons match the search', () => {
    const pokemons = [
      { name: 'pikachu', id: 25 },
      { name: 'raichu', id: 26 }
    ];
    const result = pipe.transform(pokemons, 'name', 'bulbasaur');
    expect(result).toEqual([]);
  });

  it('should filter with partial match', () => {
    const pokemons = [
      { name: 'pikachu', id: 25 },
      { name: 'raichu', id: 26 },
      { name: 'pichu', id: 172 }
    ];
    const result = pipe.transform(pokemons, 'name', 'pik');
    expect(result).toEqual([{ name: 'pikachu', id: 25 }]);
  });

  it('should handle mixed case search string', () => {
    const pokemons = [
      { name: 'BULBASAUR', id: 1 },
      { name: 'Ivysaur', id: 2 },
      { name: 'venusaur', id: 3 }
    ];
    const result = pipe.transform(pokemons, 'name', 'VeNuS');
    expect(result).toEqual([{ name: 'venusaur', id: 3 }]);
  });

  it('should filter when array is empty', () => {
    const pokemons: any[] = [];
    const result = pipe.transform(pokemons, 'name', 'pikachu');
    expect(result).toEqual([]);
  });
});
