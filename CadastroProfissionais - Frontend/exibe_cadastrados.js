const barraPesquisa = document.getElementById("barraPesquisa");

getAll()

barraPesquisa.addEventListener("keyup", () => {
  const cpf = document.getElementById("barraPesquisa").value;
  if(cpf == null){
    getAll()
  }
  const urlget = `http://localhost:4000/profissional/`;
  fetch(urlget, {
    method: "GET",
  }).then((resposta) => {
    return resposta.json();
  }).then((dados) => {
    console.log(dados);
    const tabelafiltrada = dados.filter((element)=>{
      return (element.cpf).includes(cpf);
    })
    geraTabela(tabelafiltrada)
  }).catch((erro) => {
    alert("Nao foi possivel pesquisar: " + erro.message)
  })
})

function getAll() {
  const urlget = 'http://localhost:4000/profissional';
  fetch(urlget, {
    method: "GET",
  }).then((resposta) => {
    return resposta.json();
  }).then((dados) => {
    geraTabela(dados);
  }).catch((erro) => {
    alert("Erro: " + erro.message);
  })
}

function excluir(cpf) {
  var urlexcluir = `http://localhost:4000/profissional/${cpf}`;
  if (confirm("Confirma a exclusão do profissional?")) {
    fetch(urlexcluir, {
      method: "DELETE",
    }).then((resposta) => {
      return resposta.json();
    }).then((dados) => {
      alert(dados.mensagem);
      getAll()
    }).catch((erro) => {
      alert("Erro: " + erro.message);
    })
  }
  else {
    alert("Exclusao cancelada pelo usuario");
  }
}

function atualizar(nome, cpf, email, telefone, profissao, especialidade, localizacao, experiencia, registro, disponibilidade) {
  var urlget = `http://localhost:4000/profissional/${cpf}`;

  const modal = document.getElementById("dialog");
  modal.innerHTML = " "
  const formulario = document.createElement("form");
  formulario.innerHTML = `
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Nome</label>
        <input type="text" class="form-control" id="nome_modal" placeholder="Exemplo: Pedro Correia Felitto" aria-describedby="emailHelp" required>
      </div>

      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">CPF</label>
        <input type="text" class="form-control" placeholder="Exemplo: 111.111.111-11" id="cpf_modal" required>
      </div>

      <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email</label>
          <input type="email" class="form-control" id="email_modal" placeholder="Exemplo: seuemail@gmail.com" aria-describedby="emailHelp" required>
      </div>

      <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Telefone</label>
          <input type="text" class="form-control" id="telefone_modal" placeholder="Exemplo: (18) 99614-0996" aria-describedby="emailHelp" required>
      </div>

      <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Profissao</label>
          <input type="text" class="form-control" id="profissao_modal" placeholder="Exemplo: Medico" aria-describedby="emailHelp" required>
      </div>

      <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Especialidade</label>
          <input type="text" class="form-control" id="especialidade_modal" placeholder="Exemplo: Dermatologista" aria-describedby="emailHelp" required>
      </div>

      <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Localizacao</label>
          <input type="text" class="form-control" id="localizacao_modal" placeholder="Exemplo: Presidente Prudente - SP" aria-describedby="emailHelp" required>
      </div>

      <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Experiencia</label>
          <input type="text" class="form-control" id="experiencia_modal" placeholder="Exemplo: Santa Casa da Misericordia - 1 ano" aria-describedby="emailHelp" required>
      </div>

      <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Registro</label>
          <input type="text" class="form-control" id="registro_modal" placeholder="Exemplo: CRM, CRO, Coren" aria-describedby="emailHelp" required>
      </div>

      <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Disponibilidade</label>
          <input type="text" class="form-control" id="disponibilidade_modal" placeholder="Exemplo: Segunda-Feira - 14h" aria-describedby="emailHelp" required>
      </div>
      
      <div class="botoes">
        <button type="submit" id="botao-atualiza" class="btn btn-primary">Atualizar</button>

        <button type="button" id="botao-fecha" class="botao_fecha btn btn-danger">Fechar</button>
      </div>
      
    `;
  modal.appendChild(formulario);
  modal.classList.add("ajustamodal");
  modal.showModal();

  //Recuperando os dados da tabela que foram passados como parâmetro
  document.querySelector("#nome_modal").value = nome;
  document.querySelector("#cpf_modal").value = cpf;
  document.querySelector("#email_modal").value = email;
  document.querySelector("#telefone_modal").value = telefone;
  document.querySelector("#profissao_modal").value = profissao;
  document.querySelector("#especialidade_modal").value = especialidade;
  document.querySelector("#localizacao_modal").value = localizacao;
  document.querySelector("#experiencia_modal").value = experiencia;
  document.querySelector("#registro_modal").value = registro;
  document.querySelector("#disponibilidade_modal").value = disponibilidade;

  const botaoAtualiza = formulario.querySelector("#botao-atualiza");
  botaoAtualiza.addEventListener("click", function (event) {
    event.preventDefault(); // evita o comportamento padrão do botão

    //Permite que o usuario atualize os dados caso queira
    let novonome = document.querySelector("#nome_modal").value;
    let novoemail = document.querySelector("#email_modal").value;
    let novotelefone = document.querySelector("#telefone_modal").value;
    let novaprofissao = document.querySelector("#profissao_modal").value;
    let novaespecialidade = document.querySelector("#especialidade_modal").value;
    let novalocalizacao = document.querySelector("#localizacao_modal").value;
    let novaexperiencia = document.querySelector("#experiencia_modal").value;
    let novoregistro = document.querySelector("#registro_modal").value;
    let novadisponibilidade = document.querySelector("#disponibilidade_modal").value;

    //Instancia um novo Profissional com base nos novos valores informados pelo usuario
    let novoProfissional = new Profissional(novonome, cpf, novoemail, novotelefone, novaprofissao, novaespecialidade, novalocalizacao, novaexperiencia, novoregistro, novadisponibilidade);

    //Faz a requisição PATCH utilizando o fetch
    fetch(urlget, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novoProfissional)
    }).then((resposta) => {
      return resposta.json();
    }).then((dados) => {
      alert(dados.mensagem);
      getAll()
    }).catch((erro) => {
      alert("Erro: " + erro.message)
    })
  });

  const botaoFecha = document.querySelector("#botao-fecha")
  botaoFecha.addEventListener("click", function (evento) {
    evento.preventDefault();
    modal.close();
  })
}

