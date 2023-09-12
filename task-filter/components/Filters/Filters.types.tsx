export interface FilterProps {
     brands: string[],
     ratings: number[],
     prices: number[],
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
     setFilterProducts: (c: {}[]) => any
}