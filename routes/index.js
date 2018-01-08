const express = require("express");
const router = express.Router();
const demoController = require("../controllers/demoController");
const patientController = require("../controllers/patientController");
const estimateController = require("../controllers/estimateController");

/* GET home page. */
router.get("/", demoController.demo);
/* POST Demographic Details and add to DB */
router.get("/patient", patientController.lookup);
router.post("/patient", patientController.insurance);
/* POST Insurance ID and get estimate */
router.get("/estimate", patientController.lookup);
router.post("/estimate", estimateController.magic);

module.exports = router;
