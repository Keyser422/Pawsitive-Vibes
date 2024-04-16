CREATE TABLE users (
    id SERIAL NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
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
    owner_id INTEGER NOT NULL REFERENCES users("id") ON DELETE CASCADE
);

CREATE TABLE services (
    id SERIAL NOT NULL UNIQUE,
    service TEXT NOT NULL,
    picture_url TEXT NOT NULL,
    duration INTEGER NOT NULL,
    cost TEXT NOT NULL
);

CREATE TABLE testimonials (
    id SERIAL NOT NULL UNIQUE,
    rating INTEGER NOT NULL DEFAULT 5,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

