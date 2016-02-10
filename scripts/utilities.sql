select * from product;

update product set unitqty = 24 where qtys = '[{"n":"24","q":24},{"n":"2x24","q":48},{"n":"3x24","q":72}]';
update product set unitqty = 6 where qtys = '[{"n":"6","q":6},{"n":"2x6","q":12},{"n":"3x6","q":18}]';
update product set name = 'Fizz Päärynä tölkki 0,33l' where id = 2;

delete from product where id in (25, 26, 27);

select * from transfer where fromstorageid = 0 or tostorageid = 0;

delete from transfer WHERE id in (251, 254, 256);

select * from storage;

delete from storage where id = 4;

update transfer set fromstorageid = 11 where fromstorageid = 4;



insert into storage (name, def, type) values ('Respa', false, 0);

insert into storage (name, def, type) values ('Olvi', false, 1);
insert into storage (name, def, type) values ('SAT', false, 1);
insert into storage (name, def, type) values ('Koff', false, 1);

insert into storage (name, def, type) values ('Muu', false, 1);


insert into storage (name, def, type) values ('Hävikki', false, 2);

insert into storage (name, def, type) values ('Myynti', false, 3);