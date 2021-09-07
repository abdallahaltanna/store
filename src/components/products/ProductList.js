import React, { useEffect } from 'react';
import GridView from '../ui/GridView';
import ListView from '../ui/ListView';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../../store/filter_slice';

const ProductList = () => {
  const { filtered_products } = useSelector((state) => state.filter);
  const { grid_view } = useSelector((state) => state.ui);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts(products));
  }, [products]);

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h5>
    );
  }
  if (grid_view === false) {
    return <ListView products={filtered_products} />;
  }
  return <GridView products={filtered_products}>product list</GridView>;
};

export default ProductList;
