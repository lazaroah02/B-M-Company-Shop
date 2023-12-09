import './index.css'
import { validateProductNameLength } from '../../utils/validateProductNameLength'

function ProductCard({id, product_name, precio, product_img1}){
    return(
       <div className="product-card" id = {id} >
        <div className = 'img-container'>
            <img loading = "lazy" src={product_img1}  alt={product_name}/>
        </div>
        <div className = "name-and-price-container">
          <p className="product-card-name">{validateProductNameLength(product_name)}</p>
          <p className="card-text price">${precio}</p>
        </div>
       </div>

    )
}

export default ProductCard