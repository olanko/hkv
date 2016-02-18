/* 
CREATE EXTENSION dblink;
*/

select * from product ;

select * from transfer ;

/* 
TRUNCATE TABLE transfer;
*/

--insert into transfer
select * from dblink('dbname=hkv2 password=postgres',
	'select id, fromstorageid, productid, transfertime, inserttime, "user", absolute, relative, tostorageid, comment, type from transfer;')
	f(id bigint, fromstorageid bigint, productid bigint, transfertime timestamp with time zone, inserttime timestamp with time zone,
	"user" integer,
	absolute numeric(10,3), relative numeric(10,3), tostorageid bigint, comment character varying, type integer);

select * from product ;

select * from transfer ;

/* 
TRUNCATE TABLE product, transfer, productdefaultqtys;
*/

insert into product
select * from dblink('dbname=hkv2 password=postgres',
	'select id, name, qtys, active, unitqty from product;')
	f(id bigint, name character varying, qtys character varying, active boolean, unitqty integer);

insert into transfer
select * from dblink('dbname=hkv2 password=postgres',
	'select id, fromstorageid, productid, transfertime, inserttime, "user", absolute, relative, tostorageid, comment, type from transfer;')
	f(id bigint, fromstorageid bigint, productid bigint, transfertime timestamp with time zone, inserttime timestamp with time zone,
	"user" integer,
	absolute numeric(10,3), relative numeric(10,3), tostorageid bigint, comment character varying, type integer);
