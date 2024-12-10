import { Component, EventEmitter, Input, OnChanges, Output, output } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { Pokemon } from '../../interfaces/pokemon';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CardComponent,CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnChanges {
  @Input() pokemon?:Pokemon;
  @Input () open:boolean = false;
  @Output ()clicked = new EventEmitter ();
  description:string = "";

    constructor(private pokemonService:PokemonService){} 
    
    ngOnChanges(): void {
      if(this.pokemon){
      this.pokemonService.getDescripcion(this.pokemon?.id).then(res =>{
        this.description = res
      });
      }
    }
    

}
