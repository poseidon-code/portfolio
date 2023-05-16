import { Fragment } from 'react';
// import axios from 'axios';

import SectionButton from 'components/UI/SectionButton';
import SectionHead from 'components/UI/SectionHead';
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
} from '@icons';

import styles from 'styles/Home.module.scss';
import { homeData, homeDataStore } from 'utility/HomeData';
import { Project, Skill, Stat, Technology } from 'components/Home';

export const getStaticProps = async () => {
    const { hours, visitors, repos, frameworks } = await homeData();

    return {
        props: {
            stats: { hours, visitors, repos, frameworks },
        },
    };
};

const Home = ({ stats: { hours, visitors, repos, frameworks } }) => {
    // useEffect(() => {
    //     // axios.get('https://api.countapi.xyz/hit/pritamh.netlify.app/'); // API not working
    // }, []);

    return (
        <>
            <section className={styles.header}>
                <img src='/images/p4.png' alt='home' title='🌊 A wild Squirtle found !' aria-hidden='true' />
                <h2>Hi, I am</h2>
                <h1>Pritam Halder</h1>
                <h2>I build things for the web.</h2>
            </section>

            <div className={styles.Introduction} tabIndex={6}>
                <section className={styles.CTA}>
                    <p>{homeDataStore.introduction}</p>
                    <div>
                        <a tabIndex={-1} href='#projects'>
                            <span>My Projects &rarr;</span>
                        </a>
                        <a tabIndex={-1} href='#contact'>
                            <span>Get In Touch &rarr;</span>
                        </a>
                    </div>
                </section>

                <section className={styles.Stats}>
                    <Stat icon={<Clock />} text='Hours Spent' number={hours} />
                    <Stat icon={<Visitors />} text='Visitors' number={visitors} />
                    <Stat icon={<Github />} text='Github Repos' number={repos} />
                    <Stat icon={<Frameworks />} text='Frameworks' number={frameworks} />
                </section>
            </div>

            <section id='projects' className={styles.Projects} tabIndex={7}>
                <SectionHead
                    style={{ '--hue': 238 }}
                    background='backgrounds/bg-2.jpg'
                    title='Featured Projects'
                    text='My creative mindset with a core background of computer science yeilded these fine results.'
                />
                {homeDataStore.projects.map((project, i) => (
                    <Project key={`project-${i}`} project={project} />
                ))}
                <SectionButton
                    style={{ '--hue': 238 }}
                    background='backgrounds/bg-2.jpg'
                    text='Many more projects awaits you :)'
                    link
                    href='/projects'>
                    Check Out
                </SectionButton>
            </section>

            <section className={styles.Skills} tabIndex={8}>
                <SectionHead
                    style={{ '--hue': 299 }}
                    background='backgrounds/bg-3.jpg'
                    title='Technical Skills'
                    text='Modern technologies & abundant freely accessible learning resources helped me to upgrade from
                    traditional methods to new approaches along with my programming confidence.'
                />
                {/* TODO : update @for-through count in Home.module.scss (.Skills.SkillsBody.ul.li) */}
                <ul>
                    {homeDataStore.skills.map((skill, i) => (
                        <Skill key={`skill-${i}`} skill={skill} />
                    ))}
                </ul>
                <SectionButton
                    style={{ '--hue': 299 }}
                    background='backgrounds/bg-3.jpg'
                    text='Want my skill sets for your project ?'
                    href='#contact'>
                    Hire Me
                </SectionButton>
            </section>

            <section className={styles.Technologies} tabIndex={9}>
                <SectionHead
                    style={{ '--hue': 120 }}
                    background='backgrounds/bg-4.jpg'
                    title='Technologies Tackled'
                    text='Experienced with most of the important coding frameworks and proficient in both javascript based
                    backend & frontend development.'
                />
                {/* TODO : update @for-through count in Home.module.scss (.Technologies.ul.technology) */}
                <ul>
                    {homeDataStore.technologies.map((technology, i) => (
                        <Technology key={`technology-${i}`} technology={technology} />
                    ))}
                </ul>
                <SectionButton
                    style={{ '--hue': 120 }}
                    background='backgrounds/bg-4.jpg'
                    text='Do you want to implement these technologies in your product ?'
                    href='#contact'>
                    Let's Talk
                </SectionButton>
            </section>

            <section className={styles.About} tabIndex={10}>
                <SectionHead
                    style={{ '--hue': 189 }}
                    background='backgrounds/bg-5.jpg'
                    title='About Myself'
                    text='Success is not final, failure is not fatal, it is the courage to continue that counts.'
                />
                <article>
                    <p>
                        {homeDataStore.about.map((line, i) => (
                            <Fragment key={`about-line-${i}`}>
                                {line} <br /> <br />
                            </Fragment>
                        ))}
                        <a tabIndex={11} href='/Resume - Pritam Halder.pdf' download>
                            <Resume /> &nbsp;Resume&nbsp; <Download />
                        </a>
                    </p>
                </article>
                <SectionButton
                    style={{ '--hue': 189 }}
                    background='backgrounds/bg-5.jpg'
                    text='Wanna know more about my academic experiences ?'
                    link
                    href='/about'>
                    More About Me
                </SectionButton>
            </section>

            <section id='contact' className={styles.Contact} tabIndex={12}>
                <SectionHead
                    style={{ '--hue': 0 }}
                    background='backgrounds/bg-6.jpg'
                    title="Let's Connect"
                    text='Sometimes later becomes never...'
                />
                <div className={styles.contact_links}>
                    <a
                        style={{ gridArea: 'mail' }}
                        tabIndex={-1}
                        href='mailto:pritamhalder.portfolio@gmail.com'
                        target='_blank'
                        rel='noopener noreferrer'>
                        <Email /> Drop a mail...
                    </a>
                    <a
                        style={{ gridArea: 'telegram' }}
                        tabIndex={-1}
                        href='t.me/pritam_poseidon'
                        target='_blank'
                        rel='noopener noreferrer'>
                        <Telegram /> Let's have a chat...
                    </a>
                    <a
                        style={{ gridArea: 'link1' }}
                        tabIndex={-1}
                        href='https://facebook.com/pritamhalder0506'
                        target='_blank'
                        rel='noopener noreferrer'>
                        <Facebook />
                    </a>
                    <a
                        style={{ gridArea: 'link2' }}
                        tabIndex={-1}
                        href='https://instagram.com/pritam.poseidon'
                        target='_blank'
                        rel='noopener noreferrer'>
                        <Instagram />
                    </a>
                    <a
                        style={{ gridArea: 'link3' }}
                        tabIndex={-1}
                        href='https://linkedin.com/in/pritamhalder0506'
                        target='_blank'
                        rel='noopener noreferrer'>
                        <Linkedin />
                    </a>
                    <a
                        style={{ gridArea: 'link4' }}
                        tabIndex={-1}
                        href='https://github.com/poseidon-code'
                        target='_blank'
                        rel='noopener noreferrer'>
                        <Github />
                    </a>
                </div>
            </section>
        </>
    );
};

export default Home;
