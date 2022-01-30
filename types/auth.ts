export interface Token {
  access_token: string;
  expires_in: number;
  expiry: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}
