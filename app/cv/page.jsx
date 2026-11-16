import BackgroundCanvas from "../components/BackgroundCanvas";
import SiteHeader from "../components/SiteHeader";
import cv from "../data/cv.json";
import profile from "../data/profile.json";

export const metadata = {
  title: "CV — Tim Prokosch",
  description: "Education and professional experience of Tim Prokosch.",
};

function Timeline({ title, entries }) {
  return (
    <section className="cv-group" aria-labelledby={title.toLowerCase()}>
      <h2 id={title.toLowerCase()}>{title}</h2>
      <ol className="cv-timeline">
        {entries.map((entry) => (
          <li className="cv-entry" key={`${entry.role}-${entry.organisation}`}>
            <p className="cv-period">{entry.period}</p>
            <div>
              <h3>{entry.role}</h3>
              <p className="cv-organisation">
                {entry.organisation}, {entry.location}
              </p>
              {entry.detail && <p className="cv-detail">{entry.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function CvPage() {
  return (
    <>
      <SiteHeader />
      <main className="cv-page shell">
        <BackgroundCanvas kind="network-cv" fullBleed />
        <div className="cv-intro">
          <p className="cv-eyebrow">{profile.name}</p>
          <h1>Curriculum vitae</h1>
          <p>Education and professional experience</p>
        </div>
        <div className="cv-content">
          <Timeline title="Experience" entries={cv.experience} />
          <Timeline title="Education" entries={cv.education} />
          <section className="cv-group" aria-labelledby="languages">
            <h2 id="languages">Languages</h2>
            <ul className="cv-languages">
              {cv.languages.map((item) => (
                <li key={item.language}>
                  <span>{item.language}</span>
                  <span>{item.level}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <a className="cv-back" href="/">
          ← Back to the homepage
        </a>
      </main>
      <footer className="footer">
        <div className="shell footer-inner">
          <div>
            <span className="footer-name">{profile.name}</span>
            <p>Mathematics in finance</p>
          </div>
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
        </div>
      </footer>
    </>
  );
}
