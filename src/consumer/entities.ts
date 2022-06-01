import {Equals, IsDate, IsDefined, IsIn, IsNumber, IsString, ValidateNested} from "class-validator";
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

class Transaction {
    @IsDefined()
    @IsString()
    bankAccountId!: string

    @IsString()
    category!: string

    @IsDefined()
    @IsString()
    userId!: string

    @IsDate()
    @Type(() => Date)
    createdAt!: Date

    @Equals('EUR')
    currency!: string

    @IsString()
    description!: string

    @IsDate()
    @Type(() => Date)
    executedAt!: Date

    paymentMethod!: string

    @IsString()
    status!: string

    @IsString()
    title!: string

    @IsDate()
    @Type(() => Date)
    transactionAt!: Date

    @IsString()
    transactionId!: string

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

export class ISS {
    @IsString()
    ok!: string
}