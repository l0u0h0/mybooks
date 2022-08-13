const LOCAT_STORAGE_TOKEN_KEY_NAME = "token";

export default class TokenService {
  public static get(): string | null {
    return localStorage.getItem(LOCAT_STORAGE_TOKEN_KEY_NAME);
  }

  public static set(token: string): void {
    localStorage.setItem(LOCAT_STORAGE_TOKEN_KEY_NAME, token);
  }

  public static remove(): void {
    localStorage.removeItem(LOCAT_STORAGE_TOKEN_KEY_NAME);
  }
}
