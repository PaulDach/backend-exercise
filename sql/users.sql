create table users
(
    user_id text not null
        constraint users_pk
            primary key
);

create unique index users_user_id_uindex
    on users (user_id);

