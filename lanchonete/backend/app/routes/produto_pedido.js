module.exports = app => {
    const produtoPedidoController = require("../controllers/produto_pedido.controller.js");

    app.post("/produtos_pedidos", produtoPedidoController.create);
    app.get("/produtos_pedidos", produtoPedidoController.findAll);

    app.get("/produtos_pedidos/:produtoPedidoId", produtoPedidoController.findOne);

    //seleciona os produtos de um pedido especifico
    app.get("/produtos_pedidos/pedido/:pedidoId", produtoPedidoController.findByPedido);
    //todos os pedidos que tem o produto especifico
    app.get("/produtos_pedidos/produto/:produtoId", produtoPedidoController.findByProduto);

    app.put("/produtos_pedidos/:produtoPedidoId", produtoPedidoController.update)
}