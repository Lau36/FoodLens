import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import "../Recipes/Recipes.css";
import { endpoints } from "../Services/Index";
import Lottie from 'react-lottie';
import animationData from '../Resources/Animation - 1713830566540.json';
import loading from '../Resources/Animation - 1713830916863.json';

function Recipes() {
    const location = useLocation();
    const ingredients = location.state;
    const [recipeMessage, setRecipeMessage] = useState("");

    useEffect(() => {
        const getRecipe = async () => {
            try {
                const response = await endpoints.getRecipe({ ingredients: ingredients });
                setRecipeMessage(response.message);
            } catch (error) {
                console.error("Ocurrió un error al obtener la receta:", error);
            }
        };

        getRecipe();
    }, [ingredients]);

    if (!recipeMessage) {
        return (
            <div>
                <Navbar />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', marginTop: '70px' }}>
                    <Lottie
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: animationData,
                        }}
                        height={300}
                        width={300}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                    <Lottie
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: loading,
                        }}
                        height={200}
                        width={200}
                    />
                </div>
            </div>
        );
    }


    function obtenerTitulo(recipeMessage) {
        const regex = /Receta:\s*(.*)\n/;
        const match = recipeMessage.match(regex);
        if (match && match[1]) {
            return match[1].trim();
        }

        const regexInicio = /^[A-Z].*?:/;
        const matchInicio = recipeMessage.match(regexInicio);
        if (matchInicio) {
            return matchInicio[0].slice(0, -1).trim();
        }

        return null;
    }

    const title = obtenerTitulo(recipeMessage);
    const ingredientsIndex = recipeMessage.indexOf("\nIngredientes:\n");
    const instructionsIndex = recipeMessage.indexOf("\nInstrucciones:\n");
    const nutritionalInfoIndex = recipeMessage.indexOf("\nInformación nutricional (por porción):\n");
    const ingredientsRecipe = recipeMessage.substring(ingredientsIndex + "\nIngredientes:\n".length, instructionsIndex);
    const instructions = recipeMessage.substring(instructionsIndex + "\nInstrucciones:\n".length, nutritionalInfoIndex);
    let nutritionalInfo = recipeMessage.substring(nutritionalInfoIndex + "\nInformación nutricional (por porción):\n".length);

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
                                    {ingredientsRecipe.split('\n').map((ingredientsRecipe, index) => (
                                        <li key={index}>{ingredientsRecipe}</li>
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
                <Row className="rowBottom justify-content-center mt-4">
                    <Col xs={1} md={2} className="text-center">
                        <Link to="/Foto">
                            <Button className="buttonBack">
                                &#8592; Volver a tomar foto
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Recipes;
