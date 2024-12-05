//DAO - Data Access Object
import Fornecedor from "../Modelo/fornecedor.js";

import conectar from "./Conexao.js";
export default class FornecedorDAO {
    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS fornecedor(
                forn_codigo INT NOT NULL AUTO_INCREMENT,
                forn_nome VARCHAR(200) NOT NULL,
                forn_cep VARCHAR(200) NOT NULL,
                forn_cidade VARCHAR(200) NOT NULL,
                forn_cnpj VARCHAR(200) NOT NULL,
                forn_endereco VARCHAR(200) NOT NULL,
                forn_telefone VARCHAR(200) NOT NULL,
                CONSTRAINT pk_fornecedor PRIMARY KEY(forn_codigo)
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `INSERT INTO fornecedor(forn_nome,forn_cep,forn_cidade,forn_cnpj,forn_endereco,forn_telefone)
                values(?,?,?,?,?,?)
            `;
            let parametros = [
                fornecedor.nome,
                fornecedor.cep,
                fornecedor.cidade,
                fornecedor.cnpj,
                fornecedor.endereco,
                fornecedor.telefone,
            
            ]; 
            const resultado = await conexao.execute(sql, parametros);
            fornecedor.codigo = resultado[0].insertId;
            await conexao.release(); //libera a conexão
        }
    }
    async alterar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `UPDATE fornecedor SET forn_nome=?,forn_cep=?,forn_cidade=?,forn_cnpj=?,forn_endereco=?,forn_telefone=?
                WHERE forn_codigo = ?
            `;
            let parametros = [
                fornecedor.nome,
                fornecedor.cep,
                fornecedor.cidade,
                fornecedor.cnpj,
                fornecedor.endereco,
                fornecedor.telefone,
                fornecedor.codigo
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
            sql = `SELECT * FROM fornecedor
                   WHERE forn_nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        }
        else {
            sql = `SELECT * FROM fornecedor 
                   WHERE forn_codigo = ?`
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaFornecedor = [];
        for (const linha of linhas) {
            const fornecedor = new Fornecedor(
                linha['forn_codigo'],
                linha['forn_nome'],
                linha['forn_cep'],
                linha['forn_cidade'],
                linha['forn_cnpj'],
                linha['forn_endereco'],
                linha['forn_telefone']
                
            );
            listaFornecedor.push(fornecedor);
        }
        await conexao.release();
        return listaFornecedor;
    }
    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `DELETE FROM fornecedor WHERE forn_codigo = ?`;
            let parametros = [
                fornecedor.codigo
            ]; 
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }
}