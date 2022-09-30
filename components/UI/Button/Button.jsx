import styles from './Button.module.scss';
import Link from 'next/link';

const Button = props => {
    return props.href ? (
        props.link ? (
            <Link href={props.href}>
                <a className={styles.btn} tabIndex={-1}>
                    <span>{props.children} &rarr;</span>
                </a>
            </Link>
        ) : (
            <a className={styles.btn} tabIndex={-1} href={props.href} {...props}>
                <span>{props.children} &rarr;</span>
            </a>
        )
    ) : (
        <button className={styles.btn} tabIndex={-1} {...props}>
            <span>{props.children} &rarr;</span>
        </button>
    );
};

export default Button;
