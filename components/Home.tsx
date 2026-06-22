
import React from 'react';
import Hero from './Hero';
import About from './About';
import TechStack from './TechStack';
import Projects from './Projects';
import Contact from './Contact';

interface HomeProps {
    isLoading: boolean;
    isFirstLoad: boolean;
}

const Home: React.FC<HomeProps> = ({ isLoading, isFirstLoad }) => {
    return (
        <main>
            <Hero active={!isLoading} isFirstLoad={isFirstLoad} />
            <About />
            <TechStack />
            <Projects />
            <Contact />
        </main>
    );
};

export default Home;
