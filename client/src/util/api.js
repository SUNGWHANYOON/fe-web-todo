const API_BASE_URL = 'http://localhost:8080';

export const fetchSections = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/sections`);
    if (res.status === 200) {
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const addSection = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/sections/${id}`);
    if (res.status === 200) {
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteSection = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/sections/${id}`, {
      method: 'DELETE',
    });
    if (res.status === 200) {
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
};
