import { google } from "googleapis";
import { authClientModel } from "./models/auth-client.model";
import { OAuthCallBackResult } from "./models/oauth-callback-result.model";

const allowedUsers = ["felipetavera0412@gmail.com"];

export namespace AuthService {
  /**
   * Initiates the Google OAuth2 authentication process.
   * It creates an OAuth2 client, generates the authentication URL,
   * and stores the client for later use in the callback.
   * @returns {string} The authentication URL to redirect the user to.
   */
  export const initiateAuthentication = (): string => {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_SIGN_IN_URL_CALLBACK
    );

    google.options({ auth: oauth2Client });

    const scopes = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ];

    const url = oauth2Client.generateAuthUrl({
      scope: scopes,
      access_type: "offline",
    });

    authClientModel["oauth2Client"] = oauth2Client;

    return url;
  };

  /**
   * Checks if a user is in the allowed list.
   * @param userId The ID of the user to check.
   * @returns True if the user is allowed, false otherwise.
   */
  export const isUserAllowed = (userId: string): boolean => {
    return allowedUsers.includes(userId);
  };

  /**
   * Validates the provided ID token.
   * @param token The ID token to validate.
   * @returns The user ID if the token is valid and the user is allowed, null otherwise.
   */
  export const validateToken = async (token: string): Promise<string> => {
    if (!token) {
      return null;
    }

    const verifiedIdToken = await authClientModel["oauth2Client"].verifyIdToken(
      {
        idToken: token,
      }
    );
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

  /**
   * Signs out the user by revoking their credentials.
   * @throws An error if revoking credentials fails.
   */
  export const signOut = async (): Promise<void> => {
    await authClientModel["oauth2Client"].revokeCredentials();
  };

  /**
   * Handles the OAuth callback after user authentication.
   * It exchanges the authorization code for tokens, checks if the user is allowed,
   * and returns the result.
   * @param code The authorization code received from the OAuth provider.
   * @returns {Promise<OAuthCallBackResult>} An object containing the status, redirect URL, and optional ID token.
   */
  export const handleOAuthCallback = async (
    code: string
  ): Promise<OAuthCallBackResult> => {
    if (!code) {
      return {
        status: 400,
        redirectUrl: `${process.env.FRONTEND_URL}/login`,
      };
    }

    const { tokens } = await authClientModel["oauth2Client"].getToken(code);

    const tokenInfo = await authClientModel["oauth2Client"].getTokenInfo(
      tokens.access_token
    );

    if (!isUserAllowed(tokenInfo.email)) {
      await authClientModel["oauth2Client"].revokeToken(tokens.access_token);
      return {
        status: 403,
        redirectUrl: `${process.env.FRONTEND_URL}/login`,
      };
    }

    authClientModel["oauth2Client"].setCredentials(tokens);

    return {
      status: 200,
      redirectUrl: `${process.env.FRONTEND_URL}/login?token=${tokens.id_token}`
    };
  };
}
