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