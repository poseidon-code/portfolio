import { useRef, useState, useEffect, Fragment } from 'react';
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
    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();
    const subjectRef = useRef();

    const [sending, setSending] = useState(false);

    useEffect(() => {
        axios.get('https://api.countapi.xyz/hit/pritamh.netlify.app/');
    }, []);

    const resetForm = () => {
        nameRef.current.value = null;
        emailRef.current.value = null;
        messageRef.current.value = null;
        subjectRef.current.value = null;
    };

    const submitHandler = e => {
        e.preventDefault();
        setSending(true);

        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            subject: subjectRef.current.value,
            message: messageRef.current.value,
        };

        axios.post('/api/contact', data).then(res => {
            if (res.status == 200) {
                resetForm();
            }
            setSending(false);
        });
    };

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
                        Modern technologies & abundant freely accessible resources helped me to upgrade from traditional
                        methods to new approaches along with my programming confidence.
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
                        Experienced with most of the important coding frameworks and proficient with with both
                        javascript based backend & frontend development.
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
                    <div>
                        <a href='https://facebook.com/pritamhalder0506' target='_blank' rel='noopener noreferrer'>
                            <Facebook />
                        </a>
                        <a href='https://instagram.com/pritam.poseidon' target='_blank' rel='noopener noreferrer'>
                            <Instagram />
                        </a>
                        <a
                            href='https://linkedin.com/in/pritam-halder-8306741b3'
                            target='_blank'
                            rel='noopener noreferrer'>
                            <Linkedin />
                        </a>
                        <a href='https://github.com/poseidon-code' target='_blank' rel='noopener noreferrer'>
                            <Github />
                        </a>
                    </div>
                    <form className={styles.contact_body} method='POST' onSubmit={submitHandler}>
                        <input disabled={sending} type='text' ref={nameRef} name='name' placeholder='Name' required />
                        <input
                            disabled={sending}
                            type='email'
                            ref={emailRef}
                            name='email'
                            placeholder='Email'
                            required
                        />
                        <input
                            disabled={sending}
                            type='text'
                            ref={subjectRef}
                            name='subject'
                            placeholder='Subject'
                            required
                        />
                        <textarea
                            disabled={sending}
                            placeholder='Your Message'
                            ref={messageRef}
                            name='message'
                            rows='6'
                            required></textarea>
                        <Button disabled={sending} type='submit' style={{ '--hue': 0 }}>
                            {sending ? 'Sending...' : 'Send'}
                        </Button>
                    </form>
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
