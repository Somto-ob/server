-- Users Table 
create table tok9jaUsers(
    user_id UUID primary key DEFAULT uuid_generate_v4(),
    user_name VARCHAR(225) NOT NULL,
    user_email varchar (225) unique not null,
    user_password varchar (255) not null,
    created_at date default current_date
);

--Airtime balances
CREATE TABLE balance(
    id serial primary key,
    airtime_balance NUMERIC,
    data_balance NUMERIC
);

--Fake test user 

INSERT INTO tok9jaUsers (user_name, user_email,
user_password) VALUES ('Jide1',
'Jide@gmail.com', 'Yamarita123');
