import Loader from "../Loader";
import ProductCard from "../ProductCard";
import { useState, useEffect, useContext } from "react";
import {getProducts} from '../../services/getProducts'
import "./index.css";
import QueryFiltersContext from "../../context/filtersContext";
import ReactPaginate from 'react-paginate';
import {getActiveFilter} from '../../utils/getActiveFilter'
import RightArrow from '../../assets/chevron-right-24.svg'
import LeftArrow from '../../assets/chevron-left-24.svg'


export default function ProductsGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numOfProducts, setNumOfProducts] = useState(0)
  const {queryFilters, setFilter} = useContext(QueryFiltersContext)

  //get products of store
  useEffect(() => {
    setLoading(true);
    getProducts(queryFilters)
      .then((data) => {
        setProducts(data.results);
        setNumOfProducts(data.count)
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setNumOfProducts(0)
      });
  }, [queryFilters]);

  return (
    <>
      {loading ? (
        <section className="products-loader-container">
            <div>
                <Loader />
            </div>
        </section>
      ) : 
      <section>
        <div className="products-grid">
          {products !== null && products !== undefined ? (
            <>
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))
              ) : (
                <div className="not-found-message">
                  <strong>No hay productos</strong>
                </div>
              )}
            </>
          ) : (
            <div className="not-found-message">
              <strong>No hay productos</strong>
            </div>
          )}
        </div>
        <ReactPaginate
          className = {"paginator"}
          activeClassName = {"page-active"}
          pageClassName = {"page"}
          nextLinkClassName = {"next-page-button"}
          previousLinkClassName = {"previous-page-button"}
          breakClassName = {'page'}
          pageCount = {Math.ceil(numOfProducts/9)}
          pageRangeDisplayed = {3}
          previousLabel = {<><img src = {LeftArrow}/><span>Anterior</span></>}
          nextLabel = {<><span>Siguiente</span><img src = {RightArrow}/></>}
          breakLabel = {"..."}
          marginPagesDisplayed = {1}
          onPageChange={(page) => {
            document.querySelector("body").scrollIntoView({top:0})
            setFilter({name:"page", value:page.selected + 1})
          }}
          disableInitialCallback = {true}
          initialPage={parseInt(getActiveFilter("page")) - 1}
        />    
      </section>
      }
    </>
  );
}
