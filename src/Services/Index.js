import axios from 'axios';
const URL = "http://127.0.0.1:8000";

const endpoints = {
  getIngredients: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(`${URL}/get-ingredients`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.ingredients;
    } catch (error) {
      console.error("Error al obtener los ingredientes:", error);
      return null;
    }
  },
  getRecipe: async (context) => {
    try {
      const response = await axios.post(`${URL}/get-recipe`, context, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.message;
    } catch (error) {
      console.error("Error al obtener la receta:", error);
      return null;
    }
  },
};

export { endpoints, URL };