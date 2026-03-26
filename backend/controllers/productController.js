import Product from "../models/Product.js";

// ➕ CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    console.log("FILE:", req.file);
    const product = new Product({
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      price: req.body.price,

      // 🔥 Cloudinary URL save
      image: req.file ? req.file.path : "",
    });

    const saved = await product.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📥 GET PRODUCTS + SEARCH
export const getProducts = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
        ],
      };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.json(products);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    console.log("FILE:", req.file);
    let updateData = {
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      price: req.body.price,
    };

    // 🔥 New image upload (Cloudinary)
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted ✅" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};