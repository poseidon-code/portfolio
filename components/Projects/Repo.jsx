import styles from '../../styles/Projects.module.scss';

import { Folder, Star, Fork } from '../UI/Icons';

const Repo = (props) => (
    <a href={props.url} target='_blank' rel='noopener noreferrer' className={styles.repo}>
        <Folder />
        <p>{props.name}</p>
        <div>
            <span>
                <Star /> {props.stars}
            </span>
            <span>
                <Fork /> {props.forks}
            </span>
        </div>
    </a>
);

export default Repo;
