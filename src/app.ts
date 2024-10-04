// src/app.ts
import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
  }

  type Query {
    products: [Product!]
  }

  type Mutation {
    addProduct(name: String!, price: Float!): Product
    updateProduct(id: ID!, name: String, price: Float): Product
    deleteProduct(id: ID!): Boolean
  }
`;

let products = [
  { id: '1', name: 'Laptop', price: 999.99 },
  { id: '2', name: 'Smartphone', price: 499.99 }
];

const resolvers = {
  Query: {
    products: () => products,
  },
  Mutation: {
    addProduct: (_: any, { name, price }: { name: string; price: number }) => {
      const newProduct = { id: String(products.length + 1), name, price };
      products.push(newProduct);
      return newProduct;
    },
    updateProduct: (_: any, { id, name, price }: { id: string; name?: string; price?: number }) => {
      const product = products.find((p) => p.id === id);
      if (!product) return null;
      if (name) product.name = name;
      if (price) product.price = price;
      return product;
    },
    deleteProduct: (_: any, { id }: { id: string }) => {
      const index = products.findIndex((p) => p.id === id);
      if (index === -1) return false;
      products.splice(index, 1);
      return true;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
