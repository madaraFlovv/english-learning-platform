import "./TopicPage.css";

import { Link, useParams } from "react-router-dom";

import { learningData } from "../../data/roadmap";
import { useProgress } from "../../context/ProgressContext";

const TopicPage = () => {
  const { progress: mockProgress } = useProgress();
  const { topicId } = useParams();

  const topic = learningData.topics.find((item) => item.id === topicId);

  if (!topic) {
    return (
      <div className="topic-page">
        <h1>Topic not found</h1>
        <p>This topic does not exist.</p>
        <Link to="/">Back to roadmap</Link>
      </div>
    );
  }

  const level = learningData.levels.find((item) => item.id === topic.levelId);

  const lessons = learningData.lessons
    .filter((lesson) => lesson.topicId === topic.id)
    .sort((a, b) => a.order - b.order);

  const getLessonStatus = (lessonId: string) => {
    return (
      mockProgress.lessonProgress.find(
        (progress) => progress.lessonId === lessonId,
      )?.status ?? "not-started"
    );
  };

  const completedLessonsCount = lessons.filter(
    (lesson) => getLessonStatus(lesson.id) === "completed",
  ).length;

  const topicProgress =
    lessons.length > 0
      ? Math.round((completedLessonsCount / lessons.length) * 100)
      : 0;

  return (
    <div className="topic-page">
      <Link to="/" className="topic-back-link">
        <span aria-hidden="true">←</span>
        Back to roadmap
      </Link>

      <header className="topic-header">
        <div>
          <span className="section-eyebrow">
            {level ? `${level.code} · ${level.title}` : "YOUR CURRICULUM"}
          </span>

          <h1>{topic.title}</h1>

          <p>{topic.description}</p>
        </div>

        <div className="topic-header-badge">
          <span>{lessons.length}</span>
          <span>Lessons</span>
        </div>
      </header>

      <section className="topic-overview">
        <div className="topic-overview-heading">
          <div>
            <span className="section-eyebrow">YOUR PROGRESS</span>
            <h2>Topic progress</h2>
          </div>

          <span className="topic-overview-percentage">{topicProgress}%</span>
        </div>

        <div className="topic-overview-track">
          <div
            className="topic-overview-fill"
            style={{ width: `${topicProgress}%` }}
          />
        </div>

        <span className="topic-overview-caption">
          {completedLessonsCount} of {lessons.length} lessons completed
        </span>
      </section>

      <section className="topic-lessons-section">
        <div className="topic-lessons-heading">
          <div>
            <span className="section-eyebrow">LEARNING MATERIALS</span>
            <h2>Lessons</h2>
          </div>

          <span>{lessons.length} lessons</span>
        </div>

        {lessons.length > 0 ? (
          <div className="topic-lessons-list">
            {lessons.map((lesson, index) => {
              const status = getLessonStatus(lesson.id);

              return (
                <Link
                  key={lesson.id}
                  to={`/lesson/${lesson.id}`}
                  className={`topic-lesson-card ${status}-lesson`}
                >
                  <div className="topic-lesson-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="topic-lesson-content">
                    <div className="topic-lesson-title-row">
                      <h3>{lesson.title}</h3>

                      <span className={`topic-lesson-status ${status}-label`}>
                        {status === "completed" && "Completed"}
                        {status === "in-progress" && "In progress"}
                        {status === "not-started" && "Not started"}
                      </span>
                    </div>

                    <p>{lesson.description}</p>

                    <span className="topic-lesson-duration">
                      {lesson.estimatedMinutes} min
                    </span>
                  </div>

                  <span className="topic-lesson-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="topic-empty-state">
            <h3>No lessons yet</h3>
            <p>Learning materials for this topic will be added later.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default TopicPage;
