import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();
  slideOpts = {
    slidesPerView: 2.5,
    freeMode: true,
    centeredSlides: true,
    initialSlide: 0,
    autoplay:{delay: 5000},
    speed: 800,
  };
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  onClick(){
    this.cargarMas.emit();
  }
  async verDetalle(id: number){

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }
}
