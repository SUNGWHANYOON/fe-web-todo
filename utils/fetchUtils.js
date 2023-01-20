async function fetchPost(storage, bodyData) {
  const url = "http://localhost:3000/" + storage;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
}

async function fetchDelete(storage, idx) {
  const url = "http://localhost:3000/" + storage + "/" + idx;
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function fetchPut(storage, idx, bodyData) {
  const url = "http://localhost:3000/" + storage + "/" + idx;
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
}

async function getJSONData(storage) {
  const url = "http://localhost:3000/" + storage;
  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();
  return data;
}

export { fetchPost, fetchDelete, fetchPut, getJSONData };

