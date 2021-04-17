DROP TABLE pricing CASCADE;
CREATE TABLE IF NOT EXISTS pricing (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    offpeak_price MONEY,
    peak_time_start TIME,
    peak_time_end TIME,
    peak_price MONEY,
    sys_period TSTZRANGE NOT NULL DEFAULT TSTZRANGE(current_timestamp, null)
);
CREATE TABLE pricing_history (LIKE pricing);

DROP TABLE provider CASCADE;
CREATE TABLE IF NOT EXISTS provider (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
    pricing_id INTEGER REFERENCES pricing(id),
    sys_period TSTZRANGE NOT NULL DEFAULT TSTZRANGE(current_timestamp, null)
);
CREATE TABLE provider_history (LIKE provider);

DROP TABLE usage CASCADE;
CREATE TABLE IF NOT EXISTS usage (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    date_and_time TIMESTAMP WITH TIME ZONE,
    consumption DECIMAL,
    reading_quality TEXT,
    provider_id INTEGER REFERENCES provider(id)
);

CREATE TRIGGER versioning_trigger
BEFORE INSERT OR UPDATE OR DELETE ON provider
FOR EACH ROW EXECUTE PROCEDURE versioning(
  'sys_period', 'provider_history', true, true
);
