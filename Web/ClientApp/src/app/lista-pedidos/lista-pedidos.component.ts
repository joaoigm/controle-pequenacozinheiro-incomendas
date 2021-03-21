import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {

  $pedidos: any
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private  baseUrl: string
  ) { }

  ngOnInit(): void {
    this.$pedidos = this.http.get(this.baseUrl + "api/pedidos");
  }

}
