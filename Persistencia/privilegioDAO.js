import Privilegio from "../Modelo/privilegio.js";
import conectar from "./Conexao.js";

export default class PrivilegioDAO{

    constructor(){
        this.init();
    }

    async init(){
        try{
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS privilegio(
                    pri_codigo INT NOT NULL AUTO_INCREMENT,
                    pri_descricao VARCHAR(50) NOT NULL,
                    CONSTRAINT pk_privilegio PRIMARY KEY(pri_codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();

        }
        catch(erro){
            console.log("Erro ao iniciar a tabela privilegio!");
        }
    }

    async gravar(privilegio){
        if (privilegio instanceof Privilegio){
            const conexao = await conectar();
            const sql = "INSERT INTO privilegio(pri_descricao) VALUES (?)";
            const parametros = [privilegio.descricao];
            const resultado = await conexao.execute(sql,parametros);
            privilegio.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }
    
    async editar(privilegio){
        if (privilegio instanceof Privilegio){
            const conexao = await conectar();
            const sql = "UPDATE privilegio SET pri_descricao = ? WHERE pri_codigo = ?";
            const parametros = [privilegio.descricao, privilegio.codigo];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async excluir(privilegio){
        if (privilegio instanceof Privilegio){
            const conexao = await conectar();
            const sql = "DELETE FROM privilegio WHERE pri_codigo = ?";
            const parametros = [privilegio.codigo];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async consultar(termo){
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = "SELECT * FROM privilegio WHERE pri_descricao LIKE ? ORDER BY pri_descricao";
            parametros.push("%"+termo+"%");
        }
        else{
            sql = "SELECT * FROM privilegio WHERE pri_codigo = ? ORDER BY pri_descricao";
            parametros.push(termo);
        }
        const conexao = await conectar();
        
        const [registros, campos] = await conexao.query(sql, parametros);
        await conexao.release();
        let listaPrivilegio=[];
        for (const registro of registros){
            const privilegio = new Privilegio(registro['pri_codigo'],
                                            registro['pri_descricao']    
            );
            listaPrivilegio.push(privilegio);
        }
        
        return listaPrivilegio;

    }

}