import styles from '../../styles/Projects.module.scss';

const Stat = (props) => {
    return (
        <div className={styles.stat}>
            {props.icon}
            <h1>{props.number}</h1>
            <span>{props.text}</span>
        </div>
    );
};

export default Stat;
