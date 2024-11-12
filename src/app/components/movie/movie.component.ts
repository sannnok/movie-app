import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie',
  template: `
    <div class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img
        class="w-full h-64 object-cover"
        [src]="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
        [alt]="movie.title"
      />
      <div class="p-4 space-y-2">
        <h3 class="text-lg font-semibold text-gray-800">{{ movie.title }}</h3>
        <p class="text-sm text-gray-600 truncate">{{ movie.overview }}</p>
      </div>
    </div>
  `,
  styles: [],
})
export class MovieComponent {
  @Input() movie!: { title: string; overview: string; poster_path: string; };
}
