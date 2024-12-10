import { Component, Input, OnChanges, Output, output, SimpleChanges } from '@angular/core';
import { Resultado } from '../../interfaces/pokeapi';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { EventEmitter } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnChanges {

  constructor(private pokemonService: PokemonService){

  }

  ngOnChanges( ): void {
    this.extraerInfo()
  }
  
  
  @Input() data?:Resultado;
  @Input() select:boolean =false;
  @Input() fulldata?: Pokemon;
  @Output() clicked = new EventEmitter<string>();
  id:string = "0";

  extraerInfo(){
    if (this.data && this.data.url!==""){
      this.id = this.data.url.substring(34,this.data.url.length-1);
      return
    }if(this.fulldata){
      this.id = this.fulldata.species.url.substring(42,this.fulldata.species.url.length-1);
      this.data = {
        name: this.fulldata.species.name,
        url:""
      }

    }
  }

}
