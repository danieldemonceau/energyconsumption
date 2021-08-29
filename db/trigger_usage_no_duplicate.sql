DROP FUNCTION IF EXISTS trigger_usage_no_duplicate() CASCADE;
CREATE FUNCTION trigger_usage_no_duplicate() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
DECLARE
    exists BOOLEAN;
BEGIN

    SELECT INTO exists ((u.date_and_time = NEW.date_and_time))
    FROM usage u
    WHERE (u.date_and_time = NEW.date_and_time);

    IF COALESCE(exists, FALSE) THEN
        RETURN NULL;
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_usage_no_duplicate
BEFORE INSERT
ON usage
FOR EACH ROW
EXECUTE PROCEDURE trigger_usage_no_duplicate();
