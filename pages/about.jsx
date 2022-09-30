import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';

import styles from '../styles/About.module.scss';
import { aboutData, aboutDataStore } from '../utility/AboutData';
import { Clock, Languages, Education, Experience } from '../components/About';

import { Download, Resume, Fact, Joke } from '../components/UI/Icons';
import { SectionButton } from '../components/UI/Button';

export const getStaticProps = async () => {
    const { stats, events } = await aboutData();

    return {
        props: {
            stats,
            events,
        },
    };
};

const About = props => {
    const [fact, setFact] = useState('');
    const [joke, setJoke] = useState('');
    const [count, setCount] = useState(5);
    const [load, setLoad] = useState(true);

    useEffect(async () => {
        await axios.get('https://api.countapi.xyz/hit/pritamh.netlify.app/about');
        setFact(await axios.get('https://uselessfacts.jsph.pl/random.json?language=en').then(res => res.data.text));
        setJoke(
            await axios
                .get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } })
                .then(res => res.data.joke)
        );
    }, []);

    useEffect(() => {
        if (count > Object.keys(props.events).length) setLoad(false);
    }, [count]);

    return (
        <>
            <section className={styles.header}>
                <img src='/images/p1.png' alt='about' title='🐱 A cute Mew found !' aria-hidden='true' />
                <h2>"Land Ahoy!"</h2>
                <h1>Me Corner</h1>
                <h2>It's going to be hard, but hard does not mean impossible.</h2>
            </section>

            <section className={styles.Clock}>
                <Clock />
            </section>

            <section className={styles.Languages}>
                <Languages stats={props.stats} />
            </section>

            <section className={styles.Fact}>
                <Fact /> {fact}
            </section>

            <section className={styles.About}>
                <article>
                    {aboutDataStore.about.map((line, i) => (
                        <Fragment key={`about-line-${i + 1}`}>
                            {line} <br /> <br />
                        </Fragment>
                    ))}
                    <a href='/Resume - Pritam Halder.pdf' download>
                        <Resume /> &nbsp;Resume&nbsp; <Download />
                    </a>
                </article>
            </section>

            <section className={styles.Education}>
                <div className={styles.EducationHead}>
                    <h1>Education</h1>
                    <h2>
                        "Live as if you were to die tomorrow. Learn as if you were to live forever."
                        <br /> -Mahatma Gandhi
                    </h2>
                </div>
                {aboutDataStore.education.map((academic, i) => (
                    <Education key={`education-${i}`} education={academic} />
                ))}
            </section>

            <section className={styles.Experiences}>
                <div className={styles.ExperiencesHead}>
                    <h1>Experiences</h1>
                    <h2>
                        "Either you run the day or the day runs you."
                        <br /> -Jim Rohn
                    </h2>
                </div>
                {aboutDataStore.experiences.map((experience, i) => (
                    <Experience key={`experience-${i}`} experience={experience} />
                ))}
            </section>

            <section className={styles.Achievements}>
                <div className={styles.AchievementsHead}>
                    <h1>Achievements</h1>
                    <h2>
                        "The purpose of our lives is to be happy."
                        <br /> -Dalai Lama
                    </h2>
                </div>
                <ul>
                    {aboutDataStore.achievements.map((achievement, i) => (
                        <li key={`achievement-${i}`}>{achievement}</li>
                    ))}
                </ul>
            </section>

            <section className={styles.SoftSkills}>
                <div className={styles.SoftSkillsHead}>
                    <h1>Soft Skills</h1>
                    <h2>
                        "In order to write about life first you must live it."
                        <br /> -Ernest Hemingway
                    </h2>
                </div>
                <ul>
                    {aboutDataStore.softSkills.map((softSkill, i) => (
                        <li key={`softSkill-${i}`}>{softSkill}</li>
                    ))}
                </ul>
            </section>

            {/* TODO : update @for-thorugh count in About.module.scss (.Interests.ul.li) */}
            <section className={styles.Interests}>
                <div className={styles.InterestsHead}>
                    <h1>Interests</h1>
                    <h2>
                        "It's hard to escape when your hobby is your job."
                        <br /> -Anonymous
                    </h2>
                </div>
                <ul>
                    {aboutDataStore.interests.map((interest, i) => (
                        <li key={`interest-${i}`}>{interest}</li>
                    ))}
                </ul>
            </section>

            <section className={styles.Joke}>
                <Joke /> {joke}
            </section>
        </>
    );
};

export default About;
