const sql = require("./db.js");

//construtor
const ProdutoModel = function(produto) {
    this.nome = produto.nome;
    this.valor = produto.valor;
}


//Cria um novo produto no banco
ProdutoModel.create = (produto, result) => {
    sql.query("INSERT INTO produtos SET ? ", produto, (err, res) => {
        if (err) {
            console.log("Erro:", err);
            result(err, null);
            return;
        }
        console.log("Produto criado: ", { idprodutos: res.insertId, ...produto });
        result(null, { idprodutos: res.insertId, ...produto });

    });
    //implementar criação de um novo produto no banco
};

//Selecionar um produto através de um ID
ProdutoModel.findById = (produtoId, result) => {
    sql.query("SELECT * FROM produtos WHERE idprodutos = " + produtoId, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("Produto encontrado: ", res[0]);
            result(null, res[0]);
            return;
        } else
            result({ kind: "not_found" }, null)

    })

};

//Selecionar todos os produtos
ProdutoModel.getAll = (result) => {
    sql.query("SELECT * FROM produtos", (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        console.log("produtos: ", res);
        result(null, res);
    })
}

//Atualizar produto através de um ID
ProdutoModel.updateById = (produtoId, produto, result) => {
    sql.query("UPDATE produtos SET nome = ?, valor = ? WHERE idprodutos = ? ", [produto.nome, produto.valor, produtoId], (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(err, null);
        } else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        } else {
            console.log("Produto atualizado: ", { idprodutos: produtoId, ...produto });
            result(null, { idprodutos: produtoId, ...produto });
        }
    })
}


//Remover produto através de um ID
ProdutoModel.remove = (produtoId, result) => {
    sql.query("DELETE FROM produtos WHERE idprodutos = ?", produtoId, (err, res) => {
        if (err) {
            console.log("erro:", err);
            result(err, null);
        } else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        } else {
            result(null, res);
        }
    })
}

//Remover todos os produtos
ProdutoModel.removeAll = (result) => {
    sql.query("DELETE FROM produtos", (err, res) => {
        if (err) {
            console.log("erro:", err);
            result(err);
        } else {
            result(null);
        }
    })
}

module.exports = ProdutoModel;