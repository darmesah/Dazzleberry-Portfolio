const express = require("express");
const { body } = require("express-validator");

const isAuth = require("../middleware/is-auth");
const adminController = require("../controllers/admin");

const router = express.Router();

router.post("/login", adminController.login);

router.post(
  "/workItem",
  [
    body("title").trim().isLength({ min: 2 }),
    body("workDesc").trim().isLength({ min: 2 }),
    body("service").custom((value, { req }) => {
      return value.length > 0;
    }),
    body("description").custom((value, { req }) => {
      return value.length > 0;
    }),
    body("industry").custom((value, { req }) => {
      return value.length > 0;
    }),
  ],
  isAuth,
  adminController.addWorkItem
);

router.patch(
  "/workitem/:id",
  [
    body("title").trim().isLength({ min: 2 }),
    body("workDesc").trim().isLength({ min: 2 }),
    body("description").custom((value, { req }) => {
      return value.length > 0;
    }),
  ],
  isAuth,
  adminController.updateWorkItem
);

router.delete("/workitem/:id", isAuth, adminController.deleteWorkItem);

module.exports = router;
