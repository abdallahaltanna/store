import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { productsActions } from './store/products_slice';
import { products_url as url } from './utils/constants';
import axios from 'axios';
import { countCartTotal } from './store/cart_slice';

import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  AuthWrapper,
} from './pages';

function App() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const fetchProducts = async (url) => {
    dispatch(productsActions.productsBegin());
    try {
      const response = await axios.get(url);
      const productsData = response.data;
      dispatch(productsActions.productsSuccess(productsData));
    } catch (error) {
      dispatch(productsActions.productsError());
    }
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);

  useEffect(() => {
    dispatch(countCartTotal());
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/cart'>
            <Cart />
          </Route>
          <Route exact path='/products'>
            <Products />
          </Route>
          <Route exact path='/products/:id' children={<SingleProduct />} />
          <PrivateRoute exact path='/checkout'>
            <Checkout />
          </PrivateRoute>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
