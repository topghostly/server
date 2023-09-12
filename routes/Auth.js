const express = require('express')
const {loginControls, registerControls} = require('../controllers/AuthController')

const router = express.Router()

router.post('/login', loginControls)
router.post('/register', registerControls)

module.exports = router