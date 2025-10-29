
import { google } from 'googleapis';
import { AuthService } from '../auth.service';
import { authClientModel } from '../models/auth-client.model';

// Mock the googleapis library
jest.mock('googleapis', () => ({
  google: {
    auth: {
      OAuth2: jest.fn(),
    },
    options: jest.fn(),
  },
}));

jest.mock('../models/auth-client.model', () => ({
  authClientModel: {},
}));

describe('AuthService', () => {
  let mockOAuth2Client;

  beforeEach(() => {
    jest.clearAllMocks();

    mockOAuth2Client = {
      generateAuthUrl: jest.fn(),
      verifyIdToken: jest.fn(),
      revokeCredentials: jest.fn(),
      getToken: jest.fn(),
      getTokenInfo: jest.fn(),
      revokeToken: jest.fn(),
      setCredentials: jest.fn(),
    };

    jest.spyOn(google.auth, 'OAuth2').mockReturnValue(mockOAuth2Client as any);
    authClientModel['oauth2Client'] = mockOAuth2Client;
  });

  describe('initiateAuthentication', () => {
    it('should initiate authentication correctly', () => {
      const mockUrl = 'http://mock-auth-url.com';
      mockOAuth2Client.generateAuthUrl.mockReturnValue(mockUrl);

      const result = AuthService.initiateAuthentication();

      expect(google.auth.OAuth2).toHaveBeenCalledWith(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_SIGN_IN_URL_CALLBACK
      );
      expect(google.options).toHaveBeenCalledWith({ auth: mockOAuth2Client });
      expect(mockOAuth2Client.generateAuthUrl).toHaveBeenCalledWith({
        scope: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ],
        access_type: 'offline',
      });
      expect(authClientModel['oauth2Client']).toBe(mockOAuth2Client);
      expect(result).toBe(mockUrl);
    });
  });

  describe('isUserAllowed', () => {
    it('should return true for an allowed user', () => {
      expect(AuthService.isUserAllowed('felipetavera0412@gmail.com')).toBe(true);
    });

    it('should return false for a non-allowed user', () => {
      expect(AuthService.isUserAllowed('test@example.com')).toBe(false);
    });
  });

  describe('validateToken', () => {
    it('should return null if no token is provided', async () => {
      expect(await AuthService.validateToken(null)).toBeNull();
    });

    it('should return null if token verification fails', async () => {
      mockOAuth2Client.verifyIdToken.mockResolvedValue(null);
      expect(await AuthService.validateToken('token')).toBeNull();
    });

    it('should return null if payload is missing', async () => {
      mockOAuth2Client.verifyIdToken.mockResolvedValue({ getPayload: () => null });
      expect(await AuthService.validateToken('token')).toBeNull();
    });

    it('should return null if user is not allowed', async () => {
      mockOAuth2Client.verifyIdToken.mockResolvedValue({
        getPayload: () => ({ email: 'test@example.com', email_verified: true }),
      });
      expect(await AuthService.validateToken('token')).toBeNull();
    });

    it('should return null if email is not verified', async () => {
      mockOAuth2Client.verifyIdToken.mockResolvedValue({
        getPayload: () => ({ email: 'felipetavera0412@gmail.com', email_verified: false }),
      });
      expect(await AuthService.validateToken('token')).toBeNull();
    });

    it('should return null if userId is missing', async () => {
      mockOAuth2Client.verifyIdToken.mockResolvedValue({
        getPayload: () => ({ email: 'felipetavera0412@gmail.com', email_verified: true }),
        getUserId: () => null,
      });
      expect(await AuthService.validateToken('token')).toBeNull();
    });

    it('should return userId if token is valid', async () => {
      mockOAuth2Client.verifyIdToken.mockResolvedValue({
        getPayload: () => ({ email: 'felipetavera0412@gmail.com', email_verified: true }),
        getUserId: () => 'user-id',
      });
      expect(await AuthService.validateToken('token')).toBe('user-id');
    });
  });

  describe('signOut', () => {
    it('should revoke credentials', async () => {
      mockOAuth2Client.revokeCredentials.mockResolvedValue(undefined);
      await AuthService.signOut();
      expect(mockOAuth2Client.revokeCredentials).toHaveBeenCalled();
    });
  });

  describe('handleOAuthCallback', () => {
    it('should return 400 if no code is provided', async () => {
      const result = await AuthService.handleOAuthCallback(null);
      expect(result).toEqual({
        status: 400,
        redirectUrl: `${process.env.FRONTEND_URL}/login`,
      });
    });

    it('should return 403 if user is not allowed', async () => {
      mockOAuth2Client.getToken.mockResolvedValue({ tokens: { access_token: 'access-token' } });
      mockOAuth2Client.getTokenInfo.mockResolvedValue({ email: 'test@example.com' });

      const result = await AuthService.handleOAuthCallback('code');

      expect(mockOAuth2Client.revokeToken).toHaveBeenCalledWith('access-token');
      expect(result).toEqual({
        status: 403,
        redirectUrl: `${process.env.FRONTEND_URL}/login`,
      });
    });

    it('should return 200 and set credentials if user is allowed', async () => {
      mockOAuth2Client.getToken.mockResolvedValue({ tokens: { access_token: 'access-token', id_token: 'id-token' } });
      mockOAuth2Client.getTokenInfo.mockResolvedValue({ email: 'felipetavera0412@gmail.com' });

      const result = await AuthService.handleOAuthCallback('code');

      expect(mockOAuth2Client.setCredentials).toHaveBeenCalledWith({ access_token: 'access-token', id_token: 'id-token' });
      expect(result).toEqual({
        status: 200,
        redirectUrl: `${process.env.FRONTEND_URL}/login?token=id-token`,
      });
    });
  });
});
