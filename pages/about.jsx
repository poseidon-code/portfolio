import { useEffect, useState } from 'react';
import axios from 'axios';
import { aboutData } from '../utility/AboutData';
import styles from '../styles/About.module.scss';

import { Download, CV, Resume, Fact, Joke } from '../components/UI/Icons';
import { SectionButton } from '../components/UI';

import { ClockTime, Stats } from '../components/About';

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
                    <li>Sketching</li>
                    <li>Painting</li>
                    <li>Digital Painting</li>
                    <li>Coding</li>
                    <li>Web Surfing</li>
                    <li>YouTuber</li>
                    <li>Music</li>
                    <li>Video Editing</li>
                    <li>Photoshop</li>
                    <li>Motion Graphics</li>
                    <li>UI/UX Designing</li>
                    <li>Vector Graphics</li>
                    <li>Movies & Series Bingeing</li>
                    <li>Linux Ricing</li>
                    <li>Linux Distro Hopping</li>
                    <li>Wallpapers Hoarder</li>
                    <li>Home Server Geek</li>
                    <li>Virtual Machines Nerd</li>
                    <li>Gaming Enthusiast</li>
                    <li>Reading</li>
                    <li>JDM Cars</li>
                </ul>
            </section>

            <section className={styles.academics}>
                <div className={styles.academics_head}>
                    <h1>Academics</h1>
                    <h2>
                        "Live as if you were to die tomorrow. Learn as if you were to live forever."
                        <br /> –Mahatma Gandhi
                    </h2>
                </div>

                <div className={styles.academics_body}>
                    <h1>定</h1>
                    <h1 className={styles.title}>School</h1>
                    <h4>(Primary, Secondary & Senior Secondary)</h4>
                    <h2>KENDRIYA VIDYALAYA</h2>
                    <h3>Central Board of Secondary Education (CBSE)</h3>
                    <br />
                    <ul>
                        <li>
                            <span>April 2005 - March 2008</span>
                            <span>KV Mathura Cantonment, UP</span>
                        </li>
                        <li>
                            <span>April 2008 - March 2010</span>
                            <span>KV (Air Force Station) Naliya, Gujarat</span>
                        </li>
                        <li>
                            <span>April 2010 - March 2018</span>
                            <span>KV (Air Force Station) Barrackpore, West Bengal</span>
                        </li>
                    </ul>
                </div>

                <div className={styles.academics_body}>
                    <h1>海</h1>
                    <h1 className={styles.title}>Graduation</h1>
                    <h4>Bachelor of Science - Computer Science (Honors)</h4>
                    <h2>ACHARYA PRAFULLA CHANDRA COLLEGE</h2>
                    <h3>West Bengal State University (WBSU)</h3>
                    <br />
                    <ul>
                        <li>
                            <span>August 2018 - August 2021</span>
                            <span>APC College, Madhyamgram, West Bengal</span>
                        </li>
                    </ul>
                </div>

                <div className={styles.academics_body}>
                    <h1>森</h1>
                    <h1 className={styles.title}>Post Graduation</h1>
                    <h4>Master of Science - Computer Science</h4>
                    <h2>WEST BENGAL STATE UNIVERSITY</h2>
                    <h3>West Bengal State University (WBSU)</h3>
                    <br />
                    <ul>
                        <li>
                            <span>September 2021 - Ongoing</span>
                            <span>WBSU, Barasat, West Bengal</span>
                        </li>
                    </ul>
                </div>
            </section>

            <section className={styles.work_experiences}>
                <div className={styles.work_experiences_head}>
                    <h1>Work Experiences</h1>
                    <h2>
                        "Either you run the day or the day runs you."
                        <br /> –Jim Rohn
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
                        <br /> –Dalai Lama
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

            <section className={styles.footer}>
                <p>Made with ❤ using NextJs by yours truly.</p>
                <span>&copy; Pritam Halder 2021</span>
            </section>
        </>
    );
};

export default About;
