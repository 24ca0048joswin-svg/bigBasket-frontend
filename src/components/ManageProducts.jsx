import { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import ProductCard from './ProductCard';
import axios from 'axios';

function ManageProducts() {

  const [products, setProducts] = useState([]);

  async function fetchData() {
    try {
      const res = await axios.get("http://localhost:3000/admin/displayProducts");
      const data = res.data;
      setProducts([]);
      setProducts([...data.products])
    } catch (err) {
      console.log(`An error occured: ${err}`)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
    return (
        <>
            <AdminNav/>
            <table className='product-display'>
                <thead>
                    <tr>
                        <td className='bold'>Product image</td>
                        <td className='bold'>Product name</td>
                        <td className='bold'>Category</td>
                        <td className='bold'>Original Price</td>
                        <td className='bold'>Selling Price</td>
                        <td className='bold'>Is Har Din Sasta</td>
                        <td className='bold' colSpan="2">Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => ((
                        <tr key={index}>
                            <ProductCard
                                name={product.title}
                                id={product._id}
                                imageUrl={product.productUrl}
                                discountPercent={product.discountPercentage}
                                currentPrice={product.sellingPrice}
                                originalPrice={product.originalPrice}
                                category={product.category}
                                isHarDinSasta={product.isHarDinSasta}
                                fetchProduct={fetchData}
                            />
                        </tr>
                    )))}
                </tbody>
            </table>
        </>
    );
}

export default ManageProducts;