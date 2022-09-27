import styles from '../../styles/About.module.scss';

const Education = ({ education, key }) => {
    return (
        <div key={`education-${key}`} className={styles.EducationBody}>
            <h6 aria-hidden={true}>{education.symbol}</h6>
            <h2>{education.type}</h2>
            <h4 title='Subject Course'>{education.domain}</h4>
            <h1 title='Institute Name'>{education.name}</h1>
            <h4 title='Education Board'>{education.board}</h4>
            <br />
            <ul>
                {education.periods.map((period, pi) => (
                    <li key={`education-${key}-period-${pi}`}>
                        <span>{period.time}</span>
                        <span>{period.location}</span>
                    </li>
                ))}
            </ul>
            <br />
            <h2 title='Graduation Time'>{education.graduation}</h2>
            <span title='Subject Score'>
                {education.subject} | {education.score}
            </span>
        </div>
    );
};

export default Education;
