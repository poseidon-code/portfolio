import { useEffect, Fragment } from 'react';
import axios from 'axios';

import styles from '../styles/Home.module.scss';
import { homeData, homeDataStore } from '../utility/HomeData';
import { Project, Skill, Stat, Technology } from '../components/Home';

import { Button, SectionButton } from '../components/UI';
import {
    Clock,
    Visitors,
    Github,
    Frameworks,
    Download,
    Facebook,
    Instagram,
    Linkedin,
    Resume,
    Email,
    Telegram,
} from '../components/UI/Icons';

export const getStaticProps = async () => {
    const { hours, visitors, repos, frameworks } = await homeData();

    return {
        props: {
            stats: { hours, visitors, repos, frameworks },
        },
    };
};

const Home = ({ stats: { hours, visitors, repos, frameworks } }) => {
    useEffect(() => {
        axios.get('https://api.countapi.xyz/hit/pritamh.netlify.app/');
    }, []);

    return (
        <>
            <section className={styles.header}>
                <img src='/images/p4.png' alt='home' title='🌊 A wild Squirtle found !' aria-hidden='true' />
                <h2>Hi, I am</h2>
                <h1>Pritam Halder</h1>
                <h2>I build things for the web.</h2>
            </section>
            <div className={styles.introduction}>
                <section className={styles.cta}>
                    <p>{homeDataStore.introduction}</p>
                    <div>
                        <Button href='#projects' style={{ '--hue': 332 }}>
                            My Projects
                        </Button>
                        <Button href='#contact' style={{ '--hue': 332 }}>
                            Get In Touch
                        </Button>
                    </div>
                </section>

                <section className={styles.stats}>
                    <Stat icon={<Clock />} text='Hours Spent' number={hours} />
                    <Stat icon={<Visitors />} text='Visitors' number={visitors} />
                    <Stat icon={<Github />} text='Github Repos' number={repos} />
                    <Stat icon={<Frameworks />} text='Frameworks' number={frameworks} />
                </section>
            </div>

            <section id='projects' className={styles.projects}>
                <div className={styles.projects_head}>
                    <h1>Featured Projects</h1>
                    <h2>My creative mindset with a core background of computer science yeilded these fine results.</h2>
                </div>
                {homeDataStore.projects.map((project, i) => (
                    <Project key={`project-${i + 1}`} {...project} />
                ))}
                <SectionButton text='Many more projects awaits you :)' link href='/projects'>
                    Check Out
                </SectionButton>
            </section>

            <section className={styles.skills}>
                <div className={styles.skills_head}>
                    <h1>Technical Skills</h1>
                    <h2>
                        Modern technologies & abundant freely accessible learning resources helped me to upgrade from
                        traditional methods to new approaches along with my programming confidence.
                    </h2>
                </div>
                {/* TODO : update @for-thorugh count in Home.module.scss (.skills.skill-body.skill) */}
                <ul className={styles.skills_body}>
                    {homeDataStore.skills.map((skill, i) => (
                        <Skill key={`skill-${i + 1}`} skill={skill} />
                    ))}
                </ul>
                <SectionButton text='Want my skill sets for your project ?' href='#contact'>
                    Hire Me
                </SectionButton>
            </section>

            <section className={styles.technologies}>
                <div className={styles.technologies_head}>
                    <h1>Technologies Tackled</h1>
                    <h2>
                        Experienced with most of the important coding frameworks and proficient in both javascript based
                        backend & frontend development.
                    </h2>
                </div>
                {/* TODO : update @for-thorugh count in Home.module.scss (.technologies.technologies-body.technology) */}
                <ul className={styles.technologies_body}>
                    {homeDataStore.technologies.map((technology, i) => (
                        <Technology key={`technology-${i + 1}`} {...technology} />
                    ))}
                </ul>
                <SectionButton text='Do you want to implement these technologies in your product ?' href='#contact'>
                    Let's Talk
                </SectionButton>
            </section>

            <section className={styles.about}>
                <div className={styles.about_head}>
                    <h1>About Myself</h1>
                    <h2>Success is not final, failure is not fatal, it is the courage to continue that counts.</h2>
                </div>
                <article className={styles.about_body}>
                    <p>
                        {homeDataStore.about.map((line, i) => (
                            <Fragment key={`about-line-${i + 1}`}>
                                {line}
                                <br />
                                <br />
                            </Fragment>
                        ))}
                        <a href='/Resume - Pritam Halder.pdf' download>
                            <Resume />
                            &nbsp;Resume&nbsp;
                            <Download />
                        </a>
                    </p>
                </article>
                <SectionButton text='Wanna know more about my academic experiences ?' link href='/about'>
                    More About Me
                </SectionButton>
            </section>

            <section id='contact' className={styles.contact}>
                <div className={styles.contact_head}>
                    <h1>Contact Me</h1>
                    <h2>Sometimes later becomes never...</h2>
                </div>
                <div className={styles.contact_links}>
                    <a href='mailto:pritamhalder.portfolio@gmail.com' target='_blank' rel='noopener noreferrer'>
                        <Email /> Drop a mail...
                    </a>
                    <a href='t.me/pritam_poseidon' target='_blank' rel='noopener noreferrer'>
                        <Telegram /> Let's have a chat...
                    </a>
                    <a href='https://facebook.com/pritamhalder0506' target='_blank' rel='noopener noreferrer'>
                        <Facebook />
                    </a>
                    <a href='https://instagram.com/pritam.poseidon' target='_blank' rel='noopener noreferrer'>
                        <Instagram />
                    </a>
                    <a href='https://linkedin.com/in/pritamhalder0506' target='_blank' rel='noopener noreferrer'>
                        <Linkedin />
                    </a>
                    <a href='https://github.com/poseidon-code' target='_blank' rel='noopener noreferrer'>
                        <Github />
                    </a>
                </div>
            </section>

            <section className={styles.footer}>
                <p>Made with ❤ using NextJs by yours truly.</p>
                <span>&copy; Pritam Halder 2021</span>
            </section>
        </>
    );
};

export default Home;
