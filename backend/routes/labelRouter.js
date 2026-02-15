const express = require("express");
const router = express.Router();
const labelController = require("../controllers/labelController");

router.get("/", labelController.getLabels);
router.post("/", labelController.addOrUpdateLabel);

module.exports = router;
