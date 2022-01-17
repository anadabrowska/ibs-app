import { User } from "../../src/entities/User";
import { testGraphQLCall } from "../../src/testGraphQLCall";

const registerMutation = `
  mutation Register(
    $firstName: String!
    $lastName: String!
    $gender: String!
    $email: String!
    $password: String!
  ) {
    register(
      input: {
        firstName: $firstName
        lastName: $lastName
        gender: $gender
        email: $email
        password: $password
      }
    ) {
      user {
        id
        firstName
        lastName
        email
        gender
      }
      errors {
        fieldName
        message
      }
    }
  }
`;

const loginMutation = `
mutation Login($email: String!, $password: String!) {
  login(input: { email: $email, password: $password }) {
    user {
      id
      firstName
      lastName
      email
      gender
    }
    errors {
      fieldName
      message
    }
  }
}
`;

const meQuery = `
query Me {
  me {
    id
    firstName
    lastName
    email
    gender
  }
}`;

export const userTest = () =>
  describe("user resolvers", () => {
    it("register and login mutation, me query", async () => {
      const testUser = {
        email: "ania@test.com",
        password: "piesek",
        gender: " female",
        firstName: "Anna",
        lastName: "Smith",
      };

      const registerResponse = await testGraphQLCall(registerMutation, {
        email: testUser.email,
        password: testUser.password,
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        gender: testUser.gender,
      });

      const dbUser = await User.findOne({ where: { email: testUser.email } });

      expect(dbUser).toBeDefined();

      const userMutationResponse = {
        errors: null,
        user: {
          id: dbUser!.id,
          firstName: dbUser!.firstName,
          lastName: dbUser!.lastName,
          email: dbUser!.email,
          gender: dbUser!.gender,
        },
      };

      expect(registerResponse).toEqual({
        data: {
          register: userMutationResponse,
        },
      });

      const loginResponse = await testGraphQLCall(loginMutation, {
        email: testUser.email,
        password: testUser.password,
      });

      expect(loginResponse).toEqual({
        data: {
          login: userMutationResponse,
        },
      });

      const meResponse = await testGraphQLCall(meQuery, {}, dbUser!.id);

      expect(meResponse).toEqual({
        data: {
          me: {
            id: dbUser!.id,
            firstName: dbUser!.firstName,
            lastName: dbUser!.lastName,
            email: dbUser!.email,
            gender: dbUser!.gender,
          },
        },
      });
    });
  });
