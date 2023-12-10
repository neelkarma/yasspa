export class InvalidRefreshTokenError extends Error {
  constructor() {
    super("Invalid refresh token");
    this.name = "InvalidRefreshTokenError";
  }
}

export class TokenSetNotPresentError extends TypeError {
  constructor() {
    super("No token set in cookies");
    this.name = "NoTokenSetError";
  }
}
