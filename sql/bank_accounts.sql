create table bank_accounts
(
    bank_account_id text not null
        constraint bank_accounts_pk
            primary key,
    user_id         text not null
        references users,
    amount          integer default 0 not null
);

create unique index bank_accounts_bank_account_id_uindex
    on bank_accounts (bank_account_id);

