import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import { Card, Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import "../Recipes/Recipes.css";
import { endpoints } from "../Services/Index";

function Recipes() {
    const location = useLocation();
    const [recipeMessage, setRecipeMessage] = useState("");

    useEffect(() => {
        const getRecipe = async () => {
            try {
                const response = await endpoints.getRecipe({ ingredients: ["Tomate", "Cebolla", "Limon", "Aceite", "Mayonesa"] });
                setRecipeMessage(response.message);
            } catch (error) {
                console.error("Ocurrió un error al obtener la receta:", error);
            }
        };

        getRecipe();
    }, []);

    // Pantalla de carga
    if (!recipeMessage) {
        return <div>Cargando...</div>;
    }

    const titleIndex = recipeMessage.indexOf("\n\n");
    const ingredientsIndex = recipeMessage.indexOf("\nIngredientes:\n");
    const instructionsIndex = recipeMessage.indexOf("\nInstrucciones:\n");
    const nutritionalInfoIndex = recipeMessage.indexOf("\nInformación nutricional (por porción):\n");

    const title = recipeMessage.substring(0, titleIndex);
    const ingredients = recipeMessage.substring(ingredientsIndex + "\nIngredientes:\n".length, instructionsIndex);
    const instructions = recipeMessage.substring(instructionsIndex + "\nInstrucciones:\n".length, nutritionalInfoIndex);
    let nutritionalInfo = recipeMessage.substring(nutritionalInfoIndex + "\nInformación nutricional (por porción):\n".length);

    // Remove the part after "Tiempo de preparación:"
    const prepTimeIndex = nutritionalInfo.indexOf("Tiempo de preparación:");
    if (prepTimeIndex !== -1) {
        nutritionalInfo = nutritionalInfo.substring(0, prepTimeIndex);
    }

    return (
        <div>
            <Navbar />
            <Row className="rowTitle justify-content-center">
                <Col xs={12} md={12} className="text-center">
                    <h1 className="recipe-title">{title}</h1>
                </Col>
            </Row>
            <Container>
                <Row>
                    <Col xs={12} md={4} className="container_izquierdo order-1 order-md-1">
                        <Card>
                            <Card.Title>Ingredientes</Card.Title>
                            <Card.Body>
                                <ul className="list-unstyled">
                                    {ingredients.split('\n').map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4} className="container_centro order-3 order-md-2">
                        <Card>
                            <Card.Title>Paso a paso</Card.Title>
                            <Card.Body>
                                <ul className="list-unstyled">
                                    {instructions.split('\n').map((instruction, index) => (
                                        <li key={index}>{instruction}</li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4} className="container_derecho order-2 order-md-3">
                        <Card>
                            <Card.Title>Información nutricional</Card.Title>
                            <Card.Body>
                                <ul className="list-unstyled">
                                    {nutritionalInfo.split('\n').map((info, index) => (
                                        <li key={index}>{info}</li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Recipes;
