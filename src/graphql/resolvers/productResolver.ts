import { v4 as uuidv4 } from 'uuid';
import products from '../data/products';

const productResolver = {
  products: () => {
    return products;
  },
  product: ({ id }: { id: string }) => {
    return products.find(product => product.id === id);
  },
  addProduct: ({ name, price, description }: { name: string, price: number, description: string }) => {
    const newProduct = { id: uuidv4(), name, price, description };
    products.push(newProduct);
    return newProduct;
  }
};

export default productResolver;
