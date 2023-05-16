import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';

import { Download, Resume, Fact, Joke } from '@icons';
import SectionHead from 'components/UI/SectionHead';

import styles from 'styles/About.module.scss';
import { aboutData, aboutDataStore } from 'utility/AboutData';
import { Clock, Languages, Education, Experience } from 'components/About';

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
        // await axios.get('https://api.countapi.xyz/hit/pritamh.netlify.app/about'); // API not working
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
                <img src='/images/p1.png' alt='about' title='🐱 A cute Mew found !' aria-hidden='true' />
                <h2>"Land Ahoy!"</h2>
                <h1>Me Corner</h1>
                <h2>It's going to be hard, but hard does not mean impossible.</h2>
            </section>

            <section className={styles.Clock} tabIndex={6}>
                <Clock />
            </section>

            <section className={styles.Languages} tabIndex={7}>
                <Languages stats={props.stats} />
            </section>

            <section className={styles.Fact} tabIndex={8}>
                <Fact /> {fact}
            </section>

            <section className={styles.About} tabIndex={9}>
                <article>
                    {aboutDataStore.about.map((line, i) => (
                        <Fragment key={`about-line-${i}`}>
                            {line} <br /> <br />
                        </Fragment>
                    ))}
                    <a tabIndex={-1} href='/Resume - Pritam Halder.pdf' download>
                        <Resume /> &nbsp;Resume&nbsp; <Download />
                    </a>
                </article>
            </section>

            <section className={styles.Education} tabIndex={10}>
                <SectionHead
                    style={{ '--hue': 257 }}
                    background='backgrounds/bg-2.jpg'
                    title='Education'
                    text={
                        <>
                            "Live as if you were to die tomorrow. Learn as if you were to live forever."
                            <br /> -Mahatma Gandhi
                        </>
                    }
                />
                {aboutDataStore.education.map((academic, i) => (
                    <Education key={`education-${i}`} education={academic} />
                ))}
            </section>

            <section className={styles.Experiences} tabIndex={11}>
                <SectionHead
                    style={{ '--hue': 138 }}
                    background='backgrounds/bg-5.jpg'
                    title='Experiences'
                    text={
                        <>
                            "Either you run the day or the day runs you."
                            <br /> -Jim Rohn
                        </>
                    }
                />
                {aboutDataStore.experiences.map((experience, i) => (
                    <Experience key={`experience-${i}`} experience={experience} />
                ))}
            </section>

            <section className={styles.Achievements} tabIndex={12}>
                <SectionHead
                    style={{ '--hue': 235 }}
                    background='backgrounds/bg-3.jpg'
                    title='Achievements'
                    text={
                        <>
                            "The purpose of our lives is to be happy."
                            <br /> -Dalai Lama
                        </>
                    }
                />
                <ul>
                    {aboutDataStore.achievements.map((achievement, i) => (
                        <li key={`achievement-${i}`}>{achievement}</li>
                    ))}
                </ul>
            </section>

            <section className={styles.SoftSkills} tabIndex={13}>
                <SectionHead
                    style={{ '--hue': 0 }}
                    background='backgrounds/bg-1.jpg'
                    title='Soft Skills'
                    text={
                        <>
                            "In order to write about life first you must live it."
                            <br /> -Ernest Hemingway
                        </>
                    }
                />
                <ul>
                    {aboutDataStore.softSkills.map((softSkill, i) => (
                        <li key={`softSkill-${i}`}>{softSkill}</li>
                    ))}
                </ul>
            </section>

            {/* TODO : update @for-through count in About.module.scss (.Interests.ul.li) */}
            <section className={styles.Interests} tabIndex={14}>
                <SectionHead
                    style={{ '--hue': 30 }}
                    background='backgrounds/bg-3.jpg'
                    title='Interests'
                    text={
                        <>
                            "It's hard to escape when your hobby is your job."
                            <br /> -Anonymous
                        </>
                    }
                />
                <ul>
                    {aboutDataStore.interests.map((interest, i) => (
                        <li key={`interest-${i}`}>{interest}</li>
                    ))}
                </ul>
            </section>

            <section className={styles.Joke} tabIndex={15}>
                <Joke /> {joke}
            </section>
        </>
    );
};

export default About;
