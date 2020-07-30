import { createConnection } from "typeorm";
import { name, helpers } from "faker";
import bcrypt from "bcryptjs";

import { devOrmconfig } from "../config/dev-orm-config";
import { User } from "../entity/User";

async function createUsersFromFaker(number: number): Promise<void> {
  try {
    await createConnection(devOrmconfig);

    const fakeUsers = [];

    for (let localIndex = 0; localIndex < number; localIndex++) {
      fakeUsers[localIndex] = {
        confirmed: true,
        email: helpers.userCard().email,
        firstName: name.firstName(),
        lastName: name.lastName(),
        password: await bcrypt.hash("testLoad", 12),
      };
    }

    console.log("VIEW FAKES ", { fakeUsers });
    const rawUsers = await User.createQueryBuilder("user")
      .insert()
      .values(fakeUsers)
      .execute();

    console.log("RAW USERS ", { fakeUsers, rawUsers });
  } catch (error) {
    console.log("ERROR!\n", error);
  }
}

createUsersFromFaker(350);
