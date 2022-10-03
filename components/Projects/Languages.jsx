import styles from 'styles/Projects.module.scss';

const Languages = props => (
    <>
        <div className={styles.bar}>
            {props.stats.map((l, i) => (
                <div key={i} className={styles.language} style={{ '--percent': `${l.percentage}%` }}></div>
            ))}
        </div>
        <div className={styles.legends}>
            {props.stats.map((l, i) => (
                <span key={i}>{l.language}</span>
            ))}
        </div>
    </>
);

export default Languages;
