import React from "react";
import "./Home.css";

const Home = () => {
    return (
        <div className="home-container">
            <div className="loader"></div>

            <h1 className="title">Desbytes</h1>
            <p className="subtitle">Something exceptional is coming soon.</p>
            <p className="description">
                A place where ideas, projects and experiments will come together.
            </p>

            <footer className="footer">
                <span>Contact: </span>
                <a href="mailto:contact@desbytes.com">contact@desbytes.com</a>
            </footer>
        </div>
    );
};

export default Home;