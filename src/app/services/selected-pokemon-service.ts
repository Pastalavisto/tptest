import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedPokemonService {
  selectedPokemonId = signal<number>(0);
  
  setId(id: number) {
    this.selectedPokemonId.set(id);

  }
  getId(): number {
    return this.selectedPokemonId();
  }
}
