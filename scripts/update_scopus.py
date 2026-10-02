#!/usr/bin/env python3
import json
import os
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

AUTHOR_ID = "56187150200"
API_KEY = os.environ.get("SCOPUS_API_KEY", "").strip()
OUT = Path("data/scopus-publications.json")

if not API_KEY:
    print("SCOPUS_API_KEY is not configured; keeping existing publication data.")
    raise SystemExit(0)

HEADERS = {
    "Accept": "application/json",
    "X-ELS-APIKey": API_KEY,
    "User-Agent": "NTUST-GAST-Tsai-Lab/1.0",
}

def get_json(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=60) as response:
        return json.loads(response.read().decode("utf-8"))

def as_int(value):
    try:
        return int(value)
    except (TypeError, ValueError):
        return None

# Author-level metrics
metrics = {}
try:
    author_url = (
        "https://api.elsevier.com/content/author/author_id/"
        + AUTHOR_ID
        + "?view=METRICS"
    )
    author_payload = get_json(author_url)
    response = (author_payload.get("author-retrieval-response") or [{}])[0]
    core = response.get("coredata", {}) or {}

    metrics["document_count"] = as_int(
        core.get("document-count") or core.get("document_count")
    )
    metrics["citation_count"] = as_int(
        core.get("citation-count")
        or core.get("citation_count")
        or core.get("cited-by-count")
    )
    metrics["h_index"] = as_int(
        core.get("h-index") or core.get("h_index")
    )
except Exception as exc:
    print("Author metrics warning:", exc)

# Publication records
publications = []
start = 0
count = 25

while True:
    params = urllib.parse.urlencode({
        "query": f"AU-ID({AUTHOR_ID})",
        "start": start,
        "count": count,
        "sort": "-coverDate",
        "view": "STANDARD",
    })

    payload = get_json(
        "https://api.elsevier.com/content/search/scopus?" + params
    )
    search = payload.get("search-results", {}) or {}
    entries = search.get("entry", []) or []

    for entry in entries:
        links = entry.get("link", []) or []
        scopus_url = ""
        for link in links:
            if isinstance(link, dict) and link.get("@ref") == "scopus":
                scopus_url = link.get("@href", "")
                break

        date = entry.get("prism:coverDate", "") or ""
        publications.append({
            "title": entry.get("dc:title", "") or "",
            "creator": entry.get("dc:creator", "") or "",
            "journal": entry.get("prism:publicationName", "") or "",
            "date": date,
            "year": date[:4] if date else "",
            "volume": entry.get("prism:volume", "") or "",
            "issue": entry.get("prism:issueIdentifier", "") or "",
            "pages": entry.get("prism:pageRange", "") or "",
            "doi": entry.get("prism:doi", "") or "",
            "eid": entry.get("eid", "") or "",
            "document_type": entry.get("subtypeDescription", "") or "",
            "cited_by": as_int(entry.get("citedby-count")),
            "scopus_url": scopus_url,
        })

    total = as_int(search.get("opensearch:totalResults")) or len(publications)
    start += len(entries)

    if not entries or start >= total:
        break

data = {
    "source": "Scopus",
    "author_id": AUTHOR_ID,
    "updated_at": datetime.now(timezone.utc).isoformat(),
    "metrics": {k: v for k, v in metrics.items() if v is not None},
    "publication_count": len(publications),
    "publications": publications,
}

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(
    json.dumps(data, ensure_ascii=False, indent=2),
    encoding="utf-8",
)

print(f"Wrote {len(publications)} publications to {OUT}")
