import React from 'react';
import { Categorihom } from '../../Categori/Categorihom';
import Nevproduct from '../../Product/Nevproduct';
import Popularproduct from '../../Product/Popularproduct';

const Hom = ({ addToCart }) => {
  return (
    <>
      <Categorihom />
      <Nevproduct addToCart={addToCart} />
      <Popularproduct addToCart={addToCart} />
    </>
  );
};

export default Hom;
