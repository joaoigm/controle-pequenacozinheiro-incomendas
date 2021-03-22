import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pedido } from '../pedido';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {


  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('BASE_URL') private  baseUrl: string
  ) { }

  ngOnInit() {

  }

  onSubmit(event: FormGroup): void {
     if (event.valid) {

       var formValue: Pedido = event.value;
       this.http.post(this.baseUrl + "api/pedidos", {
         cliente: formValue.cliente.toUpperCase(),
         dataPedido: formValue.dataPedido.toUpperCase(),
         dataEntrega: formValue.dataEntrega.toUpperCase(),
         entregaRetirada: formValue.entregaRetirada,
         enderecoEntrega: formValue.enderecoEntrega,
         pedido: formValue.pedido,
         obs: formValue.obs.toUpperCase(),
         recheio: formValue.recheio.toUpperCase(),
         metodoPagamento: formValue.metodoPagamento.toUpperCase(),
         statusPagamento: formValue.statusPagamento.toUpperCase(),
         total: formValue.total,
         pendencias: formValue.pendencias
       }).subscribe(
         _ => {
           this.router.navigate(['pedidos']);
         }
       );
     }
  }



}
