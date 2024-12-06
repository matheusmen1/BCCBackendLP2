import Privilegio from "./privilegio.js";
import UsuarioDAO from "../Persistencia/usuarioDAO.js";
export default class Usuario{
    //atributos privados
    #codigo;
    #nickname;
    #senha;
    #urlAvatar;
    #privilegio;

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo=novoCodigo;
    } 

    get nickname()
    {
        return this.#nickname;
    }
    set nickname(value)
    {
        this.#nickname = value;
    }
    get senha()
    {
        return this.#senha;
    }
    set senha(value)
    {
        this.#senha = value;
    }
    get urlAvatar()
    {
        return this.#urlAvatar;
    }
    set urlAvatar(value)
    {
        this.#urlAvatar = value;
    }
    get privilegio()
    {
        return this.#privilegio;
    }
    set privilegio(novoPrivilegio)
    {
        if (novoPrivilegio instanceof Privilegio)
             this.#privilegio = novoPrivilegio;
    }
    //construtor (criador de um produto)
    constructor(codigo=0, nickname="", senha="", urlAvatar="", privilegio={}){
        this.#codigo=codigo;
        this.#nickname =nickname;
        this.#senha = senha;
        this.#urlAvatar = urlAvatar;
        this.#privilegio = privilegio;
    }

    //override do método toJSON
    //o método toJSON é chamado automaticamente quando um produto
    //precisar ser convertido no formato JSON
    toJSON(){
        return {
            "codigo":this.#codigo,
            "nickname":this.#nickname,
            "senha":this.#senha,
            "urlAvatar":this.#urlAvatar,
            "privilegio":this.#privilegio
        }
    }

    async incluir(){
        //instanciar a camada de persistencia do produto
        const usuDAO = new UsuarioDAO();
        await usuDAO.incluir(this); //this referência a si mesmo
    }

    async consultar(termo){
        const usuDAO = new UsuarioDAO();
        return await usuDAO.consultar(termo);
    }

    async excluir(){
        const usuDAO = new UsuarioDAO();
        await usuDAO.excluir(this);
    }

    async alterar(){
        const usuDAO = new UsuarioDAO();
        await usuDAO.alterar(this);
    }
}

