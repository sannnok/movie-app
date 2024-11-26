import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', loadComponent: () => import('./pages/movie-list/movie-list.component').then(m => m.MovieListComponent) },
	{ path: 'movie/:id', loadComponent: () => import('./pages/movie-detail/movie-detail.component').then(m => m.MovieDetailComponent) },
];
