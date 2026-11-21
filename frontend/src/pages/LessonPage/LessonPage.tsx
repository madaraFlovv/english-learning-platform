import { Link } from "react-router-dom";
import "./LessonPage.css";

const LessonPage = () => {
  return (
    <div className="lesson-page">
      <Link to="/" className="lesson-back-link">
        ← Back to roadmap
      </Link>

      <header className="lesson-header">
        <div className="lesson-header-info">
          <span className="section-eyebrow">A1 BEGINNER · GRAMMAR</span>

          <h1>Present Simple</h1>

          <p>
            Learn how to describe daily routines, habits and facts using the
            Present Simple tense.
          </p>
        </div>

        <div className="lesson-header-badge">
          <span>01</span>
          <small>LESSON</small>
        </div>
      </header>

      <div className="lesson-content">
        <main className="lesson-main">
          <section className="lesson-block">
            <span className="section-eyebrow">INTRODUCTION</span>

            <h2>What is Present Simple?</h2>

            <p>
              We use Present Simple to talk about things that happen regularly,
              daily routines and facts that are generally true.
            </p>

            <div className="lesson-example">
              <span className="example-label">EXAMPLE</span>
              <h3>I study English every day.</h3>
              <p>Я изучаю английский каждый день.</p>
            </div>
          </section>

          <section className="lesson-block">
            <span className="section-eyebrow">GRAMMAR RULE</span>

            <h2>How to form a sentence</h2>

            <p>
              In most cases, we use the base form of the verb. With he, she and
              it, we add -s or -es.
            </p>

            <div className="grammar-table">
              <div className="grammar-row grammar-heading">
                <span>Subject</span>
                <span>Verb</span>
                <span>Example</span>
              </div>

              <div className="grammar-row">
                <span>I / You / We / They</span>
                <span>work</span>
                <span>I work every day.</span>
              </div>

              <div className="grammar-row">
                <span>He / She / It</span>
                <span>works</span>
                <span>She works every day.</span>
              </div>
            </div>
          </section>

          <section className="lesson-block">
            <span className="section-eyebrow">EXAMPLES</span>

            <h2>See it in context</h2>

            <div className="lesson-examples-list">
              <div className="lesson-example-item">
                <div>
                  <h3>She likes coffee.</h3>
                  <p>Она любит кофе.</p>
                </div>
                <span>01</span>
              </div>

              <div className="lesson-example-item">
                <div>
                  <h3>They play football on Sundays.</h3>
                  <p>Они играют в футбол по воскресеньям.</p>
                </div>
                <span>02</span>
              </div>

              <div className="lesson-example-item">
                <div>
                  <h3>The sun rises in the east.</h3>
                  <p>Солнце встаёт на востоке.</p>
                </div>
                <span>03</span>
              </div>
            </div>
          </section>

          <section className="lesson-tip">
            <span className="section-eyebrow">COMMON MISTAKE</span>

            <h3>Don't forget the -s ending!</h3>

            <p>Incorrect: She work every day.</p>

            <p>Correct: She works every day.</p>

            <span>
              Remember: he, she and it require -s or -es in affirmative
              sentences.
            </span>
          </section>
        </main>

        <aside className="lesson-sidebar">
          <div className="lesson-sidebar-card">
            <span className="section-eyebrow">LESSON OVERVIEW</span>

            <h3>Present Simple</h3>

            <div className="lesson-sidebar-item">
              <span>01</span>
              Introduction
            </div>

            <div className="lesson-sidebar-item">
              <span>02</span>
              Grammar rule
            </div>

            <div className="lesson-sidebar-item">
              <span>03</span>
              Examples
            </div>

            <div className="lesson-sidebar-item">
              <span>04</span>
              Practice
            </div>

            <div className="lesson-sidebar-divider" />

            <span className="lesson-duration">Estimated time: 10–15 min</span>
          </div>
        </aside>
      </div>

      <footer className="lesson-footer">
        <div>
          <span className="section-eyebrow">READY TO PRACTICE?</span>
          <h2>Test your knowledge</h2>
          <p>Complete a few exercises to reinforce what you have learned.</p>
        </div>

        <Link to="/exercise/present-simple" className="lesson-start-button">
          Start exercises
          <span>→</span>
        </Link>
      </footer>
    </div>
  );
};

export default LessonPage;
