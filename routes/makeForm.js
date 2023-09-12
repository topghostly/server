const express = require('express')

const router = express.Router()

router.get('/form', (req, res)=>{
    res.json({mssg: "this is the creatio page"})
})

module.exports = router