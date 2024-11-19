const createProduct = (req, res) => {
  res.send("Create Product Function Called");
};
const getAllProducts = (req, res) => {
  res.send("Get All Products Function Called");
};
const getSingleProduct = (req, res) => {
  res.send("Get Single Product Function Called");
};
const updateProduct = (req, res) => {
  res.send("Update Product Function Called");
};
const deleteProduct = (req, res) => {
  res.send("Delete Product Function Called");
};
const uploadImage = (req, res) => {
  res.send("Upload Image Function Called");
};
module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
