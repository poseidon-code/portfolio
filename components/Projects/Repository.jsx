import { Folder, Star, Fork } from '@icons';

const Repository = ({ repository }) => (
    <li>
        <a href={repository.url} target='_blank' rel='noopener noreferrer'>
            <Folder />
            <p>{repository.name}</p>
            <div>
                <span>
                    <Star /> {repository.stars}
                </span>
                <span>
                    <Fork /> {repository.forks}
                </span>
            </div>
        </a>
    </li>
);

export default Repository;
