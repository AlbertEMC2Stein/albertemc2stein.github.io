import Citation from "./Citation";

function makeBibtex({ type, key, fields }) {
  const lines = Object.entries(fields).map(
    ([name, value]) => `  ${name} = {${value}},`,
  );
  return `@${type}{${key},\n${lines.join("\n")}\n}\n`;
}

export default function PublicationList({ publications }) {
  return (
    <div className="publication-list">
      {publications.map((work) => (
        <article className="research-entry" key={work.id} id={work.id}>
          <div className="research-entry__year">{work.year}</div>
          <div className="research-entry__body">
            <p className="research-entry__type">{work.type}</p>
            <h3>{work.title}</h3>
            <p className="research-entry__authors">
              {work.authors.map((author, index) => (
                <span key={author.name}>
                  {index > 0 && ", "}
                  {author.url ? (
                    <a href={author.url}>{author.name}</a>
                  ) : (
                    author.name
                  )}
                </span>
              ))}
            </p>
            <p className="research-entry__venue">{work.venue}</p>
            <p className="research-entry__summary">{work.summary}</p>
            <div className="research-entry__links">
              {work.links.map((link) => (
                <a key={link.url} href={link.url}>
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
              {work.related && (
                <a href={work.related.url}>
                  {work.related.label} <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
            <div className="research-entry__details">
              <details className="research-abstract">
                <summary>
                  Abstract{" "}
                  <span className="research-abstract__note">(summary)</span>
                </summary>
                <p>{work.abstract}</p>
              </details>
              <Citation
                bibtex={makeBibtex(work.citation)}
                filename={work.citation.key}
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
