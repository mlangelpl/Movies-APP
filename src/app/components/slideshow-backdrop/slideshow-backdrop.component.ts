import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import SwiperCore, {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
} from 'swiper';
import { IonicSlides, ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];
  slideOpt = {
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 10,
    initialSlide: 0,
    autoplay:{delay: 5000},
    speed: 800,
  };
  constructor(
    private modalCtrl: ModalController,
  ) {}

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
