export type AuthCredentials = {
  email: string;
  password: string;
};

export type AuthServiceResult = {
  status: "not-configured";
};

// These methods intentionally do not send credentials until the backend exists.
// Never log passwords or store them in browser storage.
export const register = async (
  _credentials: AuthCredentials,
): Promise<AuthServiceResult> => ({
  status: "not-configured",
});

export const login = async (
  _credentials: AuthCredentials,
): Promise<AuthServiceResult> => ({
  status: "not-configured",
});
