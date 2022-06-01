import consume, {validateAndTransform} from '../../src/consumer';
import {validateOrReject} from "class-validator";

describe('consumer', () => {
    it('should return true when the event is correct', async () => {
        const result = await consume(goodEvent);
        expect(result).toEqual(true);
    });

    it('should return true when the payload is malformed', async () => {
        const result = await consume(badEvent);
        expect(result).toEqual(true)
    })
});

describe('validator', () => {
    it('should accept a correct payload', async () => {
        const result = await validateAndTransform(goodEvent)
        expect(result).toBeInstanceOf(Event)
    })

    it('should reject a bad payload', async () => {
        try {
            await validateAndTransform(badEvent)
            fail("Validator accepted something it shouldn't")
        } catch (err) {
            expect(err).toBeInstanceOf(Array)
        }
    })

    it('should reject an empty payload', async () => {
        try {
            await validateAndTransform(emptyPayloadEvent)
            fail("Validator accepted something it shouldn't")
        } catch (err) {
            expect(err).toBeInstanceOf(Array)
        }
    })
})

const emptyPayloadEvent = {
    "eventId": "ac0e08c4-2be6-4937-b127-e06b33347ac7",
    "payload": {},
    "retry": 0
}

const goodEvent = {
    "eventId": "ac0e08c4-2be6-4937-b127-e06b33347ac7",
    "payload": {
        "bankAccountId": "e5871c96-38cd-5963-96e1-788d249a0e6e",
        "category": "TELECOM",
        "userId": "5928ec66-6764-5ebf-bfd9-f5c9d1f0dff9",
        "createdAt": "1970-01-11T23:03:31.560Z",
        "currency": "EUR",
        "description": "Gin ijuuv sootugu hicpaf gijok bemvefho ozzo ameafevup bebvato sioza.",
        "executedAt": "1970-01-09T04:58:15.235Z",
        "paymentMethod": "CHECK",
        "status": "CANCELED",
        "title": "Covdaobu gerutfak iki.",
        "transactionAt": "1970-01-09T04:58:13.337Z",
        "transactionId": "a83c9d91-66fc-58d0-b297-4cd5e30790b6",
        "type": "PAYOUT",
        "updatedAt": "1970-01-11T23:03:39.408Z",
        "value": 1111
    },
    "retry": 0
}

const badEvent = {
    "eventId": "ac0e08c4-2be6-4937-b127-e06b33347ac7",
    "payload": {
        "bankAccountId": "e5871c96-38cd-5963-96e1-788d249a0e6e",
        "category": "TELECOM",
        "userId": "5928ec66-6764-5ebf-bfd9-f5c9d1f0dff9",
        "createdAt": "1970-01-11T23:03:31.560Z",
        "currency": "USD",
        "description": "Gin ijuuv sootugu hicpaf gijok bemvefho ozzo ameafevup bebvato sioza.",
        "executedAt": "1970-01-09T04:58:15.235Z",
        "paymentMethod": "CHECK",
        "status": "NOPE",
        "title": "Covdaobu gerutfak iki.",
        "transactionAt": "1970-01-09T04:58:13.337Z",
        "transactionId": "a83c9d91-66fc-58d0-b297-4cd5e30790b6",
        "type": "PAYOUT",
        "updatedAt": "1970-01-11T23:03:39.408Z",
        "value": "1111"
    },
    "retry": 0
}