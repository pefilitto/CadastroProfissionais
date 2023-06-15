import {ProfissionalDAO} from "../persistencia/profissionalDAO.js";

export default class Profissional{
    #nome
    #cpf
    #email
    #telefone
    //Área em que atua
    #profissao
    #especialidade
    #localizacao
    #experiencia
    //Exemplo: CRM, CRO, Coren, etc...
    #registro
    #disponibilidade

    constructor(nome, cpf, email, telefone, profissao, especialidade, localizacao, experiencia, registro, disponibilidade){
        this.#nome = nome;
        this.#cpf = cpf;
        this.#email = email;
        this.#telefone = telefone;
        this.#profissao = profissao;
        this.#especialidade = especialidade;
        this.#localizacao = localizacao;
        this.#experiencia = experiencia;
        this.#registro = registro;
        this.#disponibilidade = disponibilidade;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novonome){
        this.#nome = novonome;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novocpf){
        this.#cpf = novocpf;
    }

    get email(){
        return this.#email;
    }

    set email(novoemail){
        this.#email = novoemail;
    }

    get telefone(){
        return this.#telefone;
    }

    set telefone(novotelefone){
        this.#telefone = novotelefone;
    }

    get profissao(){
        return this.#profissao;
    }

    set profissao(novaprofissao){
        this.#profissao = novaprofissao;
    }

    get especialidade(){
        return this.#especialidade;
    }

    set especialidade(novaespecialidade){
        this.#especialidade = novaespecialidade;
    }

    get localizacao(){
        return this.#localizacao;
    }

    set localizacao(novalocalizacao){
        this.#localizacao = novalocalizacao;
    }

    get experiencia(){
        return this.#experiencia;
    }

    set experiencia(novaexperiencia){
        this.#experiencia = novaexperiencia;
    }

    get registro(){
        return this.#registro;
    }

    set registro(novoregistro){
        this.#registro = novoregistro;
    }

    get disponibilidade(){
        return this.#disponibilidade;
    }

    set disponibilidade(novaDisponibilidade){
        this.#disponibilidade = novaDisponibilidade;
    }

    toJSON(){
        return {
            "nome": this.#nome,
            "cpf": this.#cpf,
            "email": this.#email,
            "telefone": this.#telefone,
            "profissao": this.#profissao,
            "especialidade": this.#especialidade,
            "localizacao": this.#localizacao,
            "experiencia": this.#experiencia,
            "registro": this.#registro,
            "disponibilidade": this.#disponibilidade
        }
    }

    toString(){
        return  "nome" + this.#nome + '\n' +
                "cpf" + this.#cpf + '\n' +
                "email" + this.#email + '\n' +
                "telefone" + this.#telefone + '\n' +
                "profissao" + this.#profissao + '\n' +
                "especialidade" + this.#especialidade + '\n' +
                "localizacao" + this.#localizacao + '\n' +
                "experiencia" + this.#experiencia + '\n' +
                "registro" + this.#registro + '\n' +
                "disponibilidade" + this.#disponibilidade + '\n'
    }

    async gravar(){
        const novoProfissional = new ProfissionalDAO();
        await novoProfissional.gravar(this);
    }

    async atualizar(){
        const novoProfissional = new ProfissionalDAO();
        await novoProfissional.atualizar(this);
    }

    async consultar(cpf){
        const profissional = new ProfissionalDAO();
        const resultado = await profissional.consultar(cpf);
        return resultado;
    }

    async excluir(cpf){
        const profissional = new ProfissionalDAO();
        const resultado = await profissional.excluir(cpf);
        return resultado;
    }

    async consultarTodos(){
        const profissional = new ProfissionalDAO();
        const resultado = await profissional.consultarTodos();
        return resultado
    }
}