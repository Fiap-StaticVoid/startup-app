import { APIBase } from "./common";

export interface Usuario {
    id?: string;
    nome: string;
    email: string;
    senha?: string;
}

export interface DadosLogin {
    email: string;
    senha: string;
}
interface Token {
    token: string;
    tipo: string;
}

export class APIUsuarios extends APIBase {
    apiPath: string = "usuarios";

    async create(usuario: Usuario): Promise<Usuario> {
        return await this.post(this.apiUrl, usuario);
    }
    async read(): Promise<Usuario[]> {
        return await this.get(this.apiUrl);
    }
    async readById(id: string): Promise<Usuario> {
        return await this.get(`${this.apiUrl}/${id}`);
    }
    async update(usuario: Usuario): Promise<Usuario> {
        return await this.patch(`${this.apiUrl}/${usuario.id}`, usuario);
    }
    async delete(id: string): Promise<void> {
        await this._delete(`${this.apiUrl}/${id}`);
    }
    async login(dados: DadosLogin): Promise<string> {
        const response = await this.post<DadosLogin, Token>(
            `${this.apiUrl}/login`,
            dados
        );
        return response.token;
    }
    async logout(): Promise<void> {
        await this.post(`${this.apiUrl}/logout`, {});
    }
}
