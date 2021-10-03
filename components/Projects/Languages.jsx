import styles from '../../styles/Projects.module.scss';

const Languages = (props) => (
    <>
        <div className={styles.bar}>
            {Object.entries(props.stats).map(([key, value], i) => (
                <div key={i} className={styles.language} style={{ '--percent': `${value}%` }}></div>
            ))}
        </div>
        <div className={styles.legends}>
            {Object.keys(props.stats).map((l, i) => (
                <span key={i}>{l}</span>
            ))}
        </div>
    </>
);

export default Languages;
