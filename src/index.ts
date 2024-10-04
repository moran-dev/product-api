import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import productResolver from './graphql/resolvers/productResolver';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Definindo o esquema GraphQL
const schema = buildSchema(`
  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(name: String!, price: Float!, description: String): Product
  }
`);

// Middleware para GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: productResolver,
  graphiql: true, // Habilita o GraphiQL
}));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
