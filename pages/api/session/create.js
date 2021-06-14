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

          const { category, category_other, date_and_time } = request.body;

          // some fields are required
          if (!category || !date_and_time) {
            return response.status(400).json({
              error: true,
              message: "Please enter all required fields",
              required_fields: ["category", "date_and_time"],
            });
          }

          // verify this user doesn't have another session open (limited 1 per user)
          const foundSession = await Session.findOne({ host: auth.uid });
          if (foundSession) {
            return response.status(403).json({
              error: true,
              message: "An open session already exists for this account",
            });
          }

          // verify date & time is not in the past
          if (new Date(date_and_time) < new Date()) {
            return response.status(400).json({
              error: true,
              message: "Cannot create a session in the past",
            });
          }

          // create the session
          const newSession = await Session.create({
            category,
            category_other,
            date_and_time,
            host: auth.uid,
          });

          response.status(201).json({
            message: "Created session",
            session: newSession,
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
