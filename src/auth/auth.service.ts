import { Auth } from "googleapis";
import { authDictionary } from "./auth.controller";

const allowedUsers = ["felipetavera0412@gmail.com"];

export namespace AuthService {
  /**
   * Checks if a user is in the allowed list.
   * @param userId The ID of the user to check.
   * @returns True if the user is allowed, false otherwise.
   */
  export const isUserAllowed = (userId: string): boolean => {
    return allowedUsers.includes(userId);
  };

  export const validateToken = async (token: string): Promise<string> => {
    if (!token) {
      return null;
    }

    const verifiedIdToken = await authDictionary["oauth2Client"].verifyIdToken({
      idToken: token,
    });
    if (!verifiedIdToken) {
      return null;
    }

    const payload = verifiedIdToken.getPayload();
    if (!payload) {
      return null;
    }

    if (!AuthService.isUserAllowed(payload.email) || !payload.email_verified) {
      return null;
    }

    const userId = verifiedIdToken.getUserId();
    if (!userId) {
      return null;
    }

    return userId;
  };
}
