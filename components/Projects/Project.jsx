import { useState, useEffect } from 'react';

import { Github, ExternalLink } from '@icons';
import { SYMBOLS } from 'utility/ProjectsData';

const Project = props => {
    const [symbol, setSymbol] = useState();
    useEffect(() => {
        setSymbol(Math.floor(Math.random() * SYMBOLS.length));
    }, []);

    return (
        <div>
            <h6 aria-hidden={true}>{SYMBOLS[symbol]}</h6>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <ul>
                {props.tech.map((t, i) => (
                    <li key={i}>{t}</li>
                ))}
            </ul>

            <span>
                {props.github && (
                    <a href={props.github} target='_blank' rel='noopener noreferrer'>
                        <Github />
                    </a>
                )}
                {props.website && (
                    <a href={props.website} target='_blank' rel='noopener noreferrer'>
                        <ExternalLink />
                    </a>
                )}
            </span>
        </div>
    );
};

export default Project;
