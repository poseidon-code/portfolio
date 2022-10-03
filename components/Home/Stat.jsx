import styles from 'styles/Home.module.scss';

const Stat = props => (
    <div className={styles.stat}>
        {props.icon}
        <h1>{props.number}</h1>
        <span>{props.text}</span>
    </div>
);

export default Stat;
