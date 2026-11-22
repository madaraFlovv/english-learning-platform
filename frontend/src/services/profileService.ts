import { mockUserProfile } from "../data/mockUserProfile";
import type { UserProfile } from "../types/learning";

// Mock profile adapter. The real implementation will read the authenticated user's profile from the API.
export const getCurrentUserProfile = (): UserProfile => mockUserProfile;
