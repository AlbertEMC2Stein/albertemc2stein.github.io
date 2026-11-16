"use client";

import { useState } from "react";

export default function Citation({ bibtex, filename }) {
  const [message, setMessage] = useState("");

  async function copyCitation() {
    try {
      await navigator.clipboard.writeText(bibtex);
      setMessage("Copied to clipboard.");
    } catch {
      setMessage(
        "Could not copy automatically. Select the citation text to copy it.",
      );
    }
  }

  return (
    <details className="citation">
      <summary>Cite</summary>
      <div className="citation-content">
        <pre>
          <code>{bibtex}</code>
        </pre>
        <div className="citation-actions">
          <button type="button" onClick={copyCitation}>
            Copy BibTeX
          </button>
          <a
            href={`data:application/x-bibtex;charset=utf-8,${encodeURIComponent(bibtex)}`}
            download={`${filename}.bib`}
          >
            Download .bib
          </a>
          <span role="status" aria-live="polite">
            {message}
          </span>
        </div>
      </div>
    </details>
  );
}
