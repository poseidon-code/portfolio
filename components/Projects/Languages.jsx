import styles from 'styles/Projects.module.scss';

const Languages = ({ stats }) => (
    <>
        <div className={styles.bars}>
            {stats.map((l, i) => (
                <span
                    key={i}
                    title={`%age of LOC for ${l.language}`}
                    style={{ '--percent': `${l.percentage}%` }}></span>
            ))}
        </div>
        <div className={styles.legends}>
            {stats.map((l, i) => (
                <span key={i} title={`${l.percentage}%`}>
                    {l.language}
                </span>
            ))}
        </div>
    </>
);

export default Languages;
