import Link from 'next/link';
import styles from './SectionButton.module.scss';

const SectionButton = props => {
    return (
        <div className={styles.SectionButton} style={props.style}>
            <h1>{props.text}</h1>
            {props.link ? (
                <Link href={props.href}>
                    <a tabIndex={-1}>
                        {/* prettier-ignore */}
                        <style jsx>{`a { background-image: url('${props.background}'); }`}</style>
                        <span>{props.children} &rarr;</span>
                    </a>
                </Link>
            ) : (
                <a tabIndex={-1} href={props.href} target={props.target} rel={props.rel}>
                    {/* prettier-ignore */}
                    <style jsx>{`a { background-image: url('${props.background}'); }`}</style>
                    <span>{props.children} &rarr;</span>
                </a>
            )}
        </div>
    );
};

export default SectionButton;
