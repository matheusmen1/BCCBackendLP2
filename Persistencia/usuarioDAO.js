//DAO - Data Access Object
import Usuario from "../Modelo/usuario.js";
import Privilegio from "../Modelo/privilegio.js";
import conectar from "./Conexao.js";
export default class UsuarioDAO {
    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS usuario(
                usu_codigo INT NOT NULL AUTO_INCREMENT,
                usu_nickname VARCHAR(200) NOT NULL,
                usu_senha VARCHAR(200) NOT NULL,
                usu_urlAvatar VARCHAR(250) NOT NULL,
                fk_codigo_pri INT NOT NULL,
                CONSTRAINT pk_usuario PRIMARY KEY(usu_codigo),
                CONSTRAINT fk_codigo_pri FOREIGN KEY(fk_codigo_pri) REFERENCES privilegio(pri_codigo)
              
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `INSERT INTO usuario(usu_nickname, usu_senha, usu_urlAvatar, fk_codigo_pri)
                values(?,?,?,?)
            `;
            let parametros = [
                usuario.nickname,
                usuario.senha,
                usuario.urlAvatar,
                usuario.privilegio.codigo
            ]; //dados do produto
            const resultado = await conexao.execute(sql, parametros);
            usuario.codigo = resultado[0].insertId;
            await conexao.release(); //libera a conexão
        }
    }
    async alterar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `UPDATE usuario SET usu_nickname=?,usu_senha=?,usu_urlAvatar=?,fk_codigo_pri=?
                WHERE usu_codigo = ?
            `;
            let parametros = [
                usuario.nickname,
                usuario.senha,
                usuario.urlAvatar,
                usuario.privilegio.codigo,
                usuario.codigo
            ]; //dados do produto
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }
    async consultar(termo) {
        //resuperar as linhas da tabela produto e transformá-las de volta em produtos
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * from usuario p
                   INNER JOIN privilegio c ON p.fk_codigo_pri = c.pri_codigo
                   WHERE usu_nickname LIKE ?`;
            parametros = ['%' + termo + '%'];
        }
        else {
            sql = `SELECT * FROM usuario p
                    INNER JOIN privilegio c ON p.fk_codigo_pri = c.pri_codigo
                   WHERE usu_codigo = ?`
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaUsuarios = [];
        for (const linha of linhas) {
            const privilegio = new Privilegio(linha['pri_codigo'], linha['pri_descricao']);
            const usuario = new Usuario(
                linha['usu_codigo'],
                linha['usu_nickname'],
                linha['usu_senha'],
                linha['usu_urlAvatar'],
                privilegio
            );
            listaUsuarios.push(usuario);
        }
        await conexao.release();
        return listaUsuarios;
    }
    async excluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `DELETE FROM usuario WHERE usu_codigo = ?`;
            let parametros = [
                usuario.codigo
            ]; //dados do produto
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }
}