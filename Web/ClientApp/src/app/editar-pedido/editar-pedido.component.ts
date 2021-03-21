import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.css']
})
export class EditarPedidoComponent implements OnInit {

  pedidosForm: FormGroup;
  constructor(
    private builder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject('BASE_URL') private  baseUrl: string
  ) { }

  ngOnInit(): void {

    const pedidoId = this.activatedRoute.snapshot.paramMap.get('id');

    this.http.get<any>(this.baseUrl + `api/pedidos/${pedidoId}`).subscribe(
      data => {
        const dataPedido = formatDate(data.dataPedido, "yyyy-MM-dd", "en-US");
        const dataEntrega = formatDate(data.dataEntrega, "yyyy-MM-dd", "en-US");
        this.pedidosForm = this.builder.group({
          id: data.id,
          cliente: this.builder.control(data.cliente,[ Validators.required]),
          dataPedido: this.builder.control(dataPedido, [Validators.required]),
          dataEntrega: this.builder.control(dataEntrega, [Validators.required]),
          entregaRetirada: this.builder.control(data.entregaRetirada,[Validators.required]),
          enderecoEntrega: this.builder.control(data.enderecoEntrega),
          pedido: this.builder.control(data.pedido,[Validators.required]),
          obs: this.builder.control(data.obs),
          recheio: this.builder.control(data.recheio, [Validators.required]),
          total: this.builder.control(data.total, [Validators.required]),
          metodoPagamento: this.builder.control(data.metodoPagamento, [Validators.required]),
          statusPagamento: this.builder.control(data.statusPagamento, [Validators.required])
        });
      }
    );
  }

  onSubmit(event): void {
     if (this.pedidosForm.valid) {

       this.http.put(this.baseUrl + `api/pedidos/${this.pedidosForm.value.id}`, this.pedidosForm.value).subscribe(
         data => {
           this.router.navigate(['pedidos']);
         }
       );
     }
  }

}
