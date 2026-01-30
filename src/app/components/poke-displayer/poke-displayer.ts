// Aucune modification nécessaire, ce composant est déjà bien configuré pour réagir aux changements
import { Component, effect } from '@angular/core';
import { PokeApiService } from '../../services/poke-api-service';
import { SelectedPokemonService } from '../../services/selected-pokemon-service';

@Component({
  selector: 'app-poke-displayer',
  standalone: false,
  templateUrl: './poke-displayer.html',
  styleUrl: './poke-displayer.css'
})
export class PokeDisplayer {
  constructor(
    public pokeApiService: PokeApiService,
    public selectedPokemonService: SelectedPokemonService
  ) {

    effect(() => {
      const id = this.selectedPokemonService.selectedPokemonId();
      if (id !== 0 && id !== null) {
        this.pokeApiService.loadPokemonById(id);
      } else {
        this.pokeApiService.selectedPokemon.set(null);
      }
    });
  }
}