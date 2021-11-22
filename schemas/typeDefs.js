import { gql } from 'apollo-server-express';

const typeDef = gql`

    type User {
    _id: ID
    username:String!
    email:String
    bookCount:Int
    savedBooks:[Book]
}

    type Query {
    me: User
  }


    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }
    input BookInput {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

`;

export default typeDef;