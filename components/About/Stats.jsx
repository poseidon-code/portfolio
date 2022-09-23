import styles from '../../styles/About.module.scss';

const Stats = ({ stats }) => (
    <>
        <div className={styles.bars}>
            {stats.map((l, i) => (
                <div
                    key={i}
                    title={`%age of time spent on ${l.name}`}
                    className={styles.language}
                    style={{ '--percent': `${l.percent}%` }}></div>
            ))}
        </div>
        <div className={styles.legends}>
            {stats.map((l, i) => (
                <span key={i} title={`${l.percent}%`}>
                    {l.name}
                </span>
            ))}
        </div>
    </>
);

export default Stats;
