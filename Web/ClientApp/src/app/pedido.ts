export interface Pedido {
  id: string,
  cliente: string,
  dataPedido: string,
  dataEntrega: string,
  entregaRetirada: string,
  enderecoEntrega: string,
  pedido: item[],
  obs: string,
  recheio: string,
  total: number,
  metodoPagamento: string,
  statusPagamento: string,
  pendencias: string[]
}

export interface item {
  nome: string,
  quantidade: number,
  valor: number
  obs: string
}
