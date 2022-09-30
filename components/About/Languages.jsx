import styles from '../../styles/About.module.scss';

const Languages = ({ stats }) => (
    <>
        <div className={styles.bars}>
            {stats.map((l, i) => (
                <span key={i} title={`%age of time spent on ${l.name}`} style={{ '--percent': `${l.percent}%` }}></span>
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

export default Languages;
