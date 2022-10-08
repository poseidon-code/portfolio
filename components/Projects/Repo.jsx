import styles from 'styles/Projects.module.scss';

import { Folder, Star, Fork } from '@icons';

const Repo = props => (
    <li>
        <a href={props.url} target='_blank' rel='noopener noreferrer'>
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
    </li>
);

export default Repo;
