import axios from "axios";
import axiosService from "./axios";

// export const getAllNotes = async () => {
//   try {
//     const response = await axios.get("http://localhost:3001/notes");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return [];
//   }
// };

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
) => {
  try {
    // Make the POST request
    const response = await axiosService.post("http://localhost:3001/notes/add", {
      note_title: title,
      note_content: notes,
    });
    return response;
  } catch (error: any) {
    console.log(error);
    
  }
};

export const updateNotes = async (
  noteId: string,
  data: any
) => {
  try {
    const response = await axiosService.put(
      `http://localhost:3001/notes/update/${noteId}`,
      { ...data }
    );
    return response;
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const deleteNotes = async (noteId: string) => {
  try {
    const response = await axiosService.delete(
      `http://localhost:3001/notes/delete/${noteId}`
    );
    return response;
  } catch (error) {
    console.error("Error posting data:", error);
  }
};


// sign in

export const userSignIn = async (
  email: string,
  password: string
):Promise<{ access_token?: string; payload?: any; success: boolean }> => {
  try {
    // Make the POST request
    const response = await axios.post("http://localhost:3001/auth/login", {
      username: email,
      password: password,
    });
    return response.data;
  } catch (error: any) {
   return {success: false}
  }
};

export const getAllNotesData = async() => {
  try {
    const response = await axiosService.get('http://localhost:3001/notes');
    return response.data;
  } catch (error) {
    return {success: false}
  }
}