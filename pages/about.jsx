import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';

import styles from '../styles/About.module.scss';
import { aboutData, aboutDataStore } from '../utility/AboutData';
import { Clock, Stats } from '../components/About';

import { Download, Resume, Fact, Joke } from '../components/UI/Icons';
import { SectionButton } from '../components/UI/Button';

export const getStaticProps = async () => {
    const { stats, works, events } = await aboutData();

    return {
        props: {
            stats,
            works,
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
                <img src='/images/p1.png' alt='home' title='🐱 A cute Mew found !' aria-hidden='true' />
                <h2>"Land Ahoy!"</h2>
                <h1>Me Corner</h1>
                <h2>It's going to be hard, but hard does not mean impossible.</h2>
            </section>

            <section className={styles.Clock}>
                <Clock />
            </section>

            <section className={styles.Stats}>
                <Stats stats={props.stats} />
            </section>

            <section className={styles.Fact}>
                <Fact />
                {fact}
            </section>

            <section className={styles.about}>
                <p>
                    {aboutDataStore.about.map((line, i) => (
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
            </section>

            <section className={styles.soft_skills}>
                <div className={styles.soft_skills_head}>
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

            {/* TODO : update @for-thorugh count in About.module.scss (.interests.ul.li) */}
            <section className={styles.interests}>
                <div className={styles.interests_head}>
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

            <section className={styles.Education}>
                <div className={styles.EducationHead}>
                    <h1>Education</h1>
                    <h2>
                        "Live as if you were to die tomorrow. Learn as if you were to live forever."
                        <br /> -Mahatma Gandhi
                    </h2>
                </div>

                {aboutDataStore.education.map((academic, i) => (
                    <div key={`education-${i}`} className={styles.EducationBody}>
                        <h6 aria-hidden={true}>{academic.symbol}</h6>
                        <h2>{academic.type}</h2>
                        <h4 title='Subject Course'>{academic.domain}</h4>
                        <h1 title='Institute Name'>{academic.name}</h1>
                        <h4 title='Education Board'>{academic.board}</h4>
                        <br />
                        <ul>
                            {academic.periods.map((period, pi) => (
                                <li key={`education-${i}-period-${pi}`}>
                                    <span>{period.time}</span>
                                    <span>{period.location}</span>
                                </li>
                            ))}
                        </ul>
                        <br />
                        <h2 title='Graduation Time'>{academic.graduation}</h2>
                        <span title='Subject Score'>
                            {academic.subject} | {academic.score}
                        </span>
                    </div>
                ))}
            </section>

            <section className={styles.work_experiences}>
                <div className={styles.work_experiences_head}>
                    <h1>Work Experiences</h1>
                    <h2>
                        "Either you run the day or the day runs you."
                        <br /> -Jim Rohn
                    </h2>
                </div>

                <ul>
                    {props.works.map((work, i) => (
                        <li key={i}>
                            <h3>
                                {work.type == 'internship'
                                    ? 'Internship'
                                    : work.type == 'freelancing'
                                    ? 'Freelancing'
                                    : work.type == 'competitive'
                                    ? 'Competitive Programming'
                                    : 'General Work'}
                            </h3>
                            <h1>{work.field}</h1>
                            <h2>{work.company}</h2>
                            <br />
                            <p>{work.description}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className={styles.events}>
                <div className={styles.events_head}>
                    <h1>Life Events</h1>
                    <h2>
                        "The purpose of our lives is to be happy."
                        <br /> -Dalai Lama
                    </h2>
                </div>

                <ul>
                    {Object.keys(props.events)
                        .sort((a, b) => b - a)
                        .slice(0, count)
                        .map((period, i) => (
                            <li key={i}>
                                <h3>{`${period.split('-')[2]} ${period.split('-')[0]}`}</h3>
                                {props.events[period].map((event, j) => (
                                    <p key={j}> - {event}</p>
                                ))}
                            </li>
                        ))}
                    {load && (
                        <SectionButton
                            text='Wanna see 2 years of notable events of my developer journey ?'
                            onClick={() => {
                                setCount(p => p + 5);
                            }}>
                            More Notable Events
                        </SectionButton>
                    )}
                </ul>
            </section>

            <section className={styles.joke}>
                <Joke />
                {joke}
            </section>
        </>
    );
};

export default About;
