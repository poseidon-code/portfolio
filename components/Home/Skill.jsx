import styles from '../../styles/Home.module.scss';

const Skill = props => (
    <li className={styles.skill}>
        <h2>{props.skill}</h2>
    </li>
);

export default Skill;
