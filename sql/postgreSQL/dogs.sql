CREATE TABLE public.dog (
	id serial4 NOT NULL,
	dogname varchar(32) NOT NULL,
	dogType varchar(32) NULL,
	dogAge varchar(32) NULL,
	site varchar(32) NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

INSERT INTO dog (dogname,dogType,dogAge,site) VALUES
	('John', 'Rabu','5','ST')
INSERT INTO dog (dogname,dogType,dogAge,site) VALUES
	('Candy', 'Rabu','2','TM')
INSERT INTO dog (dogname,dogType,dogAge,site) VALUES
	('Apple', 'Rabu','2','ST')