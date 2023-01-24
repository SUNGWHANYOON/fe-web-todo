const API_BASE_URL = 'http://localhost:8080';

export const fetchAllData = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/all`);
    if (res.status === 200) {
      return await res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchSections = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/sections`);
    if (res.status === 200) {
      return await res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchSection = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/sections/${id}`);
    if (res.status === 200) {
      return await res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const addSection = async (title) => {
  try {
    const res = await fetch(`${API_BASE_URL}/section`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
      }),
    });
    if (res.status === 200) {
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteSection = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/section/${id}`, {
      method: 'DELETE',
    });
    if (res.status === 200) {
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchTodo = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`);
    if (res.status === 200) {
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const addTodo = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/section/${id}/todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: '',
        content: '',
        type: 'new',
      }),
    });
    if (res.status === 200) {
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (res.status === 200) {
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const alterTodo = async (id, { title, content, type }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: content,
        type: type,
      }),
    });
    if (res.status === 200) {
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const moveTodo = async (fromId, toId, sectionId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/todos/move/${fromId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardId: toId,
        sectionId,
      }),
    });
    if (res.status === 200) {
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};
