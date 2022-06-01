create table transactions
(
    bank_account_id text
        references bank_accounts,
    category        text,
    user_id         text
        references users,
    created_at      integer,
    currency        text,
    description     text,
    executed_at     integer,
    payment_method  text,
    status          text,
    title           text,
    transaction_at  integer,
    transaction_id  text not null
        constraint transactions_pk
            primary key,
    type            text,
    updated_at      integer,
    value           integer
);

create unique index transactions_transaction_id_uindex
    on transactions (transaction_id);

