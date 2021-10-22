import { useEffect, useState } from 'react';
import axios from 'axios';
import { aboutData } from '../utility/AboutData';
import styles from '../styles/About.module.scss';

import { Download, CV, Resume, Fact, Joke } from '../components/UI/Icons';

import { ClockTime, Stats } from '../components/About';

export const getStaticProps = async () => {
    const { stats } = await aboutData();

    return {
        props: {
            stats,
        },
    };
};

const About = props => {
    const [fact, setFact] = useState('');
    const [joke, setJoke] = useState('');

    useEffect(async () => {
        await axios.get('https://api.countapi.xyz/hit/pritamh.netlify.app/about');
        setFact(await axios.get('https://uselessfacts.jsph.pl/random.json?language=en').then(res => res.data.text));
        setJoke(
            await axios
                .get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } })
                .then(res => res.data.joke)
        );
    }, []);

    return (
        <>
            <section className={styles.header}>
                <pre style={{ fontSize: '.3rem', fontFamily: 'monospace' }}>
                    {`
          ▄███████▄ 
         ▐██▀   ▀██▌
         ▐██     ██▌
         ▐██▄   ▄██▌
          ▀███████▀
            ▐█▄█▌
          ▐███▄███▌
            ▐█▄█▌
            ▐█▄█▌
            ▐█▄█▌
  ▄█▄       ▐█▄█▌       ▄█▄
▄█████▄     ▐█▄█▌     ▄█████▄
  ███       ▐█▄█▌       ███
  ███▄     ▄██▄██▄     ▄███
  ▀████▄▄▄████▄████▄▄▄████▀
    ▀█████████▄█████████▀
      ▀███████▄███████▀
         ▀████▄████▀
            ▀█▄█▀
              ▀
`}
                </pre>
                <h2>"Land Ahoy!"</h2>
                <h1>Me Corner</h1>
                <h2>It's going to be hard, but hard does not mean impossible.</h2>
            </section>

            <section className={styles.clock}>
                <ClockTime />
            </section>

            <section className={styles.stats}>
                <Stats stats={props.stats} />
            </section>

            <section className={styles.fact}>
                <Fact />
                {fact}
            </section>

            <section className={styles.about}>
                <h1>命</h1>
                <p>
                    Hello ! I am Pritam Halder, a graduate student of Computer Science (Honors), living with my parents
                    and my younger brother in Debpukur.
                    <br />
                    <br />
                    I'm a Kolkata based aspiring software engineer who specializes in building and designing fullstack
                    products leading projects from research to implementation. I combine empathy, business strategy and
                    design to create exceptional user experiences.
                    <br />
                    <br />
                    I love drawing, digital painting, graphics designing, reading, coding, programming, photoshoping,
                    making illustrations, making videos, running a youtube channel, managing businesses' / brands' pages
                    and lots more.
                    <br />
                    <br />
                    What's going on, you ask ? I’m currently learning Strapi, GraphQL, Jest, Selenium Automation and had
                    a hands-on with Go. Really loving the Go programing language and currently implementing in web
                    backend stacks. You can ask me about Go, ReactJs, NextJs, NodeJs, ExpressJs, MongoDB, JavaScript,
                    TypeScript, Graphics Designing, Motion Graphics, GraphQL, Linux Customizations (Ricing) and just
                    about life ;)
                    <br />
                    <br />
                    My true goal in my life is to do the job I love, that is programming, coding & designing; because in
                    that moment I would be at my best, always :)
                    <br />
                    <br />
                    <a href='/Resume - Pritam Halder.pdf' download>
                        <Download />
                        &nbsp;Resume&nbsp;
                        <Resume />
                    </a>
                    <br />
                    <a href='/CV - Pritam Halder.pdf' download>
                        <Download />
                        &nbsp;CV&nbsp;
                        <CV />
                    </a>
                </p>
                <img src='/backgrounds/bg-5.jpg' alt='profile picture' />
            </section>

            <section className={styles.social_skills}>
                <div className={styles.social_skills_head}>
                    <h1>Social Skills</h1>
                    <h2>
                        "In order to write about life first you must live it."
                        <br /> -Ernest Hemingway
                    </h2>
                </div>
                <ul>
                    <li>Efficient in working and adapting to new locations and with new teams.</li>
                    <li>
                        Better technical skills, with love to teach and help new teammates made me confident with my
                        skills.
                    </li>
                    <li>Good and skilled seniors helped me gain a huge part of my knowledge base.</li>
                    <li>Everyday practice and many tutorials helped me gain more experience.</li>
                    <li>Good work culture and trying my best to provide it, is my everyday goal.</li>
                    <li>
                        Technical leadership and dedication to my work is what I am always looking forward to in my
                        journey.
                    </li>
                </ul>
            </section>

            <section className={styles.interests}></section>

            <section className={styles.academics}></section>

            <section className={styles.work_experience}></section>

            <section className={styles.achievements}></section>

            <section className={styles.joke}>
                <Joke />
                {joke}
            </section>

            <section className={styles.footer}>
                <p>Made with ❤ using NextJs by yours truly.</p>
                <span>&copy; Pritam Halder 2021</span>
            </section>
        </>
    );
};

export default About;
