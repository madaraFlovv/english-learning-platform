import { mockUserProfile } from "../data/mockUserProfile";
import type { UserProfile } from "../types/learning";

// Mock adapter. Replace this read with GET /users/me when authentication exists.
export const getCurrentUserProfile = (): UserProfile => ({
  ...mockUserProfile,
});
