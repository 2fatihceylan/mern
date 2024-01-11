const express = require('express');
const router = express.Router();

const goalController = require('../controllers/goalController');


router.get('/',goalController.getGoals)
router.post('/',goalController.setGoal)
router.put('/:id',goalController.updateGoal)
router.delete('/:id',goalController.deleteGoal)





module.exports = router;