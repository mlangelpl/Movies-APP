import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];
  memoria: Storage | null = null;

  constructor( private storage: Storage,
               private toastCtrl: ToastController  ) {
    this.cargarFavoritos();
  }

  async presentToast( message: string ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  guardarPelicula( pelicula: PeliculaDetalle ) {
    let existe = false;
    let mensaje = '';

    for ( const peli of this.peliculas ) {
      if ( peli.id === pelicula.id ) {
        existe = true;
        break;
      }
    }

    if ( existe ) {
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id );
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push( pelicula );
      mensaje = 'Agregada a favoritos';
    }
    this.presentToast( mensaje );
    this.storage.set('peliculas', this.peliculas);
  }

  async cargarFavoritos() {
    const storage = await this.storage.create();
    this.memoria = storage;
    const favoritos = await this.memoria.get('peliculas');
    if(favoritos){
      this.peliculas = favoritos;
      return this.peliculas;
    }else{
      this.peliculas = [];
      return this.peliculas;
    }
  }

  async existePelicula( id ) {

    await this.cargarFavoritos();
    const existe = this.peliculas.find( peli => peli.id === id );

    return (existe) ? true : false;
  }

}
