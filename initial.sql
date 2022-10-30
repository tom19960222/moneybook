create table moneybook
(
	id serial not null
		constraint moneybook_pk
			primary key,
	type varchar not null,
	price integer not null,
	time timestamp with time zone not null,
	remark text
);

alter table moneybook owner to postgres;

create table lending
(
    id        serial
        constraint lending_pk
            primary key,
    target    varchar                  not null,
    price     integer                  not null,
    content   text                     not null,
    remark    text                     not null,
    time      timestamp with time zone not null,
    is_payoff boolean default false    not null
);

alter table lending
    owner to postgres;

