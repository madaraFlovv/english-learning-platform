import styles from "../PlaceholderPage.module.css";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
  return (
    <section className={styles["placeholder-page"]}>
      <span className={styles["placeholder-eyebrow"]}>ENGLISHLY</span>

      <h1>{title}</h1>

      <p>{description}</p>

      <span className={styles["placeholder-status"]}>Under development</span>
    </section>
  );
};

export default PlaceholderPage;
