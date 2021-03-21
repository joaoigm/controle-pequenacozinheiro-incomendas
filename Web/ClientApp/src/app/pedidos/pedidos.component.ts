import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {


  pedidosForm: FormGroup;
  constructor(
    private builder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    @Inject('BASE_URL') private  baseUrl: string
  ) { }

  ngOnInit() {
    this.pedidosForm = this.builder.group({
      cliente: this.builder.control('',[ Validators.required]),
      dataPedido: this.builder.control('', [Validators.required]),
      dataEntrega: this.builder.control('', [Validators.required]),
      entregaRetirada: this.builder.control('entrega',[Validators.required]),
      enderecoEntrega: this.builder.control(''),
      pedido: this.builder.control('',[Validators.required]),
      obs: this.builder.control(''),
      recheio: this.builder.control('simples', [Validators.required]),
      total: this.builder.control(0.0, [Validators.required]),
      metodoPagamento: this.builder.control('', [Validators.required]),
      statusPagamento: this.builder.control('pendente', [Validators.required])
    });
  }

  onSubmit(event): void {
    console.log(event.value);
    console.log(this.pedidosForm.value);
    // if (this.pedidosForm.valid) {

    //   this.http.post(this.baseUrl + "api/pedidos", this.pedidosForm.value).subscribe(
    //     data => {
    //       this.router.navigate(['pedidos']);
    //     }
    //   );
    // }
  }



}
