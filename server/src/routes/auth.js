const express = require("express");
const { handleUserLogin } = require("../controllers/auth");

const router = express.Router();

router.post("/login", (req, res) => {
    const {  email, password } = req.body;
  
    if ( !email || !password ) {
      return res.status(400).json({error: true, message : "Missing required fields"});
    }
  
    handleUserLogin(req, res);
  });

  module.exports = router;