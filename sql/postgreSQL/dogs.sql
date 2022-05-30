CREATE TABLE public.dog (
	id serial4 NOT NULL,
	dogname varchar(32) DEFAULT 'Unknown',
	dogtype varchar(32) DEFAULT 'Unknown',
	dogage varchar(32) DEFAULT 'Unknown',
	site varchar(32) DEFAULT 'Unknown',
  gender varchar(10) DEFAULT 'Unknown',
  imgurl varchar(2048),
  likes varchar(32),
	CONSTRAINT dog_pkey PRIMARY KEY (id)
);