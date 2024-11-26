import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { apiKeyInterceptor } from './app/interceptors/api-key.interceptor';
import { errorInterceptor } from './app/interceptors/global-error.interceptor';
import { loaderInterceptor } from './app/interceptors/loader.interceptor';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiKeyInterceptor, errorInterceptor, loaderInterceptor])),
  ]
})
  .catch(err => console.error('Application failed to bootstrap:', err));
