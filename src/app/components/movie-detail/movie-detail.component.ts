import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails } from '../../interfaces';
@Component({
  selector: 'app-movie-detail',
  template: `
    <div *ngIf="movieService.movieDetail() as movie" class="movie-detail max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <div class="relative">
        <img 
          [src]="'https://image.tmdb.org/t/p/w780' + movie.backdrop_path" 
          alt="{{ movie.title }} backdrop" 
          class="w-full h-64 object-cover rounded-lg"
        />
        <div class="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
        <h2 class="absolute bottom-4 left-4 text-3xl font-bold text-white">{{ movie.title }}</h2>
      </div>
      
      <div class="flex space-x-4 items-start">
        <img 
          [src]="'https://image.tmdb.org/t/p/w200' + movie.poster_path" 
          alt="{{ movie.title }} poster" 
          class="w-32 h-auto rounded-lg shadow-md"
        />
        <div>
          <p class="text-lg font-semibold text-gray-700">{{ movie.original_title }} ({{ movie.release_date | date: 'yyyy' }})</p>
          <p class="text-sm text-gray-500">{{ movie.tagline }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <h3 class="text-md font-bold text-gray-700">Overview</h3>
          <p class="text-gray-600">{{ movie.overview }}</p>
        </div>
        <div>
          <h3 class="text-md font-bold text-gray-700">Details</h3>
          <ul class="text-gray-600 space-y-2">
            <li><strong>Genres:</strong> {{ getGenreNames(movie) }}</li>
            <li><strong>Runtime:</strong> {{ movie.runtime }} minutes</li>
            <li><strong>Budget:</strong> {{ movie.budget | number }}</li>
            <li><strong>Revenue:</strong> {{ movie.revenue | number }}</li>
            <li><strong>Language:</strong> {{ movie.spoken_languages[0].english_name }}</li>
            <li><strong>Status:</strong> {{ movie.status }}</li>
            <li><strong>Rating:</strong> {{ movie.vote_average }} / 10 ({{ movie.vote_count }} votes)</li>
          </ul>
        </div>
      </div>

      <div>
        <h3 class="text-md font-bold text-gray-700">Production Companies</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          <div *ngFor="let company of movieService.movieDetail()?.production_companies" class="flex flex-col items-center">
            <img 
              *ngIf="company.logo_path" 
              [src]="'https://image.tmdb.org/t/p/w200' + company.logo_path" 
              [alt]="company.name" 
              class="h-12 w-32 object-contain mb-2 rounded-lg shadow-md"
            />
            <div *ngIf="!company.logo_path" class="h-12 w-32 object-contain mb-2 rounded-lg shadow-md"></div>
            <p class="text-xs text-gray-500 text-center">{{ company.name }}</p>
          </div>
        </div>
      </div>

      <div *ngIf="movie.belongs_to_collection" class="flex items-center space-x-4">
        <img 
          [src]="'https://image.tmdb.org/t/p/w200' + movie.belongs_to_collection.poster_path" 
          alt="{{ movie.belongs_to_collection.name }} poster" 
          class="w-16 h-auto rounded"
        />
        <div>
          <p class="text-sm font-bold text-gray-700">{{ movie.belongs_to_collection.name }}</p>
          <a 
            [href]="movie.homepage" 
            class="text-blue-500 hover:underline"
            target="_blank"
          >Visit Homepage</a>
        </div>
      </div>
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

  protected getGenreNames(movie: MovieDetails): string {
    return movie.genres.map(genre => genre.name).join(', ');
}
}
