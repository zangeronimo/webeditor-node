import { createConnections } from 'typeorm';

export class TypeOrm {
    public static async Connect() {
        return await createConnections();
    } 
}