import { APIBase } from "./common";

interface Historico {
    id?: string;
    valor: number;
    usuario_id: string;
    categoria_id: string;
    data: string;
}

export class APIHistorico extends APIBase {
    apiPath: string = "historicos";
    async create(historico: Historico): Promise<Historico> {
        return await this.post(this.apiUrl, historico);
    }
    async read(): Promise<Historico[]> {
        return await this.get(this.apiUrl);
    }
    async update(historico: Historico): Promise<Historico> {
        return await this.patch(`${this.apiUrl}/${historico.id}`, historico);
    }
    async delete(id: string): Promise<void> {
        await this.delete(`${this.apiUrl}/${id}`);
    }
}
