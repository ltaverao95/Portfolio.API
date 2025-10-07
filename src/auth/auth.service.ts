import * as firebaseAdmin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

const allowedUsers = ["SrcXwvKthuXI6ulWAs61cnh4g822"];

export namespace AuthService {
  /**
   * Checks if a user is in the allowed list.
   * @param userId The ID of the user to check.
   * @returns True if the user is allowed, false otherwise.
   */
  export const isUserAllowed = (userId: string): boolean => {
    return allowedUsers.includes(userId);
  };

  export const validateToken = async (token: string): Promise<DecodedIdToken> => {
    if (!token) {
      return null;
    }

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    if (!decodedToken) {
      return null;
    }

    if (!AuthService.isUserAllowed(decodedToken.uid)) {
      return null;
    }

    return decodedToken;
  };
}
