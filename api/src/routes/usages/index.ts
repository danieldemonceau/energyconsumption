import uploadFile from '../../middleware/uploadFile';
import getUsages from './getUsages';
import postUsages from './postUsages';
const express = require('express');
const router = express.Router();

router.get('/', getUsages);
router.post('/', uploadFile.single('file'), postUsages);

export default router;
