
import { Router } from "express"; //micro-aplicação HTTP
import PrivilegioCtrl from "../Controle/privilegioCtrl.js";

const privilegioCtrl = new PrivilegioCtrl();
const rotaPrivilegio = Router();

rotaPrivilegio.post("/", privilegioCtrl.gravar);
rotaPrivilegio.put("/:codigo", privilegioCtrl.editar);
rotaPrivilegio.patch("/:codigo", privilegioCtrl.editar);
rotaPrivilegio.delete("/:codigo", privilegioCtrl.excluir);
rotaPrivilegio.get("/:codigo", privilegioCtrl.consultar);
rotaPrivilegio.get("/",privilegioCtrl.consultar);

export default rotaPrivilegio;


