import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString
} from 'graphql';

import User from './DB';

var userType = new GraphQLObjectType({
  name: 'User',
  description: 'User creator',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the user.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the user.',
    },
    login: {
      type: GraphQLString,
      description: 'The login of the user.',
    },
    password: {
      type: GraphQLString,
      description: 'User password',
    }
  })
});

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: userType,
        resolve: function() {
          return 'user';
        }
      }
    }
  }),
  // mutation
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser: {
        type: userType,
        args: {
          login: {
            name: 'login',
            type: GraphQLString
          },
          password: {
            name: 'password',
            type: GraphQLString
          }
        },
        resolve: (obj, { login, password }, source) => {
          return User.createUser(login, password);
        }
      },
      updateUser: {
        type: userType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          },
          name: {
            name: 'name',
            type: GraphQLString
          }
        },
        resolve: (obj, {id, name}, source) => {
          return '';
        }
      }
    }
  })
});
export default schema;
