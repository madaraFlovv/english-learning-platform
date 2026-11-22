import styles from "./LessonPage.module.css";

import { Link, useParams } from "react-router-dom";

import { learningData } from "../../data/roadmap";
import { lessonContent } from "../../data/exercises/lessons/lessonContent";
import { useProgress } from "../../context/ProgressContext";
import { isLevelUnlocked } from "../../services/levelAccessService";

const LessonPage = () => {
  const { lessonId } = useParams();
  const { progress } = useProgress();

  const lesson = learningData.lessons.find((item) => item.id === lessonId);

  if (!lesson) {
    return (
      <div className={styles["lesson-page"]}>
        <h1>Lesson not found</h1>
        <p>This lesson does not exist.</p>
        <Link to="/">Back to roadmap</Link>
      </div>
    );
  }

  const topic = learningData.topics.find((item) => item.id === lesson.topicId);

  const level = topic
    ? learningData.levels.find((item) => item.id === topic.levelId)
    : undefined;

  if (level && !isLevelUnlocked(level.id, progress.highestVerifiedLevelId)) {
    return (
      <div className={styles["lesson-page"]}>
        <h1>Level locked</h1>
        <p>This lesson is part of {level.code}. Complete the placement test to unlock it.</p>
        <Link to="/placement-test">Take placement test</Link>
        <Link to="/">Back to roadmap</Link>
      </div>
    );
  }

  const content = lessonContent[lesson.id] ?? [];

  const sidebarItems = content.filter(
    (block) => block.type === "heading" || block.type === "rule",
  );

  return (
    <div className={styles["lesson-page"]}>
      <Link
        to={topic ? `/topic/${topic.id}` : "/"}
        className={styles["lesson-back-link"]}
      >
        ← Back to {topic ? topic.title : "roadmap"}
      </Link>

      <header className={styles["lesson-header"]}>
        <div className={styles["lesson-header-info"]}>
          <span className={styles["section-eyebrow"]}>
            {level ? `${level.code} ${level.title.toUpperCase()}` : "LESSON"}
            {" · "}
            {topic?.title.toUpperCase() ?? "ENGLISH"}
          </span>

          <h1>{lesson.title}</h1>

          <p>{lesson.description}</p>
        </div>

        <div className={styles["lesson-header-badge"]}>
          <span>{String(lesson.order).padStart(2, "0")}</span>
          <small>LESSON</small>
        </div>
      </header>

      {content.length > 0 ? (
        <div className={styles["lesson-content"]}>
          <main className={styles["lesson-main"]}>
            {content.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <section className={styles["lesson-block"]} key={index}>
                    <span className={styles["section-eyebrow"]}>
                      SECTION {String(index + 1).padStart(2, "0")}
                    </span>

                    <h2>{block.text}</h2>
                  </section>
                );
              }

              if (block.type === "paragraph") {
                return (
                  <section className={styles["lesson-block"]} key={index}>
                    <p>{block.text}</p>
                  </section>
                );
              }

              if (block.type === "rule") {
                return (
                  <section className={styles["lesson-block"]} key={index}>
                    <span className={styles["section-eyebrow"]}>GRAMMAR RULE</span>

                    <h2>{block.title}</h2>

                    <p>{block.description}</p>
                  </section>
                );
              }

              if (block.type === "example") {
                return (
                  <section className={styles["lesson-example"]} key={index}>
                    <span className={styles["example-label"]}>EXAMPLE</span>

                    <h3>{block.english}</h3>

                    {block.translation && <p>{block.translation}</p>}

                    {block.note && (
                      <span className={styles["lesson-example-note"]}>{block.note}</span>
                    )}
                  </section>
                );
              }

              return null;
            })}
          </main>

          <aside className={styles["lesson-sidebar"]}>
            <div className={styles["lesson-sidebar-card"]}>
              <span className={styles["section-eyebrow"]}>LESSON OVERVIEW</span>

              <h3>{lesson.title}</h3>

              {sidebarItems.map((block, index) => (
                <div className={styles["lesson-sidebar-item"]} key={index}>
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  {block.type === "heading" ? block.text : block.title}
                </div>
              ))}

              <div className={styles["lesson-sidebar-divider"]} />

              <span className={styles["lesson-duration"]}>
                Estimated time: {lesson.estimatedMinutes} min
              </span>
            </div>
          </aside>
        </div>
      ) : (
        <div className={styles["lesson-empty-state"]}>
          <span className={styles["section-eyebrow"]}>COMING SOON</span>

          <h2>Learning material is being prepared</h2>

          <p>
            This lesson is already part of your learning roadmap. Its
            explanation and examples will be added soon.
          </p>
        </div>
      )}

      <footer className={styles["lesson-footer"]}>
        <div>
          <span className={styles["section-eyebrow"]}>READY TO PRACTICE?</span>

          <h2>Test your knowledge</h2>

          <p>Complete a few exercises to reinforce what you have learned.</p>
        </div>

        <Link to={`/exercise/${lesson.id}`} className={styles["lesson-start-button"]}>
          Start exercises
          <span>→</span>
        </Link>
      </footer>
    </div>
  );
};

export default LessonPage;
