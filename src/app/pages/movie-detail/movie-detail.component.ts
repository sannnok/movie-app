import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieService } from '../../services/movie.service';
import { MovieDetails } from '../../interfaces';
import { SafeLinkPipe } from '../../pipes/safe-link.pipe';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SafeLinkPipe, MatProgressSpinnerModule],
})
export class MovieDetailComponent {
  protected isLoading = inject(LoaderService).loading;
  protected movieDetails = inject(MovieService).movieDetail;
  protected id = inject(ActivatedRoute).snapshot.paramMap.get('id');
  protected movieService = inject(MovieService);
  protected router = inject(Router);

  ngOnInit(): void {
    if (this.id) {
      this.movieService.fetchMovieDetail(+this.id);
    } else {
      console.error('Movie ID is missing in the route');
      this.router.navigate(['/']);
    }
  }

  protected getGenreNames(movie: MovieDetails): string {
    return movie.genres.map(genre => genre.name).join(', ');
  }
}
