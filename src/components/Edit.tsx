import { useEffect, useState } from "react";
import { Product } from "../types/types";
import { IconButton, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Edit: React.FC<{
  showModal: boolean;
  product: Product;
  closeModal: () => void;
  updateProduct: (updatedProduct: Product) => void;
}> = ({ showModal, product, closeModal, updateProduct }) => {
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [value, setValue] = useState(product.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct: Product = {
      ...product,
      category,
      price,
      quantity,
      value,
    };
    updateProduct(updatedProduct);
    closeModal();
  };

  useEffect(() => {
    const price = product.price.replace("$", "") || "0";
    const value = product.value.replace("$", "") || "0";
    setCategory(product.category);
    setPrice(price);
    setQuantity(product.quantity);
    setValue(value);
  }, [product]);

  return (
    <div className="app">
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit product</h2>
              <IconButton
                onClick={closeModal}
                aria-label="close modal"
                color="primary"
              >
                <CloseIcon />
              </IconButton>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <p>{product.name}</p>

              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <TextField
                label="Price"
                type="number"
                variant="outlined"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <TextField
                label="Quantity"
                type="number"
                variant="outlined"
                fullWidth
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <TextField
                label="Value"
                type="number"
                variant="outlined"
                fullWidth
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div className="modal-actions">
                <Button
                  type="submit"
                  className="save-button"
                  variant="text"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="save-button"
                  variant="contained"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
