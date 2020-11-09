const pedidoModel = require("../models/pedido.model.js");

exports.create = (req, res) => {
    if (!req.body.nome && !req.body.valor) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição está vazio."
        });
    } else {
        const pedido = new pedidoModel({
            nome: req.body.nome,
            valor: req.body.valor
        });

        pedidoModel.create(pedido, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                });
            } else {
                res.send(data);
            }
        })
    }

}

exports.findAll = (req, res) => {
    pedidoModel.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro"
            })
        } else
            res.send(data);
    });
}

exports.findOne = (req, res) => {
    pedidoModel.findById(req.params.pedidoId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: "Pedido não encontrado. ID:" + req.params.pedidoId
                });
            } else {
                res.status(500).send({
                    message: "Erro ao retornar o pedido com ID:" + req.params.pedidoId
                });
            }
        } else
            res.send(data);
    })

}

exports.update = (req, res) => {
    if (!req.body.nome && !req.body.valor) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição está vazio."
        });
    } else {
        const pedido = new pedidoModel({
            nome: req.body.nome,
            valor: req.body.valor
        });

        pedidoModel.updateById(req.params.pedidoId, pedido, (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message: "Pedido não encontrado."
                    });
                } else {
                    res.status(500).send({
                        message: "Erro ao atualizar pedido."
                    })
                }
            } else {
                res.send(data);
            }
        })
    }
}

exports.delete = (req, res) => {
    pedidoModel.remove(req.params.pedidoId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ message: "Pedido não encontrado." })
            } else {
                res.status(500).send({ message: "Erro ao deletar pedido." })
            }
        } else {
            res.send({ messsage: "Pedido deletado com sucesso" });
        }
    })

}

exports.deleteAll = (req, res) => {
    pedidoModel.remove((err) => {
        if (err) {
            res.status(500).send({ message: "Erro ao deletar todos os pedidos." })
        } else {
            res.send({ messsage: "Todos os pedidos deletados com sucesso" });
        }
    })
}