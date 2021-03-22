import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { item, Pedido } from '../pedido';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {

  pedidos: Pedido[] = [];
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private  baseUrl: string
  ) { }

  ngOnInit(): void {
    this.listarPedidos();
  }

  openConfirmDelete(id: string) {
    if(confirm("Tem certeza que deseja deletar essa receita?")) {
      this.http.delete(this.baseUrl + `api/pedidos/${id}`).subscribe(
        _ => this.listarPedidos()
      );
    }
  }

  listarPedidos(): void {
    this.http.get<Pedido[]>(this.baseUrl + "api/pedidos").subscribe(
      data => this.pedidos = data
    );
  }

  getTotal(): number {
    return this.pedidos.map(p => p.total).reduce( (a, b) => a + b);
  }

  pedidosComPendencia(): Pedido[] {
    return this.pedidos.filter(p => p.pendencias);
  }

  joinPedidosNome(pedidoItems: item[]): string {
    return pedidoItems.map(p => p.nome).reduce((a, b) => `${a}, ${b}`);
  }
}
