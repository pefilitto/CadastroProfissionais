import Profissional from "../modelo/modelo_profissional.js";
import { validaCPF } from "../recursos/funcoes.js";

export default class ProfissionalCtrl {

    //O metodo HTTP funciona a base de Requisicoes e Respostas

    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            if (dados && typeof (dados) == 'object') {
                const nome = dados.nome;
                const cpf = dados.cpf;
                const email = dados.email;
                const telefone = dados.telefone;
                const profissao = dados.profissao;
                const especialidade = dados.especialidade;
                const localizacao = dados.localizacao;
                const experiencia = dados.experiencia;
                const registro = dados.registro;
                const disponibilidade = dados.disponibilidade;
                //const dia = dados.dia;
                //const horario = dados.horario;
                if (validaCPF(cpf)) {
                    if (nome && cpf && email && telefone && profissao && especialidade && localizacao && experiencia && registro && disponibilidade) {
                        const profissional = new Profissional(nome, cpf, email, telefone, profissao, especialidade, localizacao, experiencia, registro, disponibilidade);

                        profissional.consultar(cpf).then((lista) => {
                            if (lista.length > 0) {
                                resposta.status(400).json({
                                    status: false,
                                    mensagem: "Profissional ja cadastrado"
                                })
                            }
                            else {
                                profissional.gravar(profissional).then(() => {
                                    resposta.status(200).json({
                                        status: true,
                                        mensagem: "Profissional cadastrado com sucesso"
                                    })
                                }).catch((erro) => {
                                    resposta.status(500).json({
                                        status: false,
                                        mensagem: "Erro ao cadastrar profissional: " + erro.message
                                    })
                                })
                            }
                        })
                    }
                    else {
                        resposta.status(400).json({
                            status: false,
                            mensagem: "Informe todos os dados do profissional"
                        })
                    }
                }
                else {
                    resposta.status(400).json({
                        status: false,
                        mensagem: "Informe um CPF valido"
                    })
                }
            }
        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "GET") {
            const cpf = requisicao.params.cpf;

            if (cpf) {
                const profissional = new Profissional(cpf);

                profissional.consultar(cpf).then((lista) => {
                    if (lista.length > 0) {
                        resposta.status(200).json(lista)
                    }
                    else {
                        resposta.status(400).json({
                            status: false,
                            mensagem: "Nenhum profissional encontrado"
                        })
                    }
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao consultar profissional: " + erro.message
                    })
                })
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o CPF do profissional para consultar"
                })
            }
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "PATCH" && requisicao.is("application/json")) {
            const cpf = requisicao.params.cpf;
            const profissional = new Profissional(cpf);
            profissional.consultar(cpf).then((lista) => {
                if(lista.length > 0){
                    const dados = requisicao.body;
                    if(dados && typeof(dados) == "object"){
                        const nome = dados.nome;
                        const cpf = requisicao.params.cpf
                        const email = dados.email;
                        const telefone = dados.telefone;
                        const profissao = dados.profissao;
                        const especialidade = dados.especialidade;
                        const localizacao = dados.localizacao;
                        const experiencia = dados.experiencia;
                        const registro = dados.registro;
                        const disponibilidade = dados.disponibilidade;

                        if (nome && cpf && email && telefone && profissao && especialidade && localizacao && experiencia && registro && disponibilidade){
                            const profissional1 = new Profissional(nome, cpf, email, telefone, profissao, especialidade, localizacao, experiencia, registro, disponibilidade);
                            profissional1.atualizar().then(() => {
                                resposta.status(200).json({
                                    status: true,
                                    mensagem: "Profissional atualizado com sucesso"
                                })
                            }).catch((erro) => {
                                resposta.status(500).json({
                                    status: false,
                                    mensagem: "Nao foi possivel atualizar o profissional: " + erro.message
                                })
                            })
                        }
                        else{
                            resposta.status(400).json({
                                status:false,
                                mensagem: "Informe todos os dados do profissional para atualizar"
                            })
                        }
                    }
                }
                else{
                    resposta.status(400).json({
                        status:false,
                        mensagem: "Informe o CPF de um profissional ja cadastrado para atualizar"
                    })
                }
            })
        }   
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "DELETE") {
            const cpf = requisicao.params.cpf;

            if (cpf) {
                const profissional = new Profissional(cpf);

                profissional.consultar(cpf).then((lista) => {
                    if (lista.length > 0) {
                        profissional.excluir(cpf).then(() => {
                            resposta.status(200).json({
                                status: true,
                                mensagem: "Profissional excluido com sucesso"
                            })
                        }).catch((erro) => {
                            resposta.status(500).json({
                                status: false,
                                mensagem: "Nao foi possivel excluir o profissional: " + erro.message
                            })
                        })
                    }
                    else {
                        resposta.status(400).json({
                            status: false,
                            mensagem: "Nenhum profissional com o CPF informado foi encontrado"
                        })
                    }
                })
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe um CPF para excluir"
                })
            }
        }
    }

    consultarTodos(requisicao, resposta){
        resposta.type("application/json");

        if(requisicao.method === "GET"){
            const profissional = new Profissional();
            profissional.consultarTodos().then((lista) => {
                if(lista.length > 0){
                    resposta.status(200).json(lista)
                }
                else{
                    resposta.status(400).json({
                        status: false,
                        mensagem: "Nenhum usuario cadastrado no banco de dados"
                    })
                }
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao obter os profissionais do banco de dados: " + erro.message
                })
            })
        }
    }
}
