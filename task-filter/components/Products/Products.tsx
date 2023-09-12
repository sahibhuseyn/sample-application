"use client";
import { ProductsProps } from "./Products.types";
const Products = ({ products }: ProductsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 m-auto max-w-7xl">
      {products.map((product) => (
        <div
          key={product.id}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <img src={product.thumbnail} alt={product.title} className="w-full h-[250px]" />

          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {product.description}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
             Brand:  {product.brand}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Price: {product.price}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
             Rating:  {product.rating}
            </p>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Sifari ver
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
