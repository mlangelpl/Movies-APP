/* eslint-disable max-len */
/* eslint-disable no-var */
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];
  token = 'token';
  constructor(
    private moviesService: MoviesService,
    private afMessaging: AngularFireMessaging
  ) {
    this.getToken();
  }

  ngOnInit() {
    this.moviesService.getFeature().subscribe((data) => {
      this.peliculasRecientes = data.results;
    });
    this.getPopulares();
  }
  cargarMas() {
    this.getPopulares();
  }
  getPopulares() {
    this.moviesService.getPopulares().subscribe((data) => {
      const arrTemp = [...this.populares, ...data.results];
      this.populares = arrTemp;
    });
  }
  requestPermission() {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => {
          console.log('Permission granted! Save to the server!', token);
        },
        (error) => {
          console.error(error);
        }
      );
  }
  getToken() {
    this.afMessaging.getToken
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => {
          this.token = token;
        },
        (error) => {
          console.error(error);
        }
      );
  }
  enviarNotificacion() {
    this.share();
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'key=AAAAm33jkEU:APA91bGn6G-wQalI6iY1iKmnewCZ7Mt22ks0kR56n2aYvV799k6ML6WGKKGkSUyvqbnEgJq4bHa_xHA3AUXW9nnknK9I3gLtj_Uj-lyi3NAv9np_VTVOX4xR1St1C4BK0SZAFNGfGw6w'
    );

    var raw = JSON.stringify({
      notification: {
        title: 'Una notificacion',
        body: 'Esto es una prueba',
        image:
          'https://img.freepik.com/vector-premium/linda-pequena-abeja-dibujos-animados-volando_188253-3805.jpg',
      },
      to: this.token,
    });

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }
  share() {
    Share.share({
      title: 'token',
      text: this.token,
    });
  }
}
