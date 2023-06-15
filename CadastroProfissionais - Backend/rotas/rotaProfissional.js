import {Router} from 'express';
import ProfissionalCtrl from '../controle/profissionalCtrl.js';

const rotaProfissional = new Router();
const profissionalCtrl = new ProfissionalCtrl();

rotaProfissional.post("/", profissionalCtrl.gravar)
.get("/:cpf", profissionalCtrl.consultar)
.get("/", profissionalCtrl.consultarTodos)
.patch("/:cpf", profissionalCtrl.atualizar)
.delete("/:cpf", profissionalCtrl.excluir);


export default rotaProfissional;