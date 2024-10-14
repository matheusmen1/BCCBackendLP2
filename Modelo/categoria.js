import CategoriaDAO from "../Persistencia/categoriaDAO.js";
export default class Categoria{
    #codigo;
    #descricao;

    constructor(codigo, descricao) {
        this.#codigo = codigo;
        this.#descricao = descricao;
    }

    // Métodos get
    getCodigo() {
        return this.#codigo;
    }

    getNome() {
        return this.#descricao;
    }

    // Métodos set
    setCodigo(codigo) {
        this.#codigo = codigo;
    }

    setNome(descricao) {
        this.#descricao = descricao;
    }

    // Método para converter a instância para JSON
    toJSON() {
        return JSON.stringify({
            codigo: this.#codigo,
            descricao: this.#descricao
        });
    }
    async gravar(){
        const catDAO = new CategoriaDAO();
        await catDAO.gravar(this);
    }
    async editar(){
        const catDAO = new CategoriaDAO();
        await catDAO.editar(this);
    }
    async excluir(){
        const catDAO = new CategoriaDAO();
        await catDAO.excluir(this);
    }
    async consultar(){
        const catDAO = new CategoriaDAO();
        return await catDAO.consultar(this);
    }
}
