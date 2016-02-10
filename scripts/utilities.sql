select * from product;

delete from product where id in (25, 26, 27);

select * from transfer;

delete from transfer WHERE id in (213, 214, 216);

select * from storage;


insert into storage (name, def, type) values ('Olvi', false, 1);
insert into storage (name, def, type) values ('SAT', false, 1);
insert into storage (name, def, type) values ('Koff', false, 1);