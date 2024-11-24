const express = require("express");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");
const { getSingleProductReviews } = require("../controllers/reviewController");
const router = express.Router();

const adminOnly = [authenticateUser, authorizePermissions("admin")];

router.route("/").post(adminOnly, createProduct).get(getAllProducts);
router.route("/uploadImage").post(adminOnly, uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(adminOnly, updateProduct)
  .delete(adminOnly, deleteProduct);

router.route("/:id/reviews").get(getSingleProductReviews);
module.exports = router;
