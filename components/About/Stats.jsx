import styles from '../../styles/About.module.scss';

const Stats = props => (
    <>
        <div className={styles.bar}>
            {props.stats.map((l, i) => (
                <div key={i} className={styles.language} style={{ '--percent': `${l.percent}%` }}></div>
            ))}
        </div>
        <div className={styles.legends}>
            {props.stats.map((l, i) => (
                <span key={i}>{l.name}</span>
            ))}
        </div>
    </>
);

export default Stats;
