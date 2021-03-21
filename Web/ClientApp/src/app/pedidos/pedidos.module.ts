import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosComponent } from './pedidos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { ListaPedidosComponent } from '../lista-pedidos/lista-pedidos.component';
import { FormPedidoComponent } from '../form-pedido/form-pedido.component';
import { EditarPedidoComponent } from '../editar-pedido/editar-pedido.component';
import { RouterModule } from '@angular/router';

export const customCurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [
    PedidosComponent,
    ListaPedidosComponent,
    FormPedidoComponent,
    EditarPedidoComponent
  ],
  imports: [
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  providers: [
  ],
  exports: [],
  entryComponents: []
})
export class PedidosModule { }
