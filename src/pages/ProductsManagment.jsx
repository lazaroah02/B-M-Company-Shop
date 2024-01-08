import { useState, useContext, useRef } from "react";
import "./pagesStyles/ProductsManagment.css";
import "primeicons/primeicons.css";
import BackArrow from "../assets/products-managment-back-icon.svg";
import ProductsManagmentFiltersBar from "../components/ProductsManagmentComponents/ProductsManagmentFiltersBar";
import ProductList from "../components/ProductsManagmentComponents/ProductList";
import QueryFiltersContext from "../context/filtersContext";
import { useManageProducts } from "../hooks/useManageProducts";
import ProductForm from "../components/ProductsManagmentComponents/ProductForm";
import { Toast } from "primereact/toast";

function ProductsManagment() {
  const toast = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productFormProperties, setProductFormProperties] = useState({
    show:false,
    initialValues:null,
    disabled:false,
    creatingMode:true
  })
  const { searchParams, setFilter, getActiveFilter, removeAllFilters } =
    useContext(QueryFiltersContext);
  const {
    products,
    loading,
    numOfProducts,
    handleDeleteProduct,
    handleDeleteMultipleProducts,
    setUpdateProducts
  } = useManageProducts({ searchParams: searchParams, toastRef: toast, setSelectedProducts:setSelectedProducts });

  return (
    <section className="products-managment-page">
      <Toast ref={toast} position="bottom-center" />
      <section className="back-button-title-container">
        <button
          className="products-managment-go-back-button btn-general-styles"
          onClick={() => history.back()}
        >
          <img src={BackArrow} />
        </button>
        <h3>Gestión de Productos</h3>
      </section>
      <ProductsManagmentFiltersBar 
        handleDeleteMultipleProducts = {handleDeleteMultipleProducts}
        selectedProducts={selectedProducts}
        toastRef={toast}
        setUpdateProducts={setUpdateProducts}
        removeAllFilters = {removeAllFilters}
        setProductFormProperties={setProductFormProperties}
        />
      <ProductList
        products={products}
        numOfProducts={numOfProducts}
        setFilter={setFilter}
        getActiveFilter={getActiveFilter}
        loading={loading}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        handleDeleteProduct={handleDeleteProduct}
      />
      <ProductForm productFormProperties = {productFormProperties} setProductFormProperties={setProductFormProperties}/>
    </section>
  );
}

export default ProductsManagment;
