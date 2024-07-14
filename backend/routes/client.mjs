import express from 'express';
import ctrl from '../controllers/client.mjs';
const router = express.Router();

router.get('/', ctrl.getItems)

router.get('/:id', ctrl.getItem)

router.patch('/:id', ctrl.patchItem)

router.post('/', ctrl.postItem)

router.delete('/:id', ctrl.deleteItem)

export { router };

