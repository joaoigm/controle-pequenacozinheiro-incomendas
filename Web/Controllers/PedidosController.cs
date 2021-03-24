using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Newtonsoft.Json;
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
            IPedidosDatabaseSettings settings,
            IConfiguration config)
        {
            var client = new MongoClient(config["MONGODB_CONNECTION_STRING"]);
            var database = client.GetDatabase(settings.DatabaseName);

            _pedidos = database.GetCollection<Pedido>(settings.PedidosCollectionName);
        }
        // GET: api/<PedidosController>
        [HttpGet]
        public IEnumerable<PedidoViewModel> Get()
        {
            return _pedidos.Find(pedido => true).ToList().OrderBy(p => p.dataEntrega).Select(p => new PedidoViewModel(p));
        }

        // GET api/<PedidosController>/5
        [HttpGet("{id}")]
        public async Task<PedidoViewModel> Get(string id)
        {
            return new PedidoViewModel(await _pedidos.Find(p => p.Id == id).FirstOrDefaultAsync());
        }

        // POST api/<PedidosController>
        [HttpPost]
        public async Task<PedidoViewModel> Post([FromBody] PedidoViewModel value)
        {

            var pedido = new Pedido(value);
            await _pedidos.InsertOneAsync(pedido);
            return new PedidoViewModel(pedido);
        }

        // PUT api/<PedidosController>/5
        [HttpPut("{id}")]
        public async Task<PedidoViewModel> Put(string id, [FromBody] PedidoViewModel value)
        {
            var pedido = new Pedido(value);

            await _pedidos.ReplaceOneAsync(p => p.Id == id, pedido);
            return new PedidoViewModel(pedido);
        }

        // DELETE api/<PedidosController>/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            await _pedidos.DeleteOneAsync(p => p.Id == id);
        }
    }
}
