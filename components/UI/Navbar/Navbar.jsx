import styles from './Navbar.module.scss';
import Link from 'next/link';
import { About, Blog, Contact, Projects, Logo } from '../Icons';

const Navbar = props => {
    return (
        <nav className={styles.navbar} style={{ '--hue': props.color }}>
            <div className={styles.links}>
                <Link href='/projects'>
                    <a tabIndex={1}>
                        <Projects />
                        <span>Projects</span>
                    </a>
                </Link>
                <Link href='/blog'>
                    <a tabIndex={2}>
                        <Blog />
                        <span>Blog</span>
                    </a>
                </Link>
            </div>
            <div className={styles.logo}>
                <Link href='/'>
                    <a tabIndex={3}>
                        <Logo />
                    </a>
                </Link>
            </div>
            <div className={styles.links}>
                <Link href='/about'>
                    <a tabIndex={4}>
                        <About />
                        <span>About</span>
                    </a>
                </Link>
                <Link href='/#contact'>
                    <a tabIndex={5}>
                        <Contact />
                        <span>Contact</span>
                    </a>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
