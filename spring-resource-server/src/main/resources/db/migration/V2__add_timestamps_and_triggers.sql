CREATE OR REPLACE FUNCTION set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        NEW.created_at = CURRENT_TIMESTAMP;
        NEW.updated_at = CURRENT_TIMESTAMP;
    ELSIF (TG_OP = 'UPDATE') THEN
        NEW.updated_at = CURRENT_TIMESTAMP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_timestamp_trigger_app_user
BEFORE INSERT OR UPDATE ON app_user
FOR EACH ROW
EXECUTE FUNCTION set_timestamp();

CREATE OR REPLACE TRIGGER update_timestamp_trigger_orders
BEFORE INSERT OR UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION set_timestamp();

CREATE OR REPLACE TRIGGER update_timestamp_trigger_customers
BEFORE INSERT OR UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION set_timestamp();
