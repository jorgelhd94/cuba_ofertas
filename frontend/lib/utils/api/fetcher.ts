export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const postFetcher = (url: string, body?: any, method?: "DELETE") =>
  fetch(url, {
    method: method ? method : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => res.json());
