import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { PokeDisplayer } from './components/poke-displayer/poke-displayer';
import { PokeSearch } from './components/poke-search/poke-search';
import { FilterPokemonPipe } from './pipes/filter-pokemon-pipe';
import { PokeApiService } from './services/poke-api-service';
import { SelectedPokemonService } from './services/selected-pokemon-service';

@NgModule({
  declarations: [App, PokeSearch, FilterPokemonPipe, PokeDisplayer],
  imports: [BrowserModule, AppRoutingModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatButton],
  providers: [provideBrowserGlobalErrorListeners(), provideZonelessChangeDetection(), provideHttpClient(withInterceptorsFromDi()), PokeApiService, SelectedPokemonService],
  bootstrap: [App],
})
export class AppModule { }
