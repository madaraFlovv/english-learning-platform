import "./LandingPage.css";
const LandingPage = () => {
  return (
    <div className="roadmap-page">
      <header className="roadmap-header">
        <div>
          <span className="section-eyebrow">YOUR LEARNING PATH</span>
          <h1>Good morning!</h1>
          <p>Every lesson brings you one step closer to fluency.</p>
        </div>

        <div className="streak-card">
          <span className="streak-number">4</span>
          <div>
            <span className="streak-title">Day streak</span>
            <span className="streak-caption">Keep it going</span>
          </div>
        </div>
      </header>

      <section className="progress-section">
        <div className="progress-heading">
          <div>
            <span className="section-eyebrow">YOUR PROGRESS</span>
            <h2>English level</h2>
          </div>

          <span className="level-badge">A1</span>
        </div>

        <div className="progress-details">
          <div>
            <span className="progress-percentage">15%</span>
            <span className="progress-description">of the level completed</span>
          </div>

          <span className="progress-lessons">3 of 20 lessons</span>
        </div>

        <div className="progress-track">
          <div className="progress-fill" />
        </div>
      </section>

      <section className="continue-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">PICK UP WHERE YOU LEFT OFF</span>
            <h2>Continue learning</h2>
          </div>
        </div>

        <div className="current-lesson">
          <div className="lesson-info">
            <div className="lesson-meta">
              <span className="lesson-level">A1 BEGINNER</span>
              <span className="lesson-duration">10–15 min</span>
            </div>

            <h3>Present Simple</h3>

            <p>
              Learn how to talk about your daily routines, habits and things
              that are always true.
            </p>

            <a href="#roadmap" className="lesson-button">
              Explore your roadmap
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="lesson-decoration" aria-hidden="true">
            <span className="decoration-letter">Aa</span>
            <span className="decoration-caption">GRAMMAR</span>
          </div>
        </div>
      </section>

      <section className="roadmap-section" id="roadmap">
        <div className="roadmap-section-heading">
          <div>
            <span className="section-eyebrow">YOUR CURRICULUM</span>
            <h2>A1 · Beginner</h2>
            <p>Build a strong foundation in English.</p>
          </div>

          <span className="topic-count">4 topics</span>
        </div>

        <div className="topics-list">
          <article className="topic-card completed-topic">
            <div className="topic-number">01</div>

            <div className="topic-content">
              <div className="topic-title-row">
                <h3>Getting started</h3>
                <span className="topic-status completed-status">Completed</span>
              </div>

              <p>Basic vocabulary, greetings and introductions.</p>

              <div className="topic-progress-track">
                <div className="topic-progress-fill full-progress" />
              </div>

              <span className="topic-lessons">4 lessons · 4 completed</span>
            </div>

            <span className="topic-arrow">✓</span>
          </article>

          <article className="topic-card active-topic">
            <div className="topic-number">02</div>

            <div className="topic-content">
              <div className="topic-title-row">
                <h3>Present Simple</h3>
                <span className="topic-status active-status">In progress</span>
              </div>

              <p>Daily routines, habits and basic sentence structure.</p>

              <div className="topic-progress-track">
                <div className="topic-progress-fill partial-progress" />
              </div>

              <span className="topic-lessons">5 lessons · 2 completed</span>
            </div>

            <span className="topic-arrow">→</span>
          </article>

          <article className="topic-card locked-topic">
            <div className="topic-number">03</div>

            <div className="topic-content">
              <div className="topic-title-row">
                <h3>Questions and negatives</h3>
                <span className="topic-status locked-status">Locked</span>
              </div>

              <p>Learn to ask questions and make negative sentences.</p>

              <span className="topic-lessons">4 lessons</span>
            </div>

            <span className="topic-arrow">⌑</span>
          </article>

          <article className="topic-card locked-topic">
            <div className="topic-number">04</div>

            <div className="topic-content">
              <div className="topic-title-row">
                <h3>Everyday vocabulary</h3>
                <span className="topic-status locked-status">Locked</span>
              </div>

              <p>Expand your vocabulary for everyday situations.</p>

              <span className="topic-lessons">7 lessons</span>
            </div>

            <span className="topic-arrow">⌑</span>
          </article>
        </div>
      </section>

      <footer className="roadmap-footer">
        <span>Consistency matters more than perfection.</span>
        <span>ENGLISH PATH</span>
      </footer>
    </div>
  );
};

export default LandingPage;
