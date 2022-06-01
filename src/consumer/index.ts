import "reflect-metadata"
import logger from '../utils/logger';
import {EventDTO, Event} from "./entities";
import {validateOrReject} from "class-validator";
import {plainToClass} from "class-transformer";

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
    try {
        logger.info('Event received', {eventDTO});
        try {
            await validateAndTransform(eventDTO)
        } catch (err) {
            logger.alert('Validation error', {err})
        }

        return true;
    } catch (err) {
        return false;
    }
};


const validateAndTransform = async (eventDTO: EventDTO): Promise<Event> => {
    let event = plainToClass(Event, eventDTO)
    await validateOrReject(event)
    return event
}

export default handle;
