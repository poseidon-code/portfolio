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
                <p>
                    Hello ! I am Pritam Halder, a graduate student of Computer Science (Honors), living with my parents
                    and my younger brother in Debpukur.
                    <br />
                    <br />
                    I love drawing, digital painting, graphics designing, reading, coding, programming, photoshoping,
                    making illustrations, making videos, running a youtube channel, managing businesses' / brands' pages
                    and lots more.
                    <br />
                    <br />
                    My true goal in my life is to do the job I love, that is programming, coding & designing; because in
                    that moment I would be at my best, always :)
                    <br /> <br />
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

            <section className={styles.social_skills}></section>

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
