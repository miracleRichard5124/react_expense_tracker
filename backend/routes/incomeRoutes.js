const express = require("express");

const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} = require("../controllers/incomeController.js");
const {protect} = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.delete("/:id", protect, deleteIncome);
router.get("/downloadExcel", protect, downloadIncomeExcel);

module.exports = router;