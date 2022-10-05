import styles from 'styles/Home.module.scss';
import { Github, ExternalLink } from '@icons';

const Project = ({ project }) => (
    <section className={styles.project}>
        <div className={styles.text}>
            <h1>{project.name}</h1>
            <span>{project.description}</span>
            <ul title='Technologies'>
                {project.tech.map((t, i) => (
                    <li key={i}>{t}</li>
                ))}
            </ul>

            <div>
                {project.github && (
                    <a tabIndex={-1} href={project.github} target='_blank' rel='noopener noreferrer'>
                        <Github />
                    </a>
                )}
                {project.deploy && (
                    <a tabIndex={-1} href={project.deploy} target='_blank' rel='noopener noreferrer'>
                        <ExternalLink />
                    </a>
                )}
            </div>
        </div>
        <div className={styles.image}></div>
    </section>
);

export default Project;
