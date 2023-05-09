import type IRepositorio from "../interfaces/IRepositorio";
import type IUsuario from "../interfaces/IUsuario";

export default function montaUsuario(dadosUsuario: any, dadosRepositorio: any): IUsuario {
    const repositorio = dadosRepositorio.map((repo: any) => {
        return {
            nome: repo.name,
            url: repo.url
        } as IRepositorio
    })

    return {
        avatar_url: dadosUsuario.avatar_url,
        login: dadosUsuario.login,
        nome: dadosUsuario.name,
        perfil_url: dadosUsuario.html_url,
        seguidores: dadosUsuario.followers,
        repositorios_publicos: dadosUsuario.public_repos,
        repositorio
    }
}