const URL = "http://localhost:8080";

const endpoints = {
  obtenerIngredientes: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${URL}/get-ingredients`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      return data.ingredients;
    } catch (error) {
      console.error('Error al obtener los ingredientes:', error);
      return null;
    }
  },

  obtenerReceta: async (context) => {
    try {
      const response = await fetch(`${URL}/get-recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(context)
      });
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error al obtener la receta:', error);
      return null;
    }
  }
};

export { endpoints };
