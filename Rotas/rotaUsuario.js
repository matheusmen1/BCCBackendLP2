//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import UsuarioCtrl from "../Controle/usuarioCtrl.js";

const usuarioCtrl = new UsuarioCtrl();
const rotaUsuario = Router();

rotaProduto.post("/", usuarioCtrl.incluir);
rotaProduto.put("/:codigo", usuarioCtrl.alterar);
rotaProduto.patch("/:codigo", usuarioCtrl.alterar);
rotaProduto.delete("/:codigo", usuarioCtrl.excluir);
rotaProduto.get("/:codigo", usuarioCtrl.consultar);
rotaProduto.get("/",usuarioCtrl.consultar);

export default rotaUsuario;


