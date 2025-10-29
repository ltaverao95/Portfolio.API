
import { Request, Response, NextFunction } from 'express';
import { authenticate, optionalAuthenticate } from '../auth.middleware';
import { AuthService } from '../auth.service';

jest.mock('../auth.service');

describe('Auth Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('authenticate', () => {
    it('should call next() if token is valid', async () => {
      mockRequest.headers = { authorization: 'Bearer valid-token' };
      (AuthService.validateToken as jest.Mock).mockResolvedValue('user-id');

      await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
      expect((mockRequest as any).user).toEqual({ id: 'user-id' });
    });

    it('should return 401 if token is missing', async () => {
      await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.send).toHaveBeenCalledWith('Unauthorized');
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should return 401 if token is invalid', async () => {
      mockRequest.headers = { authorization: 'Bearer invalid-token' };
      (AuthService.validateToken as jest.Mock).mockResolvedValue(null);

      await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.send).toHaveBeenCalledWith('Unauthorized');
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should return 401 if AuthService.validateToken throws an error', async () => {
        mockRequest.headers = { authorization: 'Bearer valid-token' };
        (AuthService.validateToken as jest.Mock).mockRejectedValue(new Error('Validation error'));
  
        await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);
  
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.send).toHaveBeenCalledWith('Unauthorized');
        expect(nextFunction).not.toHaveBeenCalled();
      });
  });

  describe('optionalAuthenticate', () => {
    it('should call next() if token is valid', async () => {
      mockRequest.headers = { authorization: 'Bearer valid-token' };
      (AuthService.validateToken as jest.Mock).mockResolvedValue('user-id');

      await optionalAuthenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
      expect((mockRequest as any).user).toEqual({ id: 'user-id' });
    });

    it('should call next() if token is missing', async () => {
      await optionalAuthenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
      expect((mockRequest as any).user).toBeUndefined();
    });

    it('should return 401 if token is invalid', async () => {
      mockRequest.headers = { authorization: 'Bearer invalid-token' };
      (AuthService.validateToken as jest.Mock).mockResolvedValue(null);

      await optionalAuthenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.send).toHaveBeenCalledWith('Unauthorized');
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should return 401 if AuthService.validateToken throws an error', async () => {
        mockRequest.headers = { authorization: 'Bearer valid-token' };
        (AuthService.validateToken as jest.Mock).mockRejectedValue(new Error('Validation error'));
  
        await optionalAuthenticate(mockRequest as Request, mockResponse as Response, nextFunction);
  
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.send).toHaveBeenCalledWith('Unauthorized');
        expect(nextFunction).not.toHaveBeenCalled();
      });
  });
});
