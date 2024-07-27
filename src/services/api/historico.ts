import { APIBase } from "./common";

enum TipoFrequencia {
    minuto = "minutos",
    hora = "horas",
    diario = "diario",
    semanal = "semanal",
    mensal = "mensal",
    anual = "anual",
}

export interface Historico {
    id?: string;
    valor: number;
    usuario_id?: string;
    categoria_id: string;
    data: string;
    nome: string,
}

export interface LancamentoRecorrente {
    id?: string;
    valor: number;
    usuario_id?: string;
    categoria_id: string;
    inicia_em: string;
    termina_em: string | null;
    frequencia: number;
    tipo_frequencia: TipoFrequencia;
    nome: string,
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

export class APILancamentoRecorrente extends APIBase {
    apiPath: string = "lancamentos-recorrentes";
    async create(
        lancamento: LancamentoRecorrente
    ): Promise<LancamentoRecorrente> {
        return await this.post(this.apiUrl, lancamento);
    }
    async read(): Promise<LancamentoRecorrente[]> {
        return await this.get(this.apiUrl);
    }
    async update(
        lancamento: LancamentoRecorrente
    ): Promise<LancamentoRecorrente> {
        return await this.patch(`${this.apiUrl}/${lancamento.id}`, lancamento);
    }
    async delete(id: string): Promise<void> {
        await this.delete(`${this.apiUrl}/${id}`);
    }
}
