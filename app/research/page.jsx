import BackgroundCanvas from "../components/BackgroundCanvas";
import PublicationList from "../components/PublicationList";
import SiteHeader from "../components/SiteHeader";
import publications from "../data/publications.json";
import profile from "../data/profile.json";

export const metadata = {
  title: "Research — Tim Prokosch",
  description:
    "Research articles, conference work, and theses by Tim Prokosch.",
};

export default function ResearchPage() {
  return (
    <>
      <SiteHeader />
      <main className="research-page shell">
        <BackgroundCanvas kind="network-research-page" fullBleed />
        <div className="cv-intro">
          <p className="cv-eyebrow">{profile.name}</p>
          <h1>Research</h1>
          <p>Articles, conference work, and theses</p>
        </div>
        <PublicationList publications={publications} />
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
