import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PhotoComponent } from "../../components/photo/photo.component";
import { CardComponent } from "../../components/card/card.component";
import { PokemonService } from '../../services/pokemon.service';
import { Resultado } from '../../interfaces/pokeapi';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../interfaces/pokemon';
import { DetailsComponent } from "../../components/details/details.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PhotoComponent, CardComponent, CommonModule, DetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private pokemonService:PokemonService){}
  @ViewChild ('tarjetas') tarjetasElement!:ElementRef;

  listaPokemon:Resultado[] = []

  pagina: number=1;
  cargando: boolean = false;
  selectPokemon?:Pokemon;
  detail:boolean= false;

  ngOnInit(): void {
    this.cargarLista();
    this.pokemonService.getById("1");
  }

  async cargarLista(){
    this.cargando=true;
    this.listaPokemon = [...this.listaPokemon,... await this.pokemonService.getByPage(this.pagina)];
    console.log(this.listaPokemon)
    this.cargando=false;
    this.pagina++;
    
  }

  onScroll(e:any){
    if(this.cargando)return;
    if(
      Math.round(
        this.tarjetasElement.nativeElement.clientHeight + this.tarjetasElement.nativeElement.scrollTop
      )
      ===e.srcElement.scrollHeight){
        this.cargarLista()
      }


  }

  async cardClicked(id:string){
    console.log(id);
    this.selectPokemon = await this.pokemonService.getById(id);
  }

  detailsClicked(){
    if (this.selectPokemon)
    this.detail = !this.detail;
  }





}
