import * as firebaseAdmin from "firebase-admin";

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

  export const validateToken = async (token: string): Promise<boolean> => {
    if (!token) {
      return false;
    }

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    if (!decodedToken) {
      return false;
    }

    if (!AuthService.isUserAllowed(decodedToken.uid)) {
      return false;
    }

    return true;
  };
}
