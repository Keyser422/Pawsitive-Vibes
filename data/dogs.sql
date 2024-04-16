CREATE TABLE users (
    id SERIAL NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone_number TEXT NOT NULL,
    bio TEXT DEFAULT NULL,
    date_created DATETIME NOT NULL
);

CREATE TABLE pets (
    id SERIAL NOT NULL UNIQUE,
    dog_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    for_sale BOOLEAN NOT NULL DEFAULT FALSE,
    price INTEGER DEFAULT NULL,
);
