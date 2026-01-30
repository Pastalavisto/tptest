import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokeApiService } from '../../services/poke-api-service';
import { SelectedPokemonService } from '../../services/selected-pokemon-service';

@Component({
  selector: 'app-poke-search',
  standalone: false,
  templateUrl: './poke-search.html',
  styleUrl: './poke-search.css',
})
export class PokeSearch implements OnInit {  
  selectedId!: WritableSignal<number>; 
  nameFilter = signal<string>('');

  constructor(
    public pokeApiService: PokeApiService, 
    private selectedPokemonService: SelectedPokemonService
  ) {
    this.selectedId = this.selectedPokemonService.selectedPokemonId;
  }

  ngOnInit(): void {
    this.pokeApiService.loadPokemons();
  }

  onPokemonSelected(id: number | null) {
    if (!id) return;
    this.selectedPokemonService.setId(id);
  }

  onNameFilterChange(name: string) {
    this.nameFilter.set(name);
  }
}