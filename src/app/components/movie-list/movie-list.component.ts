import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  template: `
    <div class="container mx-auto p-4">
      <input [(ngModel)]="searchQuery" (input)="onSearch()" placeholder="Search movies" class="input"/>
      <div *ngFor="let movie of movieService.popularMovies()" (click)="selectMovie(movie.id)" class="movie-item">
        <app-movie [movie]="movie"></app-movie>
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
