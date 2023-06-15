const formulario = document.getElementById("formulario");

var urlbase = "http://localhost:4000/profissional";

formulario.onsubmit = cadastrar;

function cadastrar(evento) {
  let nome = document.getElementById("nome").value;
  let cpf = document.getElementById("cpf").value;
  let email = document.getElementById("email").value
  let telefone = document.getElementById("telefone").value
  let profissao = document.getElementById("profissao").value
  let especialidade = document.getElementById("especialidade").value
  let localizacao = document.getElementById("localizacao").value;
  let experiencia = document.getElementById("experiencia").value
  let registro = document.getElementById("registro").value
  let disponibilidade = document.getElementById("disponibilidade").value;
  let profissional = new Profissional(nome, cpf, email, telefone, profissao, especialidade, localizacao, experiencia, registro, disponibilidade);
  fetch(urlbase, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profissional)
  }).then((resposta) => {
    return resposta.json();
  }).then((dados) => {
    if (dados.status) {
      alert(dados.mensagem)
      limpaCampos()
    }
    else {
      alert(dados.mensagem);
    }
  }).catch((erro) => {
    alert("Problema ao cadastrar profissional: " + erro.message)
  })
  evento.preventDefault();
  evento.stopPropagation();
}

function limpaCampos(){
  document.getElementById("nome").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("profissao").value = "";
  document.getElementById("especialidade").value = ""
  document.getElementById("localizacao").value = "";
  document.getElementById("experiencia").value = "";
  document.getElementById("registro").value = "";
  document.getElementById("disponibilidade").value = "";
}