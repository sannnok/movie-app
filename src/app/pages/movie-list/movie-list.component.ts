import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieComponent } from '../../components/movie/movie.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../../services/loader.service';

@UntilDestroy()
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MovieComponent,
    MatProgressSpinnerModule
  ],
})
export class MovieListComponent implements OnInit {
  protected searchQuery = signal<string>('');
  protected displayedMovies = computed(() => this.searchQuery()
    ? this.movieService.searchResults()
    : this.movieService.popularMovies()
  );
  protected isLoading = inject(LoaderService).loading;
  private searchQuerySubject = new Subject<string>();
  private movieService = inject(MovieService);
  private router = inject(Router);

  ngOnInit(): void {
    this.movieService.fetchPopularMovies();
    this.searchQuerySubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        untilDestroyed(this)
      )
      .subscribe((query) => {
        if (query) {
          this.movieService.searchMovies(query);
        }
      });
  }

  onSearch() {
    this.searchQuerySubject.next(this.searchQuery());
  }

  selectMovie(id: number) {
    this.router.navigate(['/movie', id]);
  }
}
