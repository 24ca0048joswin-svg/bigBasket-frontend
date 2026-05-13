import { useState, useEffect } from 'react';
// import SmartBasketCard from './components/SmartBasketCard.jsx';
import Footer from './components/Footer.jsx';
import Carousel from './components/Carousel.jsx';
import DisplayProducts from './components/DisplayProducts.jsx';
// import Items from './components/Items.jsx';
import axios from 'axios';
import Toast from './utils/Toast.jsx';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [fetchedProducts, setFetchedProducts] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/product/displayProducts`, {});
    setProducts(res.data.products);
    setFetchedProducts(true);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <Toast isShow={loading}/>
      <div className="box">
        <div className="smart-basket-section">
          <div className="header">
            <h2>My Smart Basket</h2>
            {/* <div className="controls">
              <button>View All</button>
              <button>{'<'}</button>
              <button>{'>'}</button>
            </div> */}
          </div>

          <div className="cards-container">
            {fetchedProducts && <DisplayProducts products={products} />}
          </div>
        </div>
      </div>
      <Carousel />
      <Footer />
    </>
  );
}


