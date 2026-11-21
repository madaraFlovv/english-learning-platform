import "./LessonPage.css";

import { Link, useParams } from "react-router-dom";

import { learningData } from "../../data/roadmap";
import { lessonContent } from "../../data/exercises/lessons/lessonContent";

const LessonPage = () => {
  const { lessonId } = useParams();

  const lesson = learningData.lessons.find((item) => item.id === lessonId);

  if (!lesson) {
    return (
      <div className="lesson-page">
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

  const content = lessonContent[lesson.id] ?? [];

  const sidebarItems = content.filter(
    (block) => block.type === "heading" || block.type === "rule",
  );

  return (
    <div className="lesson-page">
      <Link
        to={topic ? `/topic/${topic.id}` : "/"}
        className="lesson-back-link"
      >
        ← Back to {topic ? topic.title : "roadmap"}
      </Link>

      <header className="lesson-header">
        <div className="lesson-header-info">
          <span className="section-eyebrow">
            {level ? `${level.code} ${level.title.toUpperCase()}` : "LESSON"}
            {" · "}
            {topic?.title.toUpperCase() ?? "ENGLISH"}
          </span>

          <h1>{lesson.title}</h1>

          <p>{lesson.description}</p>
        </div>

        <div className="lesson-header-badge">
          <span>{String(lesson.order).padStart(2, "0")}</span>
          <small>LESSON</small>
        </div>
      </header>

      {content.length > 0 ? (
        <div className="lesson-content">
          <main className="lesson-main">
            {content.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <section className="lesson-block" key={index}>
                    <span className="section-eyebrow">
                      SECTION {String(index + 1).padStart(2, "0")}
                    </span>

                    <h2>{block.text}</h2>
                  </section>
                );
              }

              if (block.type === "paragraph") {
                return (
                  <section className="lesson-block" key={index}>
                    <p>{block.text}</p>
                  </section>
                );
              }

              if (block.type === "rule") {
                return (
                  <section className="lesson-block" key={index}>
                    <span className="section-eyebrow">GRAMMAR RULE</span>

                    <h2>{block.title}</h2>

                    <p>{block.description}</p>
                  </section>
                );
              }

              if (block.type === "example") {
                return (
                  <section className="lesson-example" key={index}>
                    <span className="example-label">EXAMPLE</span>

                    <h3>{block.english}</h3>

                    {block.translation && <p>{block.translation}</p>}

                    {block.note && (
                      <span className="lesson-example-note">{block.note}</span>
                    )}
                  </section>
                );
              }

              return null;
            })}
          </main>

          <aside className="lesson-sidebar">
            <div className="lesson-sidebar-card">
              <span className="section-eyebrow">LESSON OVERVIEW</span>

              <h3>{lesson.title}</h3>

              {sidebarItems.map((block, index) => (
                <div className="lesson-sidebar-item" key={index}>
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  {block.type === "heading" ? block.text : block.title}
                </div>
              ))}

              <div className="lesson-sidebar-divider" />

              <span className="lesson-duration">
                Estimated time: {lesson.estimatedMinutes} min
              </span>
            </div>
          </aside>
        </div>
      ) : (
        <div className="lesson-empty-state">
          <span className="section-eyebrow">COMING SOON</span>

          <h2>Learning material is being prepared</h2>

          <p>
            This lesson is already part of your learning roadmap. Its
            explanation and examples will be added soon.
          </p>
        </div>
      )}

      <footer className="lesson-footer">
        <div>
          <span className="section-eyebrow">READY TO PRACTICE?</span>

          <h2>Test your knowledge</h2>

          <p>Complete a few exercises to reinforce what you have learned.</p>
        </div>

        <Link to={`/exercise/${lesson.id}`} className="lesson-start-button">
          Start exercises
          <span>→</span>
        </Link>
      </footer>
    </div>
  );
};

export default LessonPage;
