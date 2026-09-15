import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Home } from './features/home/home';
import { Detail } from './features/detail/detail';
import { Player } from './pages/player/player';
import { Plans } from './features/plans/plans';
import { Checkout } from './features/checkout/checkout';
import { Help } from './features/help/help';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'home', component: Home },
    { path: 'peliculas', component: Home },
    { path: 'series', component: Home },
    { path: 'planes', component: Plans },
    { path: 'ayuda', component: Help },
    { path: 'detalle/:id', component: Detail },
    { path: 'ver/:id', component: Player },
    { path: 'checkout/:planId', component: Checkout },
];