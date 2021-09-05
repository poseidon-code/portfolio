import styles from '../../styles/Home.module.scss';

const Technology = (props) => (
    <li className={styles.technology}>
        {props.icon}
        <h2>{props.technology}</h2>
        <span>{props.text}</span>
    </li>
);

export default Technology;
