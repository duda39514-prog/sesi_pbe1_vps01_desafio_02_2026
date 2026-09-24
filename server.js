const express = require("express");
const sistema = require("./dados.json")

const mostrarSistema = (req, res) => {
    res.send(sistema);
}

const novoSistema = (req, res) => {
    if (req.body) {
        res.send("IA criada com sucesso!")
        sistema.push(req.body)
    } else {
        res.send("Erro ao criar nova IA")
    }
}

function autoIncrement() {
    return Number(sistema[sistema.length - 1].id) + 1
}

const listarSistema = (req, res) => {
    res.send(sistema)

}

const excluirSistema = (req, res) =>{
    const id = req.params.id;

    sistema.forEach((pat, indice) => {
        if(pat.id == id){
            sistema.splice(indice, 1);
        }
    });

    res.send("IA excluido com sucesso!")
};

const atualizarSistema = (req, res) => {
   const id = req.query.id;
   const dados = req.body;

   sistema.forEach((sistema) =>{
    if(sistema.id == id){
        sistema.sistema = dados.sistema;
        sistema.tipo = dados.tipo;
        sistema.finalidade = dados.finalidade;
        sistema.tecnologia = dados.tecnologia;
        sistema.nivel_risco = dados.nivel_risco;
        sistema.possui_revisao_humana = dados.possui_revisao_humana;
    }
   });

   res.send("IA atualizado com sucesso!");
};

const PORT = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", listarSistema)
app.post("/", novoSistema)
app.delete("/:id", excluirSistema)
app.patch("/", atualizarSistema)

app.listen(PORT, () => {
     console.log(`Servidor http://127.0.0.1:${PORT}`)
})