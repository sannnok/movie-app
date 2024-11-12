import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie',
  template: `
    <div class="movie-card">
      <img [src]="'https://image.tmdb.org/t/p/w200' + movie.poster_path" alt="{{ movie.title }} poster" class="poster"/>
      <h2>{{ movie.title }}</h2>
      <p>{{ movie.overview }}</p>
    </div>
  `,
  styles: [],
})
export class MovieComponent {
  @Input() movie!: { title: string; overview: string; poster_path: string; };
}
