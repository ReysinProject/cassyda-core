export class CassidaClient {
    private static instance: CassidaClient;
    private constructor() { }

    /*
    *  Singleton instance getter
    *
    * @returns {CassidaClient} The singleton instance
    * */
    public static getInstance() {
        if (!CassidaClient.instance) {
            CassidaClient.instance = new CassidaClient();
        }
        return CassidaClient.instance;
    }

    async mutate(mutation: string) {
        // implementation
    }

    async subscribe(subscription: string) {
        // implementation
    }

    async unsubscribe(subscription: string) {
        // implementation
    }
}