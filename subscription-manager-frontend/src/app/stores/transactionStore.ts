import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import type { Transaction } from "../models/transaction";

export default class TransactionStore {
    transactions: Transaction[] = [];
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadMyTransactions = async () => {
        this.loading = true;
        try {
            this.transactions = await agent.Transactions.listMine();
        } finally {
            this.loading = false;
        }
    };
}
