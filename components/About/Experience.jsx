import styles from '../../styles/About.module.scss';
import { ExternalLink } from '../UI/Icons';

const Experience = ({ experience, key }) => {
    return (
        <div key={`experience-${key}`} className={styles.ExperiencesBody}>
            <h6 aria-hidden={true}>{experience.symbol}</h6>
            <h2>{experience.type}</h2>
            <h4 title='Duration'>{experience.duration}</h4>
            <h1 title='Experience'>{experience.name}</h1>
            {experience.organisation ? (
                <h4 title='Organisation'>
                    Organisation - {experience.organisation.name} | {experience.organisation.type}
                </h4>
            ) : experience.designation ? (
                <h4 title='Designation'>
                    Designation - {experience.designation.name} | {experience.designation.type}
                </h4>
            ) : null}
            <a href={experience.link.url} target='_blank' rel='noopener noreferrer'>
                <ExternalLink /> {experience.link.text}
            </a>
            <br /> <br />
            <p title='Description'>{experience.description}</p>
            {experience.work && (
                <>
                    <br />
                    <ul className={styles.work}>
                        {experience.work.map((w, wi) => (
                            <li key={`experience-${key}-work-${wi}`}>{w}</li>
                        ))}
                    </ul>
                </>
            )}
            {!experience.work && experience.backend && (
                <>
                    <br />
                    <div className={styles.stack}>
                        <h3>BACKEND</h3>
                        <span>
                            &nbsp;|&nbsp;
                            {experience.backend.stack.map(
                                (s, si) => `${s}${si + 1 != experience.backend.stack.length ? ' - ' : ''}`
                            )}
                        </span>
                        <ul className={styles.work}>
                            {experience.backend.work.map((w, wi) => (
                                <li key={`experience-${key}-backend-work-${wi}`}>{w}</li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
            {!experience.work && experience.frontend && (
                <>
                    <br />
                    <div className={styles.stack}>
                        <h3>FRONTEND</h3>
                        <span>
                            &nbsp;|&nbsp;
                            {experience.frontend.stack.map(
                                (s, si) => `${s}${si + 1 != experience.frontend.stack.length ? ' - ' : ''}`
                            )}
                        </span>
                        <ul className={styles.work}>
                            {experience.frontend.work.map((w, wi) => (
                                <li key={`experience-${key}-frontend-work-${wi}`}>{w}</li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default Experience;
