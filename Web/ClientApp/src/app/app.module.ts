import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidosModule } from './pedidos/pedidos.module';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { EditarPedidoComponent } from './editar-pedido/editar-pedido.component';

import ptLocale from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import * as moment from "moment-timezone";

moment.tz.setDefault('BRT');

registerLocaleData(ptLocale, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    PedidosModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'pedidos', component: ListaPedidosComponent },
      { path: 'pedidos/novo', component: PedidosComponent },
      { path: 'pedidos/:id', component: EditarPedidoComponent },
    ])
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR', },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
