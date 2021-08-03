import Button from '../components/UI/Button';
import styles from '../styles/Home.module.scss';
import {
    Clock,
    Palette,
    Github,
    Frameworks,
    ExternalLink,
    ReactJs,
    NodeJs,
    Bootstrap,
    Aws,
    Azure,
    GCP,
    Ae,
    Ps,
    Figma,
    Git,
    Database,
    GraphQL,
    Download,
    Facebook,
    Instagram,
    Linkedin,
    CV,
    Resume,
    Firebase,
} from '../components/UI/Icons';
import { useRef, useState } from 'react';

const Home = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();
    const subjectRef = useRef();

    const [sending, setSending] = useState(false);

    const resetForm = () => {
        nameRef.current.value = null;
        emailRef.current.value = null;
        messageRef.current.value = null;
        subjectRef.current.value = null;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setSending(true);
        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            subject: subjectRef.current.value,
            message: messageRef.current.value,
        };

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(async (res) => {
            const data = await res.json();
            console.log(data);
            if (res.status == 200) {
                resetForm();
            }
            setSending(false);
        });
    };

    return (
        <>
            <section className={styles.header}>
                <pre style={{ fontSize: '.2rem', fontFamily: 'monospace' }}>
                    {`
              ███████  ███████
          ████▓▓▓▓▓▓████░░░░░██
        ██▓▓▓▓▓▓▓▓▓▓▓▓██░░░░░░██
      ██▓▓▓▓▓▓████████████░░░░██
    ██▓▓▓▓▓▓████████████████░██
    ██▓▓████░░░░░░░░░░░░██████
  ████████░░░░░░██░░██░░██▓▓▓▓██
  ██░░████░░░░░░██░░██░░██▓▓▓▓██
██░░░░██████░░░░░░░░░░░░░░██▓▓██
██░░░░░░██░░░░██░░░░░░░░░░██▓▓██
  ██░░░░░░░░░███████░░░░██████
    ████░░░░░░░███████████▓▓██
      ██████░░░░░░░░░░██▓▓▓▓██
    ██▓▓▓▓██████████████▓▓██
  ██▓▓▓▓▓▓▓▓████░░░░░░████
████▓▓▓▓▓▓▓▓██░░░░░░░░░░██
████▓▓▓▓▓▓▓▓██░░░░░░░░░░██
██████▓▓▓▓▓▓▓▓██░░░░░░████████
  ██████▓▓▓▓▓▓████████████████
    ██████████████████████▓▓▓▓██
  ██▓▓▓▓████████████████▓▓▓▓▓▓██
████▓▓██████████████████▓▓▓▓▓▓██
██▓▓▓▓██████████████████▓▓▓▓▓▓██
██▓▓▓▓██████████      ██▓▓▓▓████
██▓▓▓▓████              ██████
  ████
`}
                </pre>
                <h2>Hi, my name is</h2>
                <h1>Pritam Halder</h1>
                <h2>I build things for the web.</h2>
            </section>

            <div className={styles.introduction}>
                <section className={styles.cta}>
                    <p>
                        I'm a Kolkata based software engineer who specializes in building and designing full stack products leading projects
                        from research to implementation. I combine empathy, business strategy and design to create exceptional user
                        experiences.
                    </p>
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
                    <Stat icon={<Clock />} text='Hours Spent' number='3.2K' />
                    <Stat icon={<Palette />} text='Design Ideas' number='243' />
                    <Stat icon={<Github />} text='Github Repos' number='35' />
                    <Stat icon={<Frameworks />} text='Frameworks' number='7' />
                </section>
            </div>

            <section id='projects' className={styles.projects}>
                <div className={styles.projects_head}>
                    <h1>Featured Projects</h1>
                    <h2>
                        My creative mindset and my passion for designning yeilded these fine results. With a core background of computer
                        programming and a creative hobby made me look always forwards to perfection.
                    </h2>
                </div>

                <Project
                    name='Portfolio'
                    github='https://github.com/poseidon-code/portfolio'
                    deploy='https://pritamh.netlify.app'
                    description='You are viewing it currently designed by yours sincerely. Made with NextJs JavaScript framework.'
                    tech={['NextJs', 'SASS']}
                />
                <Project
                    name='Supacons'
                    github='https://github.com/poseidon-code/supacons'
                    deploy='https://supacons.netlify.app'
                    description='Vanilla SVG Icons ripped from popular FontAwesome Icon pack. Made with NextJs JavaScript framework.'
                    tech={['NextJs', 'CSS3']}
                />
                <Project
                    name='TailwindColors'
                    github='https://github.com/poseidon-code/tailwind-colors'
                    deploy='https://tailwindcolors.netlify.app'
                    description='TailwindCSS color palette copier. Made with ReactJs JavaScript framework.'
                    tech={['ReactJs', 'CSS3']}
                />
                <Project
                    name='Sories.io'
                    github='https://github.com/poseidon-code/stories.io'
                    deploy='https://storiesio.netlify.app'
                    description='A short sotry telling app using WebAudio voices from the browser. Made with ReactJs JavaScript framework.'
                    tech={['ReactJs', 'SASS', 'WebAudioAPI', 'REST API']}
                />
                <Project
                    name='mp3 Downloader'
                    github='https://github.com/poseidon-code/mp3-download-script-v2'
                    description='YouTube video to mp3 downloader. Made with Python using ffmpeg & youtube-dl.'
                    tech={['Python', 'YouTubeDL', 'FFmpeg']}
                />

                <div>
                    <h1>Many more projects awaits you :)</h1>
                    <Button link href='/projects'>
                        Check Out
                    </Button>
                </div>
            </section>

            <section className={styles.skills}>
                <div className={styles.skills_head}>
                    <h1>Skill Sets</h1>
                    <h2>
                        Modern technologies helped me to upgrade from traditional methods to new ways. Implementing logics helped me with my
                        programming confidence.
                    </h2>
                </div>
                <ul>
                    <Skill skill='JavaScript' />
                    <Skill skill='TypeScript' />
                    <Skill skill='C/C++' />
                    <Skill skill='Algorithms' />
                    <Skill skill='Data Structures' />
                    <Skill skill='Python' />
                    <Skill skill='Core JAVA' />
                    <Skill skill='Fullstack Web Development' />
                    <Skill skill='MERN Stack' />
                    <Skill skill='NodeJS' />
                    <Skill skill='Git & Github' />
                    <Skill skill='MongoDB' />
                    <Skill skill='REST API' />
                    <Skill skill='GraphQL' />
                    <Skill skill='HTML5' />
                    <Skill skill='CSS3' />
                    <Skill skill='SASS' />
                    <Skill skill='ReactJS' />
                    <Skill skill='NextJS' />
                    <Skill skill='NextJS Fullstack' />
                </ul>
                <div>
                    <h1>Want my skill sets for your project ?</h1>
                    <Button href='#contact'>Hire Me</Button>
                </div>
            </section>

            <section className={styles.technologies}>
                <div className={styles.technologies_head}>
                    <h1>Technologies Tackled</h1>
                    <h2>
                        I have experience with most of the important UI designing / coding frameworks, proficient with with both javascript
                        based backend and frontend development. I am also skilled with various designing softwares.
                    </h2>
                </div>
                <ul>
                    <Technology technology='ReactJs' text='JavaScript Library' icon={<ReactJs />} />
                    <Technology technology='NextJs' text='Framework of ReactJs' icon={<ReactJs />} />
                    <Technology technology='Node JS' text='JavaScript Runtime' icon={<NodeJs />} />
                    <Technology technology='Bootstrap 5' text='CSS Framework' icon={<Bootstrap />} />
                    <Technology technology='GraphQL' text='Query Language for APIs' icon={<GraphQL />} />
                    <Technology technology='MongoDB' text='No-Sequel Database' icon={<Database />} />
                    <Technology technology='Postgres SQL' text='Sequel Database' icon={<Database />} />
                    <Technology technology='Firebase' text='Cloud Service Provider' icon={<Firebase />} />
                    <Technology technology='AWS' text='Cloud Service Provider' icon={<Aws />} />
                    <Technology technology='Azure' text='Cloud Service Provider' icon={<Azure />} />
                    <Technology technology='Google Cloud Platform' text='Cloud Service Provider' icon={<GCP />} />
                    <Technology technology='Adobe After Effects' text='Motion Graphics Software' icon={<Ae />} />
                    <Technology technology='Adobe Photoshop' text='Image Manipulation Software' icon={<Ps />} />
                    <Technology technology='Figma' text='UI/UX Prototyping Platform' icon={<Figma />} />
                    <Technology technology='Git & Github' text='Version Control' icon={<Git />} />
                </ul>
                <div>
                    <h1>Do you want to implement these technologies in your product ?</h1>
                    <Button href='#contact'>Let's Talk</Button>
                </div>
            </section>

            <section className={styles.about}>
                <div className={styles.about_head}>
                    <h1>About Me</h1>
                    <h2>Success is not final, failure is not fatal, it is the courage to continue that counts.</h2>
                </div>
                <article>
                    <p>
                        Hello ! So now that you have gone through my skills, projects and my interests, how about I tell you about my
                        passion :) ? I am a college student of Computer Science (Honors) in 3rd year, living with my parents and my younger
                        brother in Debpukur.
                        <br />
                        <br />
                        I love drawing, digital painting, graphics designing, reading, coding, programming, photoshoping, making
                        illustrations, making videos, running a youtube channel, managing businesses' / brands' pages and lots more.
                        <br />
                        <br />
                        My true goal in my life is to do the job I love, that is programming, coding & designing; because in that moment I
                        would be at my best, always :)
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
                </article>
                <div>
                    <h1>Wanna know more about my experiences till now ?</h1>
                    <Button link href='/about'>
                        More About Me
                    </Button>
                </div>
            </section>

            <section id='contact' className={styles.contact}>
                <div className={styles.contact_head}>
                    <h1>Contact Me</h1>
                    <h2>Sometimes later becomes never...</h2>
                </div>
                <div>
                    <div>
                        <a href='https://facebook.com/pritamhalder0506' target='_blank' rel='noopener noreferrer'>
                            <Facebook />
                        </a>
                        <a href='https://instagram.com/pritam.poseidon' target='_blank' rel='noopener noreferrer'>
                            <Instagram />
                        </a>
                        <a href='https://linkedin.com/in/pritam-halder-8306741b3' target='_blank' rel='noopener noreferrer'>
                            <Linkedin />
                        </a>
                        <a href='https://github.com/poseidon-code' target='_blank' rel='noopener noreferrer'>
                            <Github />
                        </a>
                    </div>
                    <form method='POST' onSubmit={submitHandler}>
                        <input disabled={sending} type='text' ref={nameRef} name='name' placeholder='Name' required />
                        <input disabled={sending} type='email' ref={emailRef} name='email' placeholder='Email' required />
                        <input disabled={sending} type='text' ref={subjectRef} name='subject' placeholder='Subject' required />
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

const Stat = (props) => (
    <div className={styles.stat}>
        {props.icon}
        <h1>{props.number}</h1>
        <span>{props.text}</span>
    </div>
);

const Project = (props) => (
    <section className={styles.project}>
        <div>
            <h1>{props.name}</h1>
            <span>{props.description}</span>
            <ul>
                {props.tech.map((t, i) => (
                    <li key={i}>{t}</li>
                ))}
            </ul>

            <div>
                {props.github && (
                    <a href={props.github} target='_blank' rel='noopener noreferrer'>
                        <Github />
                    </a>
                )}
                {props.deploy && (
                    <a href={props.deploy} target='_blank' rel='noopener noreferrer'>
                        <ExternalLink />
                    </a>
                )}
            </div>
        </div>
        <div></div>
    </section>
);

const Skill = (props) => (
    <li className={styles.skill}>
        <h2>{props.skill}</h2>
    </li>
);

const Technology = (props) => (
    <li className={styles.technology}>
        {props.icon}
        <h2>{props.technology}</h2>
        <span>{props.text}</span>
    </li>
);
