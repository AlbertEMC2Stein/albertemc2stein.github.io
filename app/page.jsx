export default function Home() {
  return (
    <>
      <div className="prototype-note">
        DESIGN STUDY <span>·</span> Visual direction / content illustrative
      </div>
      <header className="header shell">
        <a className="brand" href="#top">
          <span className="brand-symbol">
            T<span>P</span>
          </span>
          <span className="brand-name">
            Tim Prokosch<small>Personal website</small>
          </span>
        </a>
        <nav aria-label="Preview navigation">
          <a href="#about">About</a>
          <a href="#research">Research</a>
          <a href="#projects">Projects</a>
          <a href="#cv">CV</a>
        </nav>
      </header>
      <main id="top">
        <section className="hero shell" id="about">
          <div className="hero-copy">
            <p className="introduction">Mathematician and researcher</p>
            <h1>Tim Prokosch</h1>
            <p className="hero-affiliation">RPTU Kaiserslautern-Landau</p>
            <p className="hero-description">
              I work at the intersection of mathematics, finance, and
              computation, exploring questions through research and software.
            </p>
            <div className="profile-links">
              <span>ORCID</span>
              <span>ResearchGate</span>
              <span>GitHub</span>
              <span>LinkedIn</span>
            </div>
          </div>
          <div className="portrait-composition">
            <div className="portrait-frame">
              <img src="/assets/images/ProfilePicture.png" alt="Tim Prokosch" />
            </div>
          </div>
        </section>
        <section className="intro-section" id="research">
          <div className="shell intro-grid">
            <div className="intro-body">
              <h2>
                Mathematics for
                <br />
                <em>real-world questions</em>
              </h2>
              <div className="intro-columns">
                <p>
                  My work brings together mathematical research, financial
                  applications, and computational methods.
                </p>
                <p className="muted">
                  This space will bring together publications, research
                  interests, and the ideas behind ongoing work.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="publications shell">
          <div className="section-heading">
            <div>
              <h2>Publications</h2>
            </div>
            <span className="section-link">
              View all research <span>↗</span>
            </span>
          </div>
          <div className="publication-row">
            <span className="pub-year">YEAR</span>
            <div>
              <span className="placeholder-label">Publication placeholder</span>
              <h3>Publication title and research context</h3>
              <p>Authors · Journal or conference · Year</p>
            </div>
            <span className="expand">+</span>
          </div>
          <div className="publication-row">
            <span className="pub-year">YEAR</span>
            <div>
              <span className="placeholder-label">Publication placeholder</span>
              <h3>Another selected publication</h3>
              <p>Authors · Journal or conference · Year</p>
            </div>
            <span className="expand">+</span>
          </div>
          <p className="section-footnote">
            Abstracts and full-text links will find their place here.
          </p>
        </section>
        <section className="projects-section" id="projects">
          <div className="shell">
            <div className="section-heading light-heading">
              <div>
                <h2>Selected projects</h2>
              </div>
            </div>
            <div className="project-grid">
              <article className="featured-project">
                <div className="project-art" aria-hidden="true">
                  <div className="chart-grid"></div>
                  <svg viewBox="0 0 600 250" preserveAspectRatio="none">
                    <path d="M0 210 C80 195 100 170 165 180 S260 120 320 130 S420 84 470 78 S550 35 600 25" />
                    <path d="M0 215 C70 190 120 210 190 165 S260 168 330 127 S450 140 510 93 S570 94 600 70" />
                  </svg>
                  <span></span>
                </div>
                <div className="project-content">
                  <div className="project-meta">
                    <span>Financial mathematics</span>
                  </div>
                  <h3>
                    Pension Funding
                    <br />
                    Simulator <span>↗</span>
                  </h3>
                  <p>
                    A computational project exploring pension funding and
                    financial scenarios.
                  </p>
                  <span className="project-tag">Interactive tool</span>
                </div>
              </article>
              <div className="project-side">
                <article>
                  <span>Research software</span>
                  <h3>
                    Physics-informed
                    <br />
                    neural networks <b>↗</b>
                  </h3>
                  <p>Neural networks for differential equations.</p>
                </article>
                <article>
                  <span>Simulation</span>
                  <h3>
                    Contact network
                    <br />
                    simulator <b>↗</b>
                  </h3>
                  <p>Exploring the spread of infectious diseases.</p>
                </article>
                <div className="project-end">
                  More on GitHub <span>↗</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="closing shell" id="cv">
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
                Experience &amp; education <b>↗</b>
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
