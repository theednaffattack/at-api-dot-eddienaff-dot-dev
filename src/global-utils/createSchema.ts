import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";

import { pubsub } from "./redis-config";

import { customAuthChecker } from "../modules/utils/custom-auth-checker";

import { ChangePasswordFromContextUseridResolver } from "../modules/user/change-password-from-context-userid";
import { ChangePasswordFromTokenResolver } from "../modules/user/change-password-from-token";
import { ConfirmUserResolver } from "../modules/user/confirm-user";
import { ForgotPasswordResolver } from "../modules/user/forgot-password";
import { LoginResolver } from "../modules/user/login";
import { LogoutResolver } from "../modules/user/logout";
import { MeResolver } from "../modules/user/me";
import { RegisterResolver } from "../modules/user/register";
import { CreateUserResolver } from "../modules/user/create-user";
import { ProfilePictureResolver } from "../modules/user/profile-picture-upload";
import { EditUserInfoResolver } from "../modules/user/edit-user-info";
import { AdminEditUserInfoResolver } from "../modules/user/admin/admin-edit-user-info";

// Hotel
import {
  CreateHotelResolver,
  // GetAllHotelResolver,
  // HotelAvgRatingResolver,
  // HotelCountReviewsResolver,
} from "../modules/hotel/CreateHotel";

// Reservations
// import {
//   CreateReservationResolver,
//   GetAllReservationsResolver,
//   GetReservationsByHotelId,
// } from "../modules/hotel/reservations/ExportedResolvers";
// import { GetReservationByHotelIDAndDateFilterResolver } from "../modules/hotel/reservations/GetReservationByHotelIDAndDateFilterResolver";

// Messages
import { GetMyMessagesResolver } from "../modules/messages/get-my-messages";
import { MessageResolver } from "../modules/messages/send-messages";

import { ReviewsResolver } from "../modules/hotel/reviews/Review";

// // IF WE WANT IMAGES...
import { SignS3 } from "../modules/aws-s3/s3-sign-mutation";
import { SignS3GetObject } from "../modules/aws-s3/s3-sign-mutation-get-object";
import { HotelLikesResolver } from "../modules/hotel/likes/hotel-likes-resolver";
import { GetAllHotelsResolver } from "../modules/hotel/GetAllHotelsResolver";
import { ReservationResolver } from "../modules/hotel/reservations/reservation-resolver";

// // BELOW ARE MESSAGING / CHAT APP SPECIFIC RESOLVERS
// import { GetAllMessagesResolver } from "../modules/direct-messages/get-all-my-messages";
// import { GetListToCreateThread } from "../modules/direct-messages/get-list-to-create-thread";
// import { GetMyMessagesFromUserResolver } from "../modules/direct-messages/get-my-messages-from-user";
// import { UserTeamResolver } from "../modules/team/team-resolver";
// import { ChannelResolver } from "../modules/channel/channel-resolver";
// import { DirectMessageResolver } from "../modules/direct-messages/direct-messages-resolver";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    // alphabetical please!
    resolvers: [
      AdminEditUserInfoResolver,
      ChangePasswordFromContextUseridResolver,
      ChangePasswordFromTokenResolver,
      ConfirmUserResolver,
      CreateHotelResolver,
      CreateUserResolver,
      EditUserInfoResolver,
      ForgotPasswordResolver,
      GetAllHotelsResolver,
      GetMyMessagesResolver,
      HotelLikesResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      MessageResolver,
      ProfilePictureResolver,
      RegisterResolver,
      ReviewsResolver,
      ReservationResolver,
      SignS3,
      SignS3GetObject,
    ],
    pubSub: pubsub,
    authChecker: customAuthChecker,
    dateScalarMode: "isoDate",
    // ({ context: { req } }) => {
    //   // I can read context here
    //   // check permission vs what's in the db "roles" argument
    //   // that comes from `@Authorized`, eg,. ["ADMIN", "MODERATOR"]
    //   return !!req.session.userId;
    // }
  });
