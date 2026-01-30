import { Component, signal } from '@angular/core';
import { SelectedPokemonService } from './services/selected-pokemon-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pokedemo');
  constructor(public selectedPokemonService: SelectedPokemonService) { }

}
