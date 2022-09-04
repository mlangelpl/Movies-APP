import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroImagen'
})
export class FiltroImagenPipe implements PipeTransform {

  transform( peliculas: any[] ): any[] {
    // eslint-disable-next-line arrow-body-style
    return peliculas.filter( peli => {
      return peli.backdrop_path;
    });
  }
}
