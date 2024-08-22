export class APIBase {
    baseUrl: string;
    token: string | null;
    apiPath: string = "";
    constructor(token: string | null) {
        this.baseUrl = `${
            process.env.EXPO_PUBLIC_API_ROUTE || "http://localhost:8000"
        }/api`;
        this.token = token;
    }
    get apiUrl() {
        return `${this.baseUrl}/${this.apiPath}`;
    }
    private async send<T>(
        method: string,
        url: string,
        obj?: T
    ): Promise<Response> {
        const headers: { [key: string]: string } = {
            "Content-Type": "application/json",
        };
        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }
        const requestOptions: RequestInit = {
            method: method,
            headers: headers,
        };
        if (obj) {
            requestOptions.body = JSON.stringify(obj);
        }
        return await fetch(url, requestOptions);
    }

    async post<T, R>(url: string, obj: T): Promise<R> {
        const response = await this.send("POST", url, obj);
        return await response.json();
    }

    async get<T>(url: string): Promise<T> {
        const response = await this.send("GET", url);
        return await response.json();
    }

    async patch<T>(url: string, obj: T): Promise<T> {
        const response = await this.send("PATCH", url, obj);
        return await response.json();
    }

    async _delete(url: string): Promise<void> {
        await this.send("DELETE", url);
    }
}
