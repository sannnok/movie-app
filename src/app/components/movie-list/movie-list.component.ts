import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  template: `
    <div class="container mx-auto p-6 space-y-6">
    <div class="flex items-center space-x-4">
      <input
        [(ngModel)]="searchQuery"
        (input)="onSearch()"
        placeholder="Search movies"
        class="w-full px-4 py-2 rounded-lg shadow-sm text-gray-700 bg-white focus:ring focus:ring-indigo-300 border border-gray-300"
      />
        <button (click)="onSearch()" class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
          Search
        </button> 
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          *ngFor="let movie of movieService.popularMovies()"
          (click)="selectMovie(movie.id)"
          class="cursor-pointer transition-transform transform hover:scale-105"
        >
          <app-movie [movie]="movie"></app-movie>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class MovieListComponent {
  searchQuery: string = '';

  constructor(public movieService: MovieService, private router: Router) {
    this.movieService.fetchPopularMovies();
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.movieService.searchMovies(this.searchQuery);
    } else {
      this.movieService.fetchPopularMovies();
    }
  }

  selectMovie(id: number) {
    this.movieService.fetchMovieDetail(id);
    this.router.navigate(['/movie', id]);
  }
}