function geraTabela(dados) {
  if (dados.length > 0) {
    JSON.stringify(dados)

    let divtabela = document.getElementById("divtabela");
    divtabela.innerHTML = ""
    const dialog = document.createElement("dialog");
    dialog.id = "dialog"
    divtabela.appendChild(dialog);
    let tabela = document.createElement('table');
    //Classe 'table' do Bootstrap
    tabela.classList.add("table");
    let cabecalho = document.createElement('thead');
    cabecalho.innerHTML = `
      <th>Indice</th>
      <th>Nome</th>
      <th>CPF</th>
      <th>Email</th>
      <th>Telefone</th>
      <th>Profissão</th>
      <th>Especialidade</th>
      <th>Localização</th>
      <th>Experiência</th>
      <th>Registro</th>
      <th>Disponibilidade</th>
    `
    tabela.appendChild(cabecalho);

    let corpo = document.createElement('tbody');
    corpo.classList.add("table-group-divider")
    dados.forEach((item, i) => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td class="text-column">${i}</td>
        <td class="text-column">${item.nome}</td>
        <td class="text-column">${item.cpf}</td>
        <td class="text-column">${item.email}</td>
        <td class="text-column">${item.telefone}</td>
        <td class="text-column">${item.profissao}</td>
        <td class="text-column">${item.especialidade}</td>
        <td class="text-column">${item.localizacao}</td>
        <td class="text-column">${item.experiencia}</td>
        <td class="text-column">${item.registro}</td>
        <td class="text-column">${item.disponibilidade}</td>
        <td class="text-column">
            <button type="button" class="btn btn-danger" onclick="excluir('${item.cpf}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
              </svg>
            </button>
        </td>

        <td class="text-column">
          <button type="button" style="color: black; background-color: yellow; border-color: yellow" id="botaoAtualizar" class="btn btn-danger" onclick="atualizar('${item.nome}','${item.cpf}', '${item.email}','${item.telefone}', '${item.profissao}', '${item.especialidade}', '${item.localizacao}', '${item.experiencia}', '${item.registro}', '${item.disponibilidade}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
          </button>
        </td>
      `
      i++;
      corpo.appendChild(linha);
    })

    tabela.appendChild(corpo);
    divtabela.appendChild(tabela);
  }
  else {
    divtabela.innerHTML = `
                <div class="alert alert-danger" role="alert" style="text-align: center;">
                    Não há nenhum profissional cadastrado!
                </div>
      `
  }
}








