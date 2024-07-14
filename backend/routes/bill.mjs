import express from 'express';
import ctrl from '../controllers/bill.mjs';
const router = express.Router();
// ici le / correspond à la route GET /bills/ (voir le index.mjs qui déclare l'import de ces routes avec app.use('/bills, billRoutes)
router.get('/', ctrl.getItems)

// ici la route GET /bills/:id
router.get('/:id', ctrl.getItem)

// ici la route PATCH /bills/:id
router.patch('/:id', ctrl.patchItem)

// ici la route POST /bills/
router.post('/', ctrl.postItem)

// ici la route PATCH /bills/:id
router.delete('/:id', ctrl.deleteItem)

export { router };

