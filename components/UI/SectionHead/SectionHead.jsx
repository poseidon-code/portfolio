import styles from './SectionHead.module.scss';

const SectionHead = props => (
    <div className={styles.SectionHead} style={props.style}>
        {/* prettier-ignore */}
        <style jsx>{`div { background-image: url(${props.background});}`}</style>
        <h1>{props.title}</h1>
        <h2>{props.text}</h2>
    </div>
);

export default SectionHead;
