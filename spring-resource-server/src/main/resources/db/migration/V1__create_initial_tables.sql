CREATE TABLE app_user (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(512),
    roles TEXT[] NOT NULL DEFAULT ARRAY['CUSTOMER']::TEXT[],
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expired BOOLEAN DEFAULT FALSE,
    locked BOOLEAN DEFAULT FALSE,
    credentials_expired BOOLEAN DEFAULT FALSE,
    disabled BOOLEAN DEFAULT FALSE
);


CREATE TABLE persons (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(64),
    CONSTRAINT fk_app_user
        FOREIGN KEY (id)
        REFERENCES app_user(id)
        ON DELETE CASCADE
);

CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    is_adult BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_person
        FOREIGN KEY (id)
        REFERENCES persons(id)
        ON DELETE CASCADE
);

CREATE TABLE barbers (
    id INTEGER PRIMARY KEY,
    CONSTRAINT fk_person
        FOREIGN KEY (id)
        REFERENCES persons(id)
        ON DELETE CASCADE
);

CREATE TABLE orders (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    barber_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    status VARCHAR(64),
    order_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_barber
        FOREIGN KEY (barber_id)
        REFERENCES barbers(id),
    CONSTRAINT fk_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(id)
        ON DELETE CASCADE
);

CREATE TABLE oauth2_client (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    client_id VARCHAR(255) NOT NULL UNIQUE,
    client_secret VARCHAR(255) NOT NULL,
    authorization_grand_types TEXT[] NOT NULL,
    authentication_methods TEXT[] NOT NULL,
    redirect_uris TEXT[] NOT NULL,
    scopes TEXT[] NOT NULL,
    required_proof_key BOOLEAN DEFAULT TRUE,
    client_id_issued_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
