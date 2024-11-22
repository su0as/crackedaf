const API_BASE = 'https://hacker-news.firebaseio.com/v0';

export async function fetchItem(id: number) {
  const response = await fetch(`${API_BASE}/item/${id}.json`);
  return response.json();
}

export async function fetchTopStories() {
  const response = await fetch(`${API_BASE}/topstories.json`);
  const ids = await response.json();
  return Promise.all(ids.slice(0, 30).map(fetchItem));
}

export async function fetchNewStories() {
  const response = await fetch(`${API_BASE}/newstories.json`);
  const ids = await response.json();
  return Promise.all(ids.slice(0, 30).map(fetchItem));
}

export async function fetchShowStories() {
  const response = await fetch(`${API_BASE}/showstories.json`);
  const ids = await response.json();
  return Promise.all(ids.slice(0, 30).map(fetchItem));
}

export async function fetchAskStories() {
  const response = await fetch(`${API_BASE}/askstories.json`);
  const ids = await response.json();
  return Promise.all(ids.slice(0, 30).map(fetchItem));
}