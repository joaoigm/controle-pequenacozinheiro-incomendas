using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.DB;
using Web.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidosController : ControllerBase
    {
        private readonly IMongoCollection<Pedido> _pedidos;

        public PedidosController(
            IPedidosDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _pedidos = database.GetCollection<Pedido>(settings.PedidosCollectionName);
        }
        // GET: api/<PedidosController>
        [HttpGet]
        public IEnumerable<Pedido> Get()
        {
            return _pedidos.Find(pedido => true).ToList();
        }

        // GET api/<PedidosController>/5
        [HttpGet("{id}")]
        public Pedido Get(string id)
        {
            return _pedidos.Find(p => p.Id == id).FirstOrDefault();
        }

        // POST api/<PedidosController>
        [HttpPost]
        public async Task<Pedido> Post([FromBody] Pedido value)
        {
            await _pedidos.InsertOneAsync(value);
            return value;
        }

        // PUT api/<PedidosController>/5
        [HttpPut("{id}")]
        public async Task<Pedido> Put(string id, [FromBody] Pedido value)
        {
            value.Id = id;
            await _pedidos.ReplaceOneAsync(p => p.Id == id, value);
            return value;
        }

        // DELETE api/<PedidosController>/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            await _pedidos.DeleteOneAsync(p => p.Id == id);
        }
    }
}
