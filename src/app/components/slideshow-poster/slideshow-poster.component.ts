import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];
  slideOpt = {
    slidesPerView: 2.5,
    centeredSlides: true,
    initialSlide: 0,
    autoplay:{delay: 5000},
    speed: 800,
  };
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
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
