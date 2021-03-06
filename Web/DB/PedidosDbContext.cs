using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using Web.Models;

namespace Web.DB
{
    public class Pedido
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string cliente { get; set; }
        public DateTime dataPedido { get; set; }
        public DateTime dataEntrega { get; set; }
        public string entregaRetirada { get; set; }
        public string enderecoEntrega { get; set; }
        public IEnumerable<ItemPedido> pedido { get; set; }
        public string obs { get; set; }
        public string recheio { get; set; }
        public double total { get; set; }
        public string metodoPagamento { get; set; }
        public string statusPagamento { get; set; }
        public string pendencias { get; set; }

        public Pedido() { }

        public Pedido(PedidoViewModel pedido)
        {
            this.Id = pedido.id;
            this.cliente = pedido.cliente;
            this.dataEntrega = DateTime.ParseExact($"{pedido.dataEntrega}/{DateTime.Now.Year}", "dd/MM/yyyy", null);
            this.dataPedido = DateTime.ParseExact($"{pedido.dataPedido}/{DateTime.Now.Year}", "dd/MM/yyyy", null);
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

    }

    public class ItemPedido 
    {
        public string nome { get; set; }
        public int quantidade { get; set; }
        public double valor { get; set; }
        public string obs { get; set; }
    }
}

