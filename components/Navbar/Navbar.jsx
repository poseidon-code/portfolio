import styles from './Navbar.module.scss';
import Link from 'next/link';
import { About, Blog, Contact, Projects, Logo } from '../UI/Icons';

const Navbar = (props) => {
    return (
        <nav className={styles.navbar} style={{ '--hue': props.color }}>
            <div className={styles.links}>
                <Link href='/projects'>
                    <a>
                        <Projects />
                        <span>Projects</span>
                    </a>
                </Link>
                <Link href='/blog'>
                    <a>
                        <Blog />
                        <span>Blog</span>
                    </a>
                </Link>
            </div>
            <div className={styles.logo}>
                <Link href='/'>
                    <a>
                        <Logo />
                    </a>
                </Link>
            </div>
            <div className={styles.links}>
                <Link href='/about'>
                    <a>
                        <About />
                        <span>About</span>
                    </a>
                </Link>
                <Link href='/#contact'>
                    <a>
                        <Contact />
                        <span>Contact</span>
                    </a>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
