import { useState, useEffect } from 'react';
import SmartBasketCard from './components/SmartBasketCard.jsx';
import Footer from './components/Footer.jsx';
import Carousel from './components/Carousel.jsx';
import DisplayProducts from './components/DisplayProducts.jsx';
import Items from './components/Items.jsx';
import axios from 'axios';

import beetroot from './assets/beetroot.jpg';
import capsicum from './assets/capsicum.jpg';
import coriander from './assets/coriander.jpg';
import ladiesFinger from './assets/ladies-finger.jpeg';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [fetchedProducts, setFetchedProducts] = useState(false);

  async function fetchData() {
    const res = await axios.post("http://localhost:3000/user/displayProducts", {});
    setProducts(res.data.products);
    setFetchedProducts(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
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


