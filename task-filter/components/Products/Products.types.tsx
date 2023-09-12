export interface ProductsProps {
  products: {
    id: number;
    thumbnail: string;
    title: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    description: string;
  }[];
}
