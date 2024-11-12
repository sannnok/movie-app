import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export interface MovieDetails extends Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  popularity: number;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = environment.tmdbApiKey;

  popularMovies = signal<Movie[]>([]);
  searchResults = signal<Movie[]>([]);
  movieDetail = signal<MovieDetails | null>(null);

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
    this.http.get<MovieDetails>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`)
      .subscribe(response => this.movieDetail.set(response));
  }
}
