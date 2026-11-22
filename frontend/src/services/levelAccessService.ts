import { getLevels } from "./curriculumService";

export const isLevelUnlocked = (
  levelId: string,
  highestVerifiedLevelId: string | null,
): boolean => {
  const levels = getLevels();
  const targetLevel = levels.find((level) => level.id === levelId);

  if (!targetLevel) return false;

  const verifiedLevel = levels.find(
    (level) => level.id === highestVerifiedLevelId,
  );
  const maximumAllowedOrder = verifiedLevel?.order ?? levels[0]?.order ?? 1;

  return targetLevel.order <= maximumAllowedOrder;
};
