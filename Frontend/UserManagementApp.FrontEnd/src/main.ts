import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';
import { Chart, registerables } from 'chart.js';

console.log('✅ Entorno:', environment.production ? 'producción' : 'desarrollo');
console.log('🌐 API URL actual:', environment.apiUrl);

Chart.register(...registerables); //Esta línea registra todos los tipos de gráficos y componentes necesarios

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
