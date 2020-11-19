import uploadFile from "../../middleware/uploadFile";
import getUsages from "./getUsages";
import postUsages from "./postUsages";
let express = require("express");
let router = express.Router();

router.get("/", getUsages);
router.post("/", uploadFile.single("file"), postUsages);

export default router;
