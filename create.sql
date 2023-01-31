drop table cccat10.coupon;
drop table cccat10.product;
drop schema cccat10;
create schema cccat10;

create table cccat10.product (
	id_product integer,
	description text,
	price numeric
);

insert into cccat10.product (id_product, description, price) values (1, 'A', 1000);
insert into cccat10.product (id_product, description, price) values (2, 'B', 5000);
insert into cccat10.product (id_product, description, price) values (3, 'C', 30);

create table cccat10.coupon (
	code text,
	percentage numeric
);

insert into cccat10.coupon (code, percentage) values ('VALE20', 20);
