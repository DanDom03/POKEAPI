import { Component, Input } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss'
})
export class PhotoComponent {

  @Input() pokemon?:Pokemon;
  
}
