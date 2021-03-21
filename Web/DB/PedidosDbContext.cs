using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        public string pedido { get; set; }
        public string obs { get; set; }
        public string recheio { get; set; }
        public double total { get; set; }
        public string metodoPagamento { get; set; }
        public string statusPagamento { get; set; }
    }
}

