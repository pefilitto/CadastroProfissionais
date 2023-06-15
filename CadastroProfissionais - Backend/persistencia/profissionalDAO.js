import conectar from "./conexao.js";
import Profissional from "../modelo/modelo_profissional.js";

export class ProfissionalDAO {
    #conexoes
    constructor() {
        this.#conexoes = conectar();
    }

    //Os metodos da camada DAO deverao ser Assincronos
    async gravar(profissional) {
        if (profissional instanceof Profissional) {
            const conexao = await this.#conexoes.getConnection();
            const sql = "INSERT INTO profissional (nome, cpf, email, telefone, profissao, especialidade, localizacao, experiencia, registro, disponibilidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            const parametros = [
                profissional.nome,
                profissional.cpf,
                profissional.email,
                profissional.telefone,
                profissional.profissao,
                profissional.especialidade,
                profissional.localizacao,
                profissional.experiencia,
                profissional.registro,
                profissional.disponibilidade
            ];

            await conexao.execute(sql, parametros);
        }
    }

    async consultar(cpf) {
        const conexao = await this.#conexoes.getConnection();
        const sql = 'SELECT nome, cpf, email, telefone, profissao, especialidade, localizacao, experiencia, registro, disponibilidade FROM profissional WHERE cpf = ?';
        const parametros = [cpf];
        const [rows] = await conexao.execute(sql, parametros);
        let lista = [];
        for (const linha of rows) {
            const profissional = new Profissional(
                linha['nome'],
                linha['cpf'],
                linha['email'],
                linha['telefone'],
                linha['profissao'],
                linha['especialidade'],
                linha['localizacao'],
                linha['experiencia'],
                linha['registro'],
                linha['disponibilidade']
            );
            lista.push(profissional);
        }
        return lista;
    }

    async atualizar(profissional){
        const conexao = await this.#conexoes.getConnection();
        const cpf = profissional.cpf;
        const sql = `UPDATE profissional SET nome = ?, email = ?, telefone = ?, profissao = ?, especialidade = ?, localizacao = ?, experiencia = ?, registro = ?, disponibilidade = ? WHERE cpf = '${cpf}'`;
        const parametros = [
            profissional.nome,
            profissional.email,
            profissional.telefone,
            profissional.profissao,
            profissional.especialidade,
            profissional.localizacao,
            profissional.experiencia,
            profissional.registro,
            profissional.disponibilidade
        ];
        await conexao.execute(sql, parametros);
    }

    async excluir(cpf){
        const conexao = await this.#conexoes.getConnection();
        const sql = "DELETE FROM profissional WHERE cpf = ?";
        const parametros = [cpf];
        await conexao.execute(sql, parametros);
    }

    async consultarTodos(){
        const conexao = await this.#conexoes.getConnection();
        const sql = 'SELECT * FROM profissional';
        const [rows] = await conexao.execute(sql);
        let lista = [];
        for(const linha of rows){
            const profissional = new Profissional(
                linha['nome'],
                linha['cpf'],
                linha['email'],
                linha['telefone'],
                linha['profissao'],
                linha['especialidade'],
                linha['localizacao'],
                linha['experiencia'],
                linha['registro'],
                linha['disponibilidade']
            );

            lista.push(profissional);
        } 
        return lista;
    }
}