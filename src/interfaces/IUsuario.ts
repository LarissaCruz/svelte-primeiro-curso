import type IRepositorio from "./IRepositorio";

export default interface IUsuario {
    login: string;
    nome: string;
    avatar_url: string;
    perfil_url: string;
    repositorios_publicos: number;
    seguidores: number;
    repositorio: IRepositorio[]
}