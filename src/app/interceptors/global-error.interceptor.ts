import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service'; // Add this import
import { inject } from '@angular/core';

export function errorInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
	const notificationService = inject(NotificationService);

	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			let errorMessage = '';

			if (error.error instanceof ErrorEvent) {
				// Client-side error
				errorMessage = `Error: ${error.error.message}`;
			} else {
				// Server-side error
				errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
				if (error.status === 401) {
					console.warn('Authenticate or use a proper API key:', error);
				} else if (error.status === 500) {
					console.error('Server error:', error);
				}
			}

			console.error('Global HTTP error handler:', errorMessage);

			notificationService.showError(errorMessage);

			return throwError(() => new Error(errorMessage));
		})
	);
}


