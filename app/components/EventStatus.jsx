"use client";

import { useEffect, useState } from "react";

function localDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/** Status is calculated in the browser, so a static export does not go stale. */
export default function EventStatus({ startDate, endDate }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    function updateStatus() {
      const now = new Date();
      const start = localDate(startDate);
      const end = localDate(endDate);
      end.setDate(end.getDate() + 1);
      setStatus(now < start ? "Upcoming" : now < end ? "In progress" : null);
    }

    updateStatus();
    const timer = window.setInterval(updateStatus, 60 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, [startDate, endDate]);

  return status ? <span className="cv-event-status">{status}</span> : null;
}
