import "./PlaceholderPage.css";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
  return (
    <section className="placeholder-page">
      <span className="placeholder-eyebrow">ENGLISH PATH</span>

      <h1>{title}</h1>

      <p>{description}</p>

      <span className="placeholder-status">Under development</span>
    </section>
  );
};

export default PlaceholderPage;
