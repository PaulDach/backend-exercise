import {Equals, IsDate, IsDefined, IsIn, IsNumber, IsObject, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export interface EventDTO {
    eventId: string;
    payload: any;
    retry: number;
}

export class Event {
    @IsDefined()
    @IsString()
    eventId!: string

    @IsDefined()
    @ValidateNested()
    @Type(() => Transaction)
    payload!: Transaction

    @IsDefined()
    @IsNumber()
    retry!: number
}

export class Transaction {
    @IsDefined()
    @IsString()
    bankAccountId!: string

    @IsDefined()
    @IsString()
    category!: string

    @IsDefined()
    @IsString()
    userId!: string

    @IsDefined()
    @IsDate()
    @Type(() => Date)
    createdAt!: Date

    @Equals('EUR')
    currency!: string

    @IsDefined()
    @IsString()
    description!: string

    @IsDate()
    @Type(() => Date)
    executedAt!: Date

    @IsDefined()
    @IsIn(["CARD", "CHECK", "DIRECT_DEBIT", "TRANSFER"])
    paymentMethod!:
        string

    @IsString()
    @IsIn(["PENDING", "CANCELED", "VALIDATED"])
    status!: string

    @IsString()
    title!: string

    @IsDate()
    @Type(() => Date)
    transactionAt!: Date

    @IsString()
    transactionId!: string

    @IsString()
    @IsIn(["PAYIN", "PAYOUT"])
    type!: string

    @IsDate()
    @Type(() => Date)
    updatedAt!: Date

    @IsNumber()
    value!: number
}

export class User {
    userId!: string
    transactions?: Transaction[]
}

export class BankAccount {
    bankAccountId!: string
    userId!: string
    amount!: number
    transactions?: Transaction[]
}