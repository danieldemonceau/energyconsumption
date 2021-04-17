
CREATE OR REPLACE TRIGGER versioning_trigger  
AFTER INSERT OR UPDATE OR DELETE
ON table_name  
REFERENCING OLD AS o NEW AS n
FOR EACH ROW
WHEN (OLD.* IS DISTINCT FROM NEW.*)
DECLARE 
   Declaration-statements 
BEGIN  
   Executable-statements 
EXCEPTION 
   Exception-handling-statements 
END;