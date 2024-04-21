import axios from "axios";
const URL = "http://localhost:8080";

const endpoints = {
  getIngredients: async (image) => {
    const formData = new FormData();
    formData.append("file", image, image.name);

    try {
      const response = await axios.post(`${URL}/get-ingredients`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los ingredientes:", error);
      return null;
    }
  },
  // getIngredients: async (file) => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   try {
  //     const response = await fetch(`${URL}/get-ingredients`, {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const data = await response.json();
  //     return data.ingredients;
  //   } catch (error) {
  //     console.error("Error al obtener los ingredientes:", error);
  //     return null;
  //   }
  // },

  getRecipe: async (context) => {
    try {
      const response = await fetch(`${URL}/get-recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(context),
      });
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error("Error al obtener la receta:", error);
      return null;
    }
  },
};

export { endpoints };
