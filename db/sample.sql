INSERT INTO pricing(offpeak_price, peak_time_start, peak_time_end, peak_price)
SELECT 0.2083, '07:00', '23:00', 0.24;

-- INSERT INTO usage (date_and_time, consumption, reading_quality, provider_id)
-- SELECT '2005-06-20 21:00:00', 0, 'Actual', 1;


INSERT INTO provider (name, pricing_id)
SELECT 'Momentum', 1;

DROP TABLE usage CASCADE;
CREATE TABLE IF NOT EXISTS usage (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    -- id SERIAL PRIMARY KEY,
    date_and_time TIMESTAMP,
    consumption MONEY,
    reading_quality TEXT,
    provider_id INTEGER REFERENCES provider(id)
);
