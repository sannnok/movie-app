import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, MovieDetails } from '../interfaces';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'https://api.themoviedb.org/3';

  popularMovies = signal<Movie[]>([]);
  searchResults = signal<Movie[]>([]);
  movieDetail = signal<MovieDetails | null>(null);

  constructor(private http: HttpClient) {}

  fetchPopularMovies() {
    this.http.get<{ results: Movie[] }>(`${this.baseUrl}/movie/popular`)
      .pipe(untilDestroyed(this))
      .subscribe(response => this.popularMovies.set(response.results));
  }

  searchMovies(query: string) {
    this.http.get<{ results: Movie[] }>(`${this.baseUrl}/search/movie`, {
      params: { query }
    })
      .pipe(untilDestroyed(this))
      .subscribe(response => this.searchResults.set(response.results));
  }

  fetchMovieDetail(id: number) {
    this.http.get<MovieDetails>(`${this.baseUrl}/movie/${id}`)
      .pipe(untilDestroyed(this))
      .subscribe(response => this.movieDetail.set(response));
  }
}
