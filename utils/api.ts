import axios from "axios";

export const getAllNotes = async () => {
  try {
    const response = await axios.get("http://localhost:3001/notes");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const postUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    // Make the POST request
    const response = await axios.post("http://localhost:3001/user", {
      user_name: name,
      user_email: email,
      password: password,
    });
    return response;
  } catch (error: any) {
    console.error("Error posting data:", error);
  }
};

export const postNotes = async (
  title: string,
  notes: string,
  userId: string
) => {
  try {
    // Make the POST request
    const response = await axios.post("http://localhost:3001/notes/add", {
      note_title: title,
      note_content: notes,
      user_id: userId,
    });
    return response;
  } catch (error: any) {
    console.error("Error posting data:", error);
  }
};

export const updateNotes = async (
  userId: string,
  noteId: string,
  data: any
) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/notes/update/${userId}/${noteId}`,
      { ...data }
    );
    return response;
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const deleteNotes = async (userId: string, noteId: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/notes/delete/${userId}/${noteId}`
    );
    return response;
  } catch (error) {
    console.error("Error posting data:", error);
  }
};
