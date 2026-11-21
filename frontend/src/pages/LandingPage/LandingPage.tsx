import styles from "./LandingPage.module.css";

import { Link } from "react-router-dom";

import { learningData } from "../../data/roadmap";
import { useProgress } from "../../context/ProgressContext";

const LandingPage = () => {
  const { progress: mockProgress } = useProgress();
  const currentLevel = learningData.levels.find(
    (level) => level.id === mockProgress.currentLevelId,
  );

  if (!currentLevel) {
    return <div>Learning level not found.</div>;
  }

  const levelTopics = learningData.topics
    .filter((topic) => topic.levelId === currentLevel.id)
    .sort((a, b) => a.order - b.order);

  const levelLessons = learningData.lessons.filter((lesson) =>
    levelTopics.some((topic) => topic.id === lesson.topicId),
  );

  const getLessonStatus = (lessonId: string) => {
    return (
      mockProgress.lessonProgress.find(
        (progress) => progress.lessonId === lessonId,
      )?.status ?? "not-started"
    );
  };

  const completedLessonsCount = levelLessons.filter(
    (lesson) => getLessonStatus(lesson.id) === "completed",
  ).length;

  const totalLessonsCount = levelLessons.length;

  const levelProgress =
    totalLessonsCount > 0
      ? Math.round((completedLessonsCount / totalLessonsCount) * 100)
      : 0;

  const topicCards = levelTopics.map((topic, index) => {
    const lessons = learningData.lessons
      .filter((lesson) => lesson.topicId === topic.id)
      .sort((a, b) => a.order - b.order);

    const completedCount = lessons.filter(
      (lesson) => getLessonStatus(lesson.id) === "completed",
    ).length;

    const topicProgress =
      lessons.length > 0
        ? Math.round((completedCount / lessons.length) * 100)
        : 0;

    const isCompleted = lessons.length > 0 && completedCount === lessons.length;

    const hasProgress = lessons.some(
      (lesson) => getLessonStatus(lesson.id) !== "not-started",
    );

    const previousTopicsCompleted = levelTopics
      .slice(0, index)
      .every((previousTopic) => {
        const previousLessons = learningData.lessons.filter(
          (lesson) => lesson.topicId === previousTopic.id,
        );

        return (
          previousLessons.length > 0 &&
          previousLessons.every(
            (lesson) => getLessonStatus(lesson.id) === "completed",
          )
        );
      });

    let status: "completed" | "in-progress" | "available" | "locked";

    if (isCompleted) {
      status = "completed";
    } else if (hasProgress) {
      status = "in-progress";
    } else if (previousTopicsCompleted) {
      status = "available";
    } else {
      status = "locked";
    }

    return {
      ...topic,
      lessons,
      completedCount,
      topicProgress,
      status,
    };
  });

  const activeTopic = topicCards.find(
    (topic) => topic.status === "in-progress" || topic.status === "available",
  );

  const currentLesson = activeTopic?.lessons.find(
    (lesson) => getLessonStatus(lesson.id) !== "completed",
  );

  return (
    <div className={styles["roadmap-page"]}>
      <header className={styles["roadmap-header"]}>
        <div>
          <span className={styles["section-eyebrow"]}>YOUR LEARNING PATH</span>
          <h1>Good morning!</h1>
          <p>Every lesson brings you one step closer to fluency.</p>
        </div>

        <div className={styles["streak-card"]}>
          <span className={styles["streak-number"]}>{mockProgress.streakDays}</span>

          <div>
            <span className={styles["streak-title"]}>Day streak</span>
            <span className={styles["streak-caption"]}>Keep it going</span>
          </div>
        </div>
      </header>

      <section className={styles["progress-section"]}>
        <div className={styles["progress-heading"]}>
          <div>
            <span className={styles["section-eyebrow"]}>YOUR PROGRESS</span>
            <h2>English level</h2>
          </div>

          <span className={styles["level-badge"]}>{currentLevel.code}</span>
        </div>

        <div className={styles["progress-details"]}>
          <div>
            <span className={styles["progress-percentage"]}>{levelProgress}%</span>
            <span className={styles["progress-description"]}>of the level completed</span>
          </div>

          <span className={styles["progress-lessons"]}>
            {completedLessonsCount} of {totalLessonsCount} lessons
          </span>
        </div>

        <div className={styles["progress-track"]}>
          <div
            className={styles["progress-fill"]}
            style={{ width: `${levelProgress}%` }}
          />
        </div>
      </section>

      <section className={styles["continue-section"]}>
        <div className={styles["section-heading"]}>
          <div>
            <span className={styles["section-eyebrow"]}>PICK UP WHERE YOU LEFT OFF</span>
            <h2>Continue learning</h2>
          </div>
        </div>

        {currentLesson ? (
          <div className={styles["current-lesson"]}>
            <div className={styles["lesson-info"]}>
              <div className={styles["lesson-meta"]}>
                <span className={styles["lesson-level"]}>
                  {currentLevel.code} {currentLevel.title.toUpperCase()}
                </span>

                <span className={styles["lesson-duration"]}>
                  {currentLesson.estimatedMinutes} min
                </span>
              </div>

              <h3>{currentLesson.title}</h3>

              <p>{currentLesson.description}</p>

              <Link
                to={`/lesson/${currentLesson.id}`}
                className={styles["lesson-button"]}
              >
                Continue lesson
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className={styles["lesson-decoration"]} aria-hidden="true">
              <span className={styles["decoration-letter"]}>Aa</span>
              <span className={styles["decoration-caption"]}>GRAMMAR</span>
            </div>
          </div>
        ) : (
          <div className={styles["current-lesson"]}>
            <div className={styles["lesson-info"]}>
              <h3>Level completed!</h3>
              <p>
                You have completed all lessons in this level. Keep learning!
              </p>
            </div>
          </div>
        )}
      </section>

      <section className={styles["roadmap-section"]} id="roadmap">
        <div className={styles["roadmap-section-heading"]}>
          <div>
            <span className={styles["section-eyebrow"]}>YOUR CURRICULUM</span>

            <h2>
              {currentLevel.code} · {currentLevel.title}
            </h2>

            <p>{currentLevel.description}</p>
          </div>

          <span className={styles["topic-count"]}>{levelTopics.length} topics</span>
        </div>

        <div className={styles["topics-list"]}>
          {topicCards.map((topic, index) => {
            const cardContent = (
              <>
                <div className={styles["topic-number"]}>
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className={styles["topic-content"]}>
                  <div className={styles["topic-title-row"]}>
                    <h3>{topic.title}</h3>

                    <span className={`${styles["topic-status"]} ${styles[`${topic.status}-status`]}`}>
                      {topic.status === "completed" && "Completed"}
                      {topic.status === "in-progress" && "In progress"}
                      {topic.status === "available" && "Available"}
                      {topic.status === "locked" && "Locked"}
                    </span>
                  </div>

                  <p>{topic.description}</p>

                  {topic.status !== "locked" && (
                    <div className={styles["topic-progress-track"]}>
                      <div
                        className={styles["topic-progress-fill"]}
                        style={{ width: `${topic.topicProgress}%` }}
                      />
                    </div>
                  )}

                  <span className={styles["topic-lessons"]}>
                    {topic.lessons.length} lessons
                    {topic.status !== "locked" &&
                      ` · ${topic.completedCount} completed`}
                  </span>
                </div>

                <span className={styles["topic-arrow"]}>
                  {topic.status === "completed" && "✓"}
                  {topic.status === "in-progress" && "→"}
                  {topic.status === "available" && "→"}
                  {topic.status === "locked" && "⌑"}
                </span>
              </>
            );

            return topic.status === "locked" ? (
              <article
                key={topic.id}
                className={`${styles["topic-card"]} ${styles[`${topic.status}-topic`]}`}
              >
                {cardContent}
              </article>
            ) : (
              <Link
                key={topic.id}
                to={`/topic/${topic.id}`}
                className={`${styles["topic-card"]} ${styles[`${topic.status}-topic`]}`}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </section>

      <footer className={styles["roadmap-footer"]}>
        <span>Consistency matters more than perfection.</span>
        <span>ENGLISHLY</span>
      </footer>
    </div>
  );
};

export default LandingPage;
