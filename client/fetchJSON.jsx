export async function fetchJSON(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed ${res.status}`);
  }
  if (res.status === 204) return null;
  return await res.json();
}
