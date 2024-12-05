import e from "cors";
import FornecedorDAO from "../Persistencia/fornecedorDAO.js";

export default class Fornecedor {
    // Atributos privados usando a sintaxe #
    #codigo;
    #nome;
    #cep;
    #cidade;
    #endereco;
    #cnpj; 
    #telefone;

    // Construtor da classe
    constructor(codigo =0, nome="", cep="", cidade="", cnpj="", endereco="", telefone="") {
        this.#codigo = codigo;       // Atribuindo valor ao atributo privado
        this.#nome = nome;  // Atribuindo valor ao atributo privado
        this.#cidade = cidade;
        this.#cnpj = cnpj;
        this.#cep = cep;
        this.#endereco = endereco;
        this.#telefone = telefone
    }

    // Método get para o atributo codigo
    get codigo() {
        return this.#codigo;
    }

    // Método set para o atributo codigo
    set codigo(value) {
        this.#codigo = value;
    }

    // Método get para o atributo descricao
    get nome() {
        return this.#nome;
    }

    // Método set para o atributo descricao
    set nome(value) {
        this.#nome = value;
    }
    get cidade(){
        return this.#cidade;
    }
    set cidade(value)
    {
        this.#cidade = value;
    }
    get cnpj(){
        return this.#cnpj;
    }
    set cnpj(value)
    {
        this.#cnpj = value;
    }
    get cep(){
        return this.#cep;
    }
    set cep(value){
        this.#cep = value;
    }
    get endereco(){
        return this.#endereco;

    }
    set endereco(value){
        this.#endereco = value;
    }
    get telefone()
    {
        return this.#telefone;
    }
    set telefone(value){
        this.#telefone = value;
    }
    // Método toJSON para conversão em JSON
    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "cep": this.#cep,
            "cidade": this.#cidade,
            "cnpj": this.#cnpj,
            "endereco": this.#endereco,
            "telefone":this.#telefone
        };
    }

    async gravar(){
        const fornDAO = new FornecedorDAO();
        await fornDAO.gravar(this);
    }

    async editar(){
        const fornDAO = new FornecedorDAO();
        await fornDAO.editar(this);
    }

    async excluir(){
        const fornDAO = new FornecedorDAO();
        await fornDAO.excluir(this);
    }

    async consultar(termo){
        const fornDAO = new FornecedorDAO();
        return await fornDAO.consultar(termo);
    }
}