import BackgroundCanvas from "./components/BackgroundCanvas";
import FormulaBackground from "./components/FormulaBackground";
import PublicationList from "./components/PublicationList";
import SiteHeader from "./components/SiteHeader";
import profile from "./data/profile.json";
import publications from "./data/publications.json";
import projects from "./data/projects.json";

export default function Home() {
  return (
    <>
      <div className="prototype-note">
        DESIGN STUDY <span>·</span> Visual direction / content illustrative
      </div>
      <SiteHeader />
      <main id="top">
        <section className="hero shell" id="about">
          <BackgroundCanvas kind="gbm" fullBleed />
          <div className="hero-copy">
            <p className="introduction">{profile.title}</p>
            <h1>{profile.name}</h1>
            <p className="hero-affiliation">{profile.affiliation}</p>
            <p className="hero-description">{profile.introduction}</p>
            <div
              className="profile-links"
              aria-label="Academic and professional profiles"
            >
              {profile.links.map((link) => (
                <a href={link.url} key={link.label}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="portrait-composition">
            <div className="portrait-frame">
              <img src="/assets/images/ProfilePicture.png" alt="Tim Prokosch" />
            </div>
          </div>
        </section>
        <section className="intro-section" aria-label="About">
          <div className="shell intro-grid">
            <div className="intro-body">
              <h2>
                Mathematics for
                <br />
                <em>real-world questions</em>
              </h2>
              <div className="intro-columns">
                {profile.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          className="publications shell"
          aria-labelledby="selected-research"
        >
          <BackgroundCanvas kind="network-publications" fullBleed />
          <div className="section-heading">
            <h2 id="selected-research">Research</h2>
            <a className="section-link" href="/research/">
              View all research <span aria-hidden="true">↗</span>
            </a>
          </div>
          <PublicationList
            publications={publications.filter((work) => work.featured)}
          />
        </section>
        <section className="projects-section" id="projects">
          <FormulaBackground />
          <div className="shell">
            <div className="section-heading light-heading">
              <div>
                <h2>Selected projects</h2>
              </div>
            </div>
            {projects.map((project) => (
              <article
                className="featured-project project-feature"
                key={project.id}
              >
                <div className="project-art" aria-hidden="true">
                  <div className="chart-grid"></div>
                  <svg viewBox="0 0 600 250" preserveAspectRatio="none">
                    <path d="M0 210 C80 195 100 170 165 180 S260 120 320 130 S420 84 470 78 S550 35 600 25" />
                    <path d="M0 215 C70 190 120 210 190 165 S260 168 330 127 S450 140 510 93 S570 94 600 70" />
                  </svg>
                </div>
                <div className="project-content">
                  <div className="project-meta">
                    <span>{project.category}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-feature__summary">{project.summary}</p>
                  <p>{project.description}</p>
                  <div
                    className="project-feature__tags"
                    aria-label="Project topics"
                  >
                    {project.tags.map((tag) => (
                      <span className="project-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="project-feature__links">
                    {project.links.map((link) => (
                      <a href={link.url} key={link.url}>
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
            <a
              className="project-github"
              href="https://github.com/AlbertEMC2Stein?tab=repositories"
            >
              Browse all repositories <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
        <section className="closing shell" id="cv">
          <BackgroundCanvas kind="network-background" fullBleed />
          <div>
            <h2>
              Background and
              <br />
              <em>recent activity</em>
            </h2>
          </div>
          <div className="closing-right">
            <div>
              <span>Background</span>
              <h3>
                <a className="closing-link" href="/cv/">
                  Experience &amp; education <b>↗</b>
                </a>
              </h3>
              <p>A closer look at my academic and professional background.</p>
            </div>
            <div>
              <span>Updates</span>
              <h3>
                Notes &amp; updates <b>↗</b>
              </h3>
              <p>Research, conferences, and things worth sharing.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <FormulaBackground count={2} />
        <div className="shell footer-inner">
          <div>
            <span className="footer-name">Tim Prokosch</span>
            <p>Mathematics in finance</p>
          </div>
          <span>© 2026 Tim Prokosch</span>
        </div>
      </footer>
    </>
  );
}
