import { useState, useEffect } from 'react';
import styles from 'styles/Projects.module.scss';

import { Github, ExternalLink } from '@icons';
import { SYMBOLS } from 'utility/ProjectsData';

const Project = props => {
    const [symbol, setSymbol] = useState();
    useEffect(() => {
        setSymbol(Math.floor(Math.random() * SYMBOLS.length));
    }, []);

    return (
        <div className={styles.project}>
            <h1>{SYMBOLS[symbol]}</h1>
            <h1>{props.name}</h1>
            <span>{props.description}</span>
            <ul>
                {props.tech.map((t, i) => (
                    <li key={i}>{t}</li>
                ))}
            </ul>

            <div>
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
            </div>
        </div>
    );
};

export default Project;
