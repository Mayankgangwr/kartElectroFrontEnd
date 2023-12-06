import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import productViewModel from './ProductViewModel';
import Nav from '../../Assets/Navbar/Nav';

const ProductList: React.FC = observer(() => {
  useEffect(() => {
    // Fetch products when the component mounts
    productViewModel.fetchProducts();
  }, []);
 console.log(productViewModel.products);
  return (
    <div>
      <Nav></Nav>
      <h1>Product List</h1>
      <ul>
        {productViewModel.products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px' }} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ProductList;
