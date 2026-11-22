import type { ChangeEvent } from "react";

import { useProgress } from "../../context/ProgressContext";
import { lessons, levels, topics } from "../../data/roadmap";

import styles from "./AccountPage.module.css";

const AccountPage = () => {
  const { progress, setCurrentLevel } = useProgress();

  const currentLevel = levels.find((level) => level.id === progress.currentLevelId);
  const verifiedLevel = levels.find(
    (level) => level.id === progress.highestVerifiedLevelId,
  );
  const maximumAllowedLevel = verifiedLevel ?? levels[0];
  const availableLevels = levels.filter(
    (level) => level.order <= (maximumAllowedLevel?.order ?? 1),
  );

  const completedLessonIds = new Set(
    progress.lessonProgress
      .filter((lesson) => lesson.status === "completed")
      .map((lesson) => lesson.lessonId),
  );

  const completedLessonsCount = completedLessonIds.size;

  const levelProgress = levels.map((level) => {
    const levelTopicIds = topics
      .filter((topic) => topic.levelId === level.id)
      .map((topic) => topic.id);
    const levelLessons = lessons.filter((lesson) =>
      levelTopicIds.includes(lesson.topicId),
    );
    const completedCount = levelLessons.filter((lesson) =>
      completedLessonIds.has(lesson.id),
    ).length;
    const percentage = levelLessons.length
      ? Math.round((completedCount / levelLessons.length) * 100)
      : 0;

    return {
      ...level,
      totalLessons: levelLessons.length,
      completedCount,
      percentage,
    };
  });

  const handleLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentLevel(event.target.value);
  };

  return (
    <div className={styles["account-page"]}>
      <header className={styles["page-header"]}>
        <span className={styles["eyebrow"]}>YOUR SPACE</span>
        <h1>Account</h1>
        <p>Manage your learning level and keep track of your progress.</p>
      </header>

      <section className={styles["overview-section"]}>
        <div className={styles["section-heading"]}>
          <div>
            <span className={styles["eyebrow"]}>OVERVIEW</span>
            <h2>Your learning overview</h2>
          </div>
          <span className={styles["profile-mark"]}>E</span>
        </div>

        <div className={styles["stats-grid"]}>
          <article className={styles["stat-card"]}>
            <span className={styles["stat-label"]}>Current level</span>
            <strong>{currentLevel?.code ?? "—"}</strong>
            <span className={styles["stat-caption"]}>
              {currentLevel?.title ?? "Not selected"}
            </span>
          </article>
          <article className={styles["stat-card"]}>
            <span className={styles["stat-label"]}>Verified maximum</span>
            <strong>{verifiedLevel?.code ?? "—"}</strong>
            <span className={styles["stat-caption"]}>
              {verifiedLevel
                ? "Confirmed by placement test"
                : "Placement test not completed"}
            </span>
          </article>
          <article className={styles["stat-card"]}>
            <span className={styles["stat-label"]}>Completed lessons</span>
            <strong>{completedLessonsCount}</strong>
            <span className={styles["stat-caption"]}>Across all levels</span>
          </article>
          <article className={styles["stat-card"]}>
            <span className={styles["stat-label"]}>Learning streak</span>
            <strong>{progress.streakDays}</strong>
            <span className={styles["stat-caption"]}>Days in a row</span>
          </article>
        </div>
      </section>

      <section className={styles["progress-section"]}>
        <div className={styles["section-heading"]}>
          <div>
            <span className={styles["eyebrow"]}>YOUR JOURNEY</span>
            <h2>Progress by level</h2>
          </div>
        </div>

        <div className={styles["level-progress-grid"]}>
          {levelProgress.map((level) => (
            <article className={styles["level-progress-card"]} key={level.id}>
              <div className={styles["level-progress-heading"]}>
                <div>
                  <strong>{level.code}</strong>
                  <span>{level.title}</span>
                </div>
                {level.id === progress.currentLevelId && (
                  <span className={styles["current-level-tag"]}>Current</span>
                )}
              </div>

              <div
                className={styles["progress-track"]}
                role="progressbar"
                aria-label={`${level.code} lesson progress`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={level.percentage}
              >
                <span style={{ width: `${level.percentage}%` }} />
              </div>

              <div className={styles["level-progress-footer"]}>
                <span>
                  {level.completedCount} / {level.totalLessons} lessons
                </span>
                <strong>{level.percentage}%</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles["level-section"]}>
        <div className={styles["section-heading"]}>
          <div>
            <span className={styles["eyebrow"]}>LEARNING SETTINGS</span>
            <h2>Learning level</h2>
          </div>
        </div>

        <div className={styles["level-panel"]}>
          <div className={styles["level-copy"]}>
            <h3>Choose your current level</h3>
            <p>
              Learn at a pace that feels right. You can choose any level up to
              the maximum confirmed by your placement test. Your lesson progress
              is kept when you switch levels.
            </p>
          </div>

          <label className={styles["level-control"]}>
            <span>Current learning level</span>
            <select value={progress.currentLevelId} onChange={handleLevelChange}>
              {availableLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.code} — {level.title}
                </option>
              ))}
            </select>
          </label>

          <div className={styles["verification-note"]}>
            <span className={styles["note-icon"]}>✓</span>
            <p>
              {verifiedLevel
                ? `Your verified maximum is ${verifiedLevel.code}. You can change your learning level at any time within the available range.`
                : "Complete the placement test to unlock more learning levels. Until then, your starting level is A1."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountPage;
