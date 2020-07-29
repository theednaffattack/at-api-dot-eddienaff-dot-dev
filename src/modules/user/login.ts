import { Arg, Resolver, Mutation, Ctx, UseMiddleware } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";
import { logger } from "../middleware/logger";
import { inspect } from "util";
import { getRepository } from "typeorm";
// import { getRepository } from "typeorm";

// prettier-ignore
@Resolver()
export class LoginResolver {
  @UseMiddleware(logger)
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext,
  ): Promise<User | null> {
    console.log("LOGIN RESOLVER REACHED")

    let user: User | undefined;

    try {
      
      user = await getRepository(User).findOne({ where: { email } });

    } catch (error) {
    console.log("User lookup ERRROR\n", inspect(error))
      
    }
    // if we can't find a user return an obscure result (null) to prevent fishing
    console.log("LOGIN RESOLVER - USER FOUND - 2", inspect(user, false, 3, true))

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    // if the supplied password is invalid return early
    if (!valid) {
      return null;
    }

    // if the user has not confirmed via email
    if (!user.confirmed) {
      throw new Error("Please confirm your account");
      // return null;
    }

    // all is well return the user we found
    ctx.req.session!.userId = user.id;
    return user;
  }
}
