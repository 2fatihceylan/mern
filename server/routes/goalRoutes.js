const express = require('express');
const router = express.Router();

const goalController = require('../controllers/goalController');

const {validateToken} = require('../middlewares/JWT')

router.get('/',validateToken,goalController.getGoals)
router.post('/',validateToken,goalController.setGoal)
router.put('/:id',validateToken,goalController.updateGoal)
router.delete('/:id',validateToken,goalController.deleteGoal)





module.exports = router;