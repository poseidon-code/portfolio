import styles from './Footer.module.scss';

const Footer = props => {
    return (
        <section className={styles.footer} style={{ '--hue': props.color }}>
            <p>Made with ❤ using NextJs by yours truly.</p>
            <span>&copy; Pritam Halder 2021</span>
        </section>
    );
};

export default Footer;
