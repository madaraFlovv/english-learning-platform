type RegisterData = {
  email: string;
  password: string;
};

// Demo placeholder only. Never log credentials or pretend this creates an account.
export const register = async (_data: RegisterData): Promise<void> => {
  throw new Error("Registration is not connected to a backend yet.");
};
