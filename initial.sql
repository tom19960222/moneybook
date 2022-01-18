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

