require("leaked-handles").set({
  fullStack: true, // use full stack traces
  timeout: 30000, // run every 30 seconds instead of 5.
  debugSockets: true, // pretty print tcp thrown exceptions.
});

import { Connection } from "typeorm";
import casual from "casual";

import { testConn } from "../src/test-utils/testConn";
import { gqlCall } from "../src/test-utils/gqlCall";
import { User } from "../src/entity/User";

let conn: Connection;

// const manager = getConnectionManager().get("test");

beforeAll(async done => {
  conn = await testConn();
  done();
});

afterAll(async done => {
  // console.log("IS AFTER ALL CALLED, REGISTER TEST", { conn });
  const reportClose = await conn.close();

  console.log("WHAT HAPPENED TO THE CONNECTION", {
    reportClose,
  });

  done();
});

const mockUser = {
  firstName: casual.first_name,
  lastName: casual.last_name,
  email: casual.email,
  password: casual.password,
};

// const mockUser2 = {
//   firstName: "bob",
//   lastName: "bob",
//   email: "bob@bob.com",
//   password: "skdjfksajfdksajfkjaskdfj"
// };

const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe("Register", () => {
  it("create user", async done => {
    // call resolver
    const response = await gqlCall({
      source: registerMutation,
      variableValues: {
        data: mockUser,
      },
    });

    const dbUser = await conn.manager.findOne(User, {
      where: { email: mockUser.email },
    });

    // should be the exact same as mockUser
    // minus the password field and with and ID
    const expectUser = {
      register: {
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
        name: mockUser.firstName + " " + mockUser.lastName,
        id: dbUser?.id, // This is cheating (I think, maybe???) but I don't know what else to do
      },
    };

    // expect the registration response to match what
    // we input. We cheat and grab the real ID from the
    // database (not sure how else to handle that)
    expect(response).toMatchObject({
      data: expectUser,
    });

    // we should be able to find a user in the db
    expect(dbUser).toBeDefined();

    // that user SHOULD NOT be conifrmed yet
    expect(dbUser && dbUser.confirmed).toBeFalsy();

    // the user in the db should match our mocked up
    // data exactly
    expect(dbUser && dbUser.firstName).toBe(mockUser.firstName);
    expect(dbUser && dbUser.lastName).toBe(mockUser.lastName);

    done();
  });
});
