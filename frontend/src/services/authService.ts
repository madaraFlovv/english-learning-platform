export type RegisterData = {
  email: string;
  password: string;
};

export type RegisterResult = {
  status: "not-configured";
};

// Demo placeholder only. This does not create an account or send credentials anywhere.
export const register = async (_data: RegisterData): Promise<RegisterResult> => ({
  status: "not-configured",
});
