import { APIBase } from "./common";

export interface Categoria {
    id?: string;
    nome: string;
    descricao: string | null;
}

export class APICategoria extends APIBase {
    apiPath: string = "categorias";

    async create(categoria: Categoria): Promise<Categoria> {
        return await this.post(this.apiUrl, categoria);
    }
    async read(): Promise<Categoria[]> {
        return await this.get(this.apiUrl);
    }
    async update(categoria: Categoria): Promise<Categoria> {
        return await this.patch(`${this.apiUrl}/${categoria.id}`, categoria);
    }
    async delete(id: string): Promise<void> {
        await this._delete(`${this.apiUrl}/${id}`);
    }
}
