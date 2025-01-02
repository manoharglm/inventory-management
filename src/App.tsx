import "./App.css";
import Dashboard from "./components/Dashboard";
import { ProductProvider } from "./context/ProductContext";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProductProvider>
        <Dashboard />
      </ProductProvider>
    </ThemeProvider>
  );
}

export default App;
