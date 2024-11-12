import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  template: `
    <div *ngIf="movieService.movieDetail()" class="movie-detail">
      <img [src]="'https://image.tmdb.org/t/p/w300' + movieService.movieDetail()?.poster_path" alt="{{ movieService.movieDetail()?.title }} poster" />
      <h2>{{ movieService.movieDetail()?.title }}</h2>
      <p>{{ movieService.movieDetail()?.overview }}</p>
    </div>
  `,
  styles: [],
})
export class MovieDetailComponent {
  constructor(
    private route: ActivatedRoute,
    public movieService: MovieService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.movieService.fetchMovieDetail(id);
  }
}
