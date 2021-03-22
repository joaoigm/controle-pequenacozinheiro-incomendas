using System.Collections.Generic;
using Web.DB;

namespace Web.Models
{
    public class PedidoViewModel
    {
        public string id { get; set; }
        public string cliente { get; set; }
        public string dataPedido { get; set; }
        public string dataEntrega { get; set; }
        public string entregaRetirada { get; set; }
        public string enderecoEntrega { get; set; }
        public IEnumerable<ItemPedido> pedido { get; set; }
        public string obs { get; set; }
        public string recheio { get; set; }
        public double total { get; set; }
        public string metodoPagamento { get; set; }
        public string statusPagamento { get; set; }
        public string pendencias { get; set; }

        public PedidoViewModel(Pedido pedido)
        {
            this.id = pedido.Id;
            this.cliente = pedido.cliente;
            this.dataEntrega = pedido.dataEntrega.ToShortDateString().Substring(0,5);
            this.dataPedido = pedido.dataPedido.ToShortDateString().Substring(0, 5);
            this.enderecoEntrega = pedido.enderecoEntrega;
            this.metodoPagamento = pedido.metodoPagamento;
            this.statusPagamento = pedido.statusPagamento;
            this.obs = pedido.obs;
            this.total = pedido.total;
            this.entregaRetirada = pedido.entregaRetirada;
            this.pedido = pedido.pedido;
            this.recheio = pedido.recheio;
            this.pendencias = pedido.pendencias;
        }

        public PedidoViewModel() { }
    }
}
