select * from transfer;


select * from product;

update product set active = true;

truncate table transfer;

insert into transfer (fromstorageid, tostorageid, productid, transfertime, "user", absolute, relative, comment, type)
	values (null, 0, 0, '2016-01-02 12:00', 0, 168, 0, 'Määrä alussa', 3);
insert into transfer (fromstorageid, tostorageid, productid, transfertime, "user", absolute, relative, comment, type)
	values (0, 1, 0, '2016-01-02 13:00', 0, 0, 48, '', 0);
insert into transfer (fromstorageid, tostorageid, productid, transfertime, "user", absolute, relative, comment, type)
	values (0, 2, 0, '2016-01-02 14:00', 0, 0, 48, '', 0);
insert into transfer (fromstorageid, tostorageid, productid, transfertime, "user", absolute, relative, comment, type)
	values (null, 0, 0, '2016-01-02 15:00', 0, 0, 120, 'Olvi', 1);
insert into transfer (fromstorageid, tostorageid, productid, transfertime, "user", absolute, relative, comment, type)
	values (0, 1, 0, '2016-01-02 16:00', 0, 0, 24, '', 0);
insert into transfer (fromstorageid, tostorageid, productid, transfertime, "user", absolute, relative, comment, type)
	values (null, 0, 0, '2016-01-02 17:00', 0, 0, -120, '', 2);




