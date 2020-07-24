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

// const manager = getConnectionManager().get("test");

let conn: Connection;

beforeAll(async done => {
  conn = await testConn();

  done();
});

afterAll(async done => {
  // console.log("IS AFTER ALL CALLED, ME TEST", { conn });
  await conn.close();
  (await testConn()).close();
  done();
});

const mockUser = {
  firstName: casual.first_name,
  lastName: casual.last_name,
  email: casual.email,
  password: casual.password,
};

const meQuery = `
{
    me{
      firstName
      lastName
      email
      name
      id
    }
  }
`;

describe("Me", () => {
  it("get user info", async done => {
    const user = await User.create({
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      email: mockUser.email,
      password: mockUser.password,
    }).save();

    // call resolver
    const response = await gqlCall({
      source: meQuery,
      userId: user.id,
    });

    expect(response).toMatchObject({
      data: {
        me: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });
    done();
  }, 4000);

  it("return null", async done => {
    // call resolver
    const response = await gqlCall({
      source: meQuery,
    });

    // basically a test for an authenticated (logged in)
    // user
    expect(response).toMatchObject({
      data: {
        me: null,
      },
    });
    done();
  }, 4000);
});
