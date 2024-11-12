import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = environment.tmdbApiKey;

  popularMovies = signal<Movie[]>([]);
  searchResults = signal<Movie[]>([]);
  movieDetail = signal<Movie | null>(null);

  constructor(private http: HttpClient) {}

  fetchPopularMovies() {
    this.http.get<{ results: Movie[] }>(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`)
      .subscribe(response => this.popularMovies.set(response.results));
  }

  searchMovies(query: string) {
    this.http.get<{ results: Movie[] }>(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`)
      .subscribe(response => this.searchResults.set(response.results));
  }

  fetchMovieDetail(id: number) {
    this.http.get<Movie>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`)
      .subscribe(response => this.movieDetail.set(response));
  }
}
