import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { inject } from '@angular/core';

export function loaderInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const loaderService = inject(LoaderService);
  loaderService.showLoader();
  return next(req).pipe(
    finalize(() => loaderService.hideLoader())
  );
}
