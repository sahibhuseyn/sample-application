"use client";

import { FilterProps } from "./Filters.types";

const Filters = ({
  brands,
  prices,
  ratings,
  setFilterProducts,
  products,
}: FilterProps) => {
  const handleChangeBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterProducts(
      products.filter((product) => {
        if (product.brand == e.target.value) {
          return product;
        }
      })
    );
  };

  const handleChangeRating = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterProducts(
      products.filter((product: any) => {
        if (product.rating == e.target.value) {
          return product;
        }
      })
    );
  };

  const handleChangePrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterProducts(
      products.filter((product: any) => {
        if (product.price == e.target.value) {
          return product;
        }
      })
    );
  };

  const handleOrderPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
 
    if (e.target.value == "1") {
      const result = products.sort((a, b) => a.price - b.price);
      setFilterProducts([...result]);
    } else {
      const result = products.sort((a, b) => b.price - a.price);
      setFilterProducts([...result]);
    }
  };

  const handleOrderAlphabeth = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.value == "1") {
      const result = products.sort((a, b) => a.title.localeCompare(b.title));
    
      setFilterProducts([...result]);
    } else {
      const result = products.sort((a, b) => b.title.localeCompare(a.title));
    
      setFilterProducts([...result]);
    }
  };

  const handleOrderRating = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == "1") {
      const result = products.sort((a, b) => a.rating - b.rating);
      setFilterProducts([...result]);
    } else {
      const result = products.sort((a, b) => b.rating - a.rating);
      setFilterProducts([...result]);
    }
  };
  return (
    <div className="flex flex-col gap-2 mb-3">
      <select
        onChange={(e) => handleChangeBrand(e)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {brands.map((brand, idx) => (
          <option key={idx} value={brand}>
            {brand}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => handleChangePrice(e)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {prices.map((price, idx) => (
          <option key={idx} value={price}>
            {price}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => handleChangeRating(e)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {ratings.map((rating, idx) => (
          <option key={idx}>{rating}</option>
        ))}
      </select>

      <select
        onChange={(e) => handleOrderPrice(e)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="1">Azdan-Cox(Qiymet)</option>
        <option value="2">Coxdan-AZ(Qiymet)</option>
      </select>

      <select
        onChange={(e) => handleOrderAlphabeth(e)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="1">A-Z</option>
        <option value="2">Z-A</option>
      </select>

      <select
        onChange={(e) => handleOrderRating(e)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="1">Azdan-Coxa(Rating)</option>
        <option value="2">Coxdan-Aza(Rating)</option>
      </select>
    </div>
  );
};

export default Filters;
