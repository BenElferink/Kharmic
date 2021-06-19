import { initMiddleware } from "../../../middleware/helpers";
import connectDB from "../../../config/mongodb";
import { authBearerToken } from "../../../middleware/jsonwebtoken";
import Session from "../../../models/Session";

initMiddleware(connectDB());

export default async (request, response) => {
  switch (request.method) {
    case "POST":
      {
        try {
          const { auth, authError } = authBearerToken(request);
          if (authError) return response.status(401).json({ error: true, message: authError });

          const { session_id } = request.body;
          // field is required
          if (!session_id) {
            return response.status(400).json({
              error: true,
              message: "Please enter all required fields",
              required_fields: ["session_id"],
            });
          }

          // verify session existance
          const foundSession = await Session.findOne({ _id: session_id });
          if (!foundSession) {
            return response.status(404).json({
              error: true,
              message: "Could not find a session with that ID",
            });
          }

          // remove account from session-participants
          if (!foundSession.participants.includes(auth.uid)) {
            return response.status(400).json({
              error: true,
              message: "You are not in this session",
            });
          } else {
            foundSession.participants.splice(
              foundSession.participants.findIndex((accountId) => accountId.equals(auth.uid)),
              1,
            );
            await foundSession.save();
          }

          response.status(200).json({
            message: "Left session",
            session: foundSession,
          });
        } catch (error) {
          console.log(error);
          response.status(500).json({
            error: true,
            message: error.message,
          });
        }
      }
      break;

    default:
      response.status(404).json({ error: true, message: "Invalid request method" });
      break;
  }
};
