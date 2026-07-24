export default function SiteCard({ site }) {
  return (
    <a
      className="site-card"
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="site-card-img-wrapper">
        <img
          className="site-card-img"
          src={site.screenshot}
          alt={`Screenshot of ${site.title}`}
          loading="lazy"
        />
      </div>
      <div className="site-card-body">
        <h3 className="site-card-title">{site.title}</h3>
        <p className="site-card-desc">{site.description}</p>
        <span className="site-card-link">Visit site →</span>
      </div>
    </a>
  );
}
