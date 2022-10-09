import { useState, useEffect } from 'react';

import { Github, ExternalLink } from '@icons';
import { SYMBOLS } from 'utility';

const Project = ({ project }) => {
    const [symbol, setSymbol] = useState();
    useEffect(() => {
        setSymbol(Math.floor(Math.random() * SYMBOLS.length));
    }, []);

    return (
        <div>
            <h6 aria-hidden={true}>{SYMBOLS[symbol]}</h6>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <ul>
                {project.technologies.map((t, i) => (
                    <li key={i}>{t}</li>
                ))}
            </ul>

            <span>
                {project.links.github && (
                    <a href={project.links.github} target='_blank' rel='noopener noreferrer'>
                        <Github />
                    </a>
                )}
                {project.links.website && (
                    <a href={project.links.website} target='_blank' rel='noopener noreferrer'>
                        <ExternalLink />
                    </a>
                )}
            </span>
        </div>
    );
};

export default Project;
