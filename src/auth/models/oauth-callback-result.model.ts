/**
 * Represents the result of an OAuth callback operation.
 *
 * @interface OAuthCallBackResult
 * @property {number} status - The HTTP status code of the OAuth callback result
 * @property {string} redirectUrl - The URL to redirect the user after OAuth processing
 */
export interface OAuthCallBackResult {
  status: number;
  redirectUrl: string;
}
