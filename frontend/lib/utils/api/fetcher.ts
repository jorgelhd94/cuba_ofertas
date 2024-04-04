export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const postFetcher = (url: string, body?: any) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => res.json());
