import getDatabase from "../utils/database";
import {BankAccount, Transaction, User} from "./entities";
import logger from "../utils/logger";

export const getUserById = async (userId: string): Promise<User | undefined> => {
    const db = await getDatabase()
    const result = await db.get("SELECT * FROM users WHERE user_id = ?", userId)
    return <User>result
}

export const getBankAccountById = async (bankAccountId: string): Promise<BankAccount | undefined> => {
    const db = await getDatabase()
    const result = await db.get("SELECT * FROM bank_accounts WHERE bank_account_id = ?", bankAccountId)
    return <BankAccount>result
}


export const insertTransaction = async (transaction: Transaction) => {
    const db = await getDatabase()
    const result = await db.run(`INSERT OR REPLACE INTO transactions (bank_account_id, category, user_id, created_at, currency, description, executed_at, payment_method, status, title, transaction_at, transaction_id, type, updated_at, value) 
                                                       VALUES (:bank_account_id, :category, :user_id, :created_at, :currency, :description, :executed_at, :payment_method, :status, :title, :transaction_at, :transaction_id, :type, :updated_at, :value)`, {
        ':bank_account_id': transaction.bankAccountId,
        ':category': transaction.category,
        ':user_id': transaction.userId,
        ':created_at': transaction.createdAt,
        ':currency': transaction.currency,
        ':description': transaction.description,
        ':executed_at': transaction.executedAt,
        ':payment_method': transaction.paymentMethod,
        ':status': transaction.status,
        ':title': transaction.title,
        ':transaction_at': transaction.transactionAt,
        ':transaction_id': transaction.transactionId,
        ':type': transaction.type,
        ':updated_at': transaction.updatedAt,
        ':value': transaction.value
    })
}

export const insertUser = async (user: User) => {
    const db = await getDatabase()
    try {
        const result = await db.run('INSERT OR REPLACE INTO users(user_id) VALUES(?)', user.userId)
    } catch (e) {
        logger.error('Error in insertUser')
    }
}

export const insertBankAccount = async (bankAccount: BankAccount) => {
    const db = await getDatabase()
    const result = await db.run('INSERT OR REPLACE INTO bank_accounts(bank_account_id, user_id, amount) VALUES(?, ?, ?)',
        bankAccount.userId, bankAccount.userId, bankAccount.amount)
}