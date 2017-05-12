import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
//import globally used css files
require('./assets/css/app.css');
require('./assets/css/app.scss');

platformBrowserDynamic().bootstrapModule(AppModule);
