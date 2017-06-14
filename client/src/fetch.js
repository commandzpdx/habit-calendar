export default function fetch(options) {
  const { method, path, body, token } = options;
  return fetch(`http://localhost:8000${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res;
    })
    .then(res => res.json());
}
