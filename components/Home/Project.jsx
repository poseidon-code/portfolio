import styles from 'styles/Home.module.scss';
import { Github, ExternalLink } from '@icons';

const Project = props => (
    <section className={styles.project}>
        <div className={styles.text}>
            <h1>{props.name}</h1>
            <span>{props.description}</span>
            <ul title='Technologies'>
                {props.tech.map((t, i) => (
                    <li key={i}>{t}</li>
                ))}
            </ul>

            <div>
                {props.github && (
                    <a tabIndex={-1} href={props.github} target='_blank' rel='noopener noreferrer'>
                        <Github />
                    </a>
                )}
                {props.deploy && (
                    <a tabIndex={-1} href={props.deploy} target='_blank' rel='noopener noreferrer'>
                        <ExternalLink />
                    </a>
                )}
            </div>
        </div>
        <div className={styles.image}></div>
    </section>
);

export default Project;
