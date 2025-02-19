import "reflect-metadata"
import logger from '../utils/logger';
import {EventDTO, Event, Transaction, User, BankAccount} from "./entities";
import {validateOrReject} from "class-validator";
import {plainToClass} from "class-transformer";
import getDatabase from "../utils/database";
import {getBankAccountById, getUserById, insertBankAccount, insertTransaction, insertUser} from "./services";

/**
 * A handler that will receive transaction events
 *
 * @param {object} eventDTO - The received event from the queue
 * @param {object} eventDTO.eventId - The unique id of the event
 * @param {string} eventDTO.payload - The payload of the event
 * @param {number} eventDTO.retry - The number of retries (defaults to 0)
 * @returns {boolean} false if the event needs to be retried, else true
 */
const handle = async (eventDTO: EventDTO) => {

    let event: Event
    logger.info('Event received', {eventDTO});
    try {
        event = await validateAndTransform(eventDTO)
        if (event.retry > 5)
            return true //Apply here logic to handle bad events
    } catch (err) {
        logger.info(err);
        return true //Apply here logic to handle bad payloads
    }

    try {
        await recordTransaction(event.payload)
    } catch (err) {
        //Error type has to be determined
        console.log(err);
    }
    return true;
};

/**
 * Takes an Event DTO (plain json) and convert it to an instance of Event
 * Validates the new created object (see entities.ts for more details) or rejects it by raising an exception
 *
 * @param {EventDTO} eventDTO
 * @return Promise<Event>
 */


export const validateAndTransform = async (eventDTO: EventDTO): Promise<Event> => {
    let event = plainToClass(Event, eventDTO)
    await validateOrReject(event)
    return event
}

/**
 * Stores the transaction in the database
 * Also creates bank account and client if needed
 * @param {Transaction} transaction
 */

const recordTransaction = async (transaction: Transaction) => {
    const user = await getUserById(transaction.userId)
    const bankAccount = await getBankAccountById(transaction.bankAccountId)

    if (!user)
        await insertUser({userId: transaction.userId})

    if (!bankAccount)
        await insertBankAccount({
            userId: transaction.userId,
            bankAccountId: transaction.bankAccountId,
            amount: 0
        })

    await insertTransaction(transaction)
}


export default handle;
