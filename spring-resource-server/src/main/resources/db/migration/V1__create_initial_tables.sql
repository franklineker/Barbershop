CREATE TABLE app_user (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(512),
    roles TEXT[] NOT NULL DEFAULT ARRAY['CUSTOMER']::TEXT[],
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expired BOOLEAN DEFAULT FALSE,
    locked BOOLEAN DEFAULT FALSE,
    credentials_expired BOOLEAN DEFAULT FALSE,
    disabled BOOLEAN DEFAULT FALSE,
    CONSTRAINT pk_user PRIMARY KEY (id),
    CONSTRAINT unique_username UNIQUE (username)
);

CREATE TABLE persons (
    id INTEGER,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255),
    CONSTRAINT pk_person PRIMARY KEY (id),
    CONSTRAINT fk_app_user
        FOREIGN KEY (id)
        REFERENCES app_user(id)
        ON DELETE CASCADE
);

CREATE TABLE customers (
    id INTEGER,
    is_adult BOOLEAN DEFAULT TRUE,
    CONSTRAINT pk_customer PRIMARY KEY (id),
    CONSTRAINT fk_person
        FOREIGN KEY (id)
        REFERENCES persons(id)
        ON DELETE CASCADE
);

CREATE TABLE barbers (
    id INTEGER,
    status VARCHAR(255),
    CONSTRAINT pk_barber PRIMARY KEY (id),
    CONSTRAINT fk_person
        FOREIGN KEY (id)
        REFERENCES persons(id)
        ON DELETE CASCADE
);

CREATE TABLE orders (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    barber_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    status VARCHAR(255),
    order_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_order PRIMARY KEY (id),
    CONSTRAINT fk_barber
        FOREIGN KEY (barber_id)
        REFERENCES barbers(id),
    CONSTRAINT fk_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(id)
        ON DELETE CASCADE
);

CREATE TABLE oauth2_client (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    client_id VARCHAR(255) NOT NULL,
    client_secret VARCHAR(255) NOT NULL,
    authorization_grand_types TEXT[] NOT NULL,
    authentication_methods TEXT[] NOT NULL,
    redirect_uris TEXT[] NOT NULL,
    scopes TEXT[] NOT NULL,
    required_proof_key BOOLEAN DEFAULT TRUE,
    client_id_issued_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_oauth2_client PRIMARY KEY (id),
    CONSTRAINT unique_client_id UNIQUE (client_id)
);
