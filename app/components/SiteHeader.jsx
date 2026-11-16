import profile from "../data/profile.json";

export default function SiteHeader() {
  return (
    <header className="header shell">
      <a className="brand" href="/" aria-label={`${profile.name}, home`}>
        <span className="brand-symbol" aria-hidden="true">
          T<span>P</span>
        </span>
        <span className="brand-name">
          {profile.name}
          <small>Personal website</small>
        </span>
      </a>
      <nav aria-label="Main navigation">
        <a href="/#about">About</a>
        <a href="/#research">Research</a>
        <a href="/#projects">Projects</a>
        <a href="/cv/">CV</a>
      </nav>
    </header>
  );
}
