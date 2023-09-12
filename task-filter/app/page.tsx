"use client";
import React, { useState, useEffect } from "react";

import axios from "axios";
import Products from "@/components/Products/Products";
import Filters from "@/components/Filters/Filters";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const [prices, setPrices] = useState<number[]>([]);

  const getProducts = async () => {
    try {
      const request = await axios.get("https://dummyjson.com/products");

      if (request.status !== 200) {
        throw new Error("Xeta bas verdi");
      } else {
        setProducts(request.data.products);
        const fullBrands: string[] = request.data.products.map(
          (product: any) => product.brand
        );

        const fullRatings: number[] = request.data.products.map(
          (product: any) => product.rating
        );

        const fullPrices: number[] = request.data.products.map(
          (product: any) => product.price
        );
        const uniqueBrandsSet: Set<string> = new Set<string>(fullBrands);
        const uniqueRatingSet: Set<number> = new Set<number>(fullRatings);
        const uniquePriceSet: Set<number> = new Set<number>(fullPrices);
        const myBrands: string[] = Array.from(uniqueBrandsSet);
        const myRatings: number[] = Array.from(uniqueRatingSet);
        const myPrices: number[] = Array.from(uniquePriceSet);
        console.log(myBrands);
        setBrands(myBrands);
        setRatings(myRatings);
        setPrices(myPrices);

        setFilterProducts(request.data.products);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {products.length > 0 && (
        <Filters
          brands={brands}    
          prices={prices}
          ratings={ratings}
          setFilterProducts={setFilterProducts}
          products={products}
        />
      )}

      {products.length > 0 && <Products products={filterProducts} />}
    </>
  );
};

export default Home;
