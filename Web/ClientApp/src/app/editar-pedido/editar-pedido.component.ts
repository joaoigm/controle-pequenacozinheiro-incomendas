import { Observable } from 'rxjs';
import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../pedido';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.css']
})
export class EditarPedidoComponent implements OnInit {

  pedido: Pedido | undefined = undefined
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject('BASE_URL') private  baseUrl: string
  ) {

  }

  ngOnInit(): void {
    const pedidoId = this.activatedRoute.snapshot.paramMap.get('id');

    this.http.get<Pedido>(this.baseUrl + `api/pedidos/${pedidoId}`).subscribe(
      data => this.pedido = data
    );
  }

  onSubmit(event: FormGroup): void {
    //console.log(event)
     if (event.valid) {
       const formValue: Pedido = event.value;
       this.http.put(this.baseUrl + `api/pedidos/${event.value.id}`, {
         id: formValue.id,
         cliente: formValue.cliente.toUpperCase(),
         dataPedido: formValue.dataPedido,
         dataEntrega: formValue.dataEntrega,
         entregaRetirada: formValue.entregaRetirada.toUpperCase(),
         enderecoEntrega: formValue.enderecoEntrega.toUpperCase(),
         pedido: formValue.pedido,
         obs: formValue.obs.toUpperCase(),
         recheio: formValue.recheio.toUpperCase(),
         metodoPagamento: formValue.metodoPagamento.toUpperCase(),
         statusPagamento: formValue.statusPagamento.toUpperCase(),
         total: formValue.total,
         pendencias: formValue.pendencias
       }).subscribe(
         data => {
           this.router.navigate(['pedidos']);
         }
       );
     }
  }

}
