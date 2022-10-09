import { useState, useEffect } from 'react';

import { Github, ExternalLink } from '@icons';
import { SYMBOLS } from 'utility';

const OSC = ({ osc }) => {
    const [symbol, setSymbol] = useState();
    useEffect(() => {
        setSymbol(Math.floor(Math.random() * SYMBOLS.length));
    }, []);

    return (
        <article>
            <h6 aria-hidden={true}>{SYMBOLS[symbol]}</h6>
            <h1>{osc.name}</h1>
            <p>{osc.description}</p>
            <ul>
                {osc.technologies.map((t, i) => (
                    <li key={i}>{t}</li>
                ))}
            </ul>

            <span>
                {osc.links.github && (
                    <a href={osc.links.github} target='_blank' rel='noopener noreferrer'>
                        <Github />
                    </a>
                )}
                {osc.links.website && (
                    <a href={osc.links.website} target='_blank' rel='noopener noreferrer'>
                        <ExternalLink />
                    </a>
                )}
            </span>
        </article>
    );
};

export default OSC;
