import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

export interface PokedexResponse {
  pokemon_entries: PokemonEntry[];
}

export interface PokemonEntry {
  entry_number: number;
  pokemon_species: {
    name: string;
    url: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private apiUrl = 'https://pokeapi.co/api/v2';

  pokemons = signal<Pokemon[]>([]);
  selectedPokemon = signal<Pokemon | null>(null);

  constructor(private http: HttpClient) {}

  loadPokemons() {
    this.http.get<PokedexResponse>(`${this.apiUrl}/pokedex/1`).pipe(
      map(response =>
        response.pokemon_entries.map(entry => ({
          id: entry.entry_number,
          name: entry.pokemon_species.name,
          url: entry.pokemon_species.url,
        }))
      )
    ).subscribe({
      next: pokemons => this.pokemons.set(pokemons),
      error: err => console.error('Erreur de chargement des pokémons', err)
    });
  }

  loadPokemonByName(name: string) {
    this.http.get<any>(`${this.apiUrl}/pokemon/${name}`)
      .subscribe({
        next: pokemon => this.selectedPokemon.set(pokemon),
        error: err => console.error('Erreur getPokemonByName', err)
      });
  }

  loadPokemonById(id: number) {
    this.http.get<any>(`${this.apiUrl}/pokemon/${id}`)
      .subscribe({
        next: pokemon => this.selectedPokemon.set(pokemon),
        error: err => console.error('Erreur getPokemonById', err)
      });
  }
}
