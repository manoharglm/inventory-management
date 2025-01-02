import React, { useState, useContext } from "react";
import Edit from "./Edit";
import Switch from "./CustomSwitch";
import { Product } from "../types/types";
import { ProductContext } from "../context/ProductContext";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CategoryIcon from "@mui/icons-material/Category";

const StyledChip = styled(Chip)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
}));

const Dashboard: React.FC = () => {
  const { products, loading, error, dispatch } = useContext(ProductContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isUser, setIsUser] = useState(false);

  const totalProducts = products.length;
  const totalValue = products.reduce(
    (acc, product) => acc + parseFloat(product.value.replace("$", "") || "0"),
    0
  );
  const outOfStock = products.filter(
    (product) => product.quantity === 0
  ).length;
  const categories = new Set(products.map((product) => product.category)).size;

  const updateProduct = (updatedProduct: Product) => {
    dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const deleteProduct = (name: string) => {
    dispatch({ type: "DELETE_PRODUCT", payload: name });
  };

  const disableProduct = (name: string) => {
    dispatch({ type: "DISABLE_PRODUCT", payload: name });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  return (
    <div className="dashboard">
      <Switch setIsUser={setIsUser} />
      <h1 className="title">Inventory Stats</h1>
      <div className="stats-container">
        <div className="stat">
          <ShoppingCartIcon fontSize="large" />
          <div className="stat-text">
            <span>Total Products</span>
            <h1>{totalProducts}</h1>
          </div>
        </div>
        <div className="stat">
          <CurrencyExchangeIcon fontSize="large" />
          <div className="stat-text">
            <span>otal Store Value</span>
            <h1>${totalValue.toLocaleString()}</h1>
          </div>
        </div>
        <div className="stat">
          <RemoveShoppingCartIcon fontSize="large" />
          <div className="stat-text">
            <span>Out of Stock</span>
            <h1>{outOfStock}</h1>
          </div>
        </div>
        <div className="stat">
          <CategoryIcon fontSize="large" />
          <div className="stat-text">
            <span>No of Categories</span>
            <h1>{categories}</h1>
          </div>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <StyledChip label="Name" />
              </TableCell>
              <TableCell>
                <StyledChip label="Category" />
              </TableCell>
              <TableCell>
                <StyledChip label="Price" />
              </TableCell>
              <TableCell>
                <StyledChip label="Quantity" />
              </TableCell>
              <TableCell>
                <StyledChip label="Value" />
              </TableCell>
              <TableCell align="center">
                <StyledChip label="Actions" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              const disabled = isUser || product.disabled;

              return (
                <TableRow key={product.name}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.value}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => openEditModal(product)}
                      disabled={disabled}
                      aria-label="edit"
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => disableProduct(product.name)}
                      disabled={isUser}
                      aria-label="visibility"
                      color="secondary"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteProduct(product.name)}
                      disabled={disabled}
                      aria-label="delete"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedProduct && (
        <Edit
          showModal={showEditModal}
          product={selectedProduct}
          closeModal={closeEditModal}
          updateProduct={updateProduct}
        />
      )}
    </div>
  );
};

export default Dashboard;
