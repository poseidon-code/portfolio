import styles from '../styles/Projects.module.scss';
import { projectData } from '../utility/ProjectsData';

import Project from '../components/Projects/Project';
import OSC from '../components/Projects/OSC';
import Repo from '../components/Projects/Repo';
import SectionButton from '../components/UI/SectionButton';

export const getStaticProps = async () => {
    const data = await projectData();

    return {
        props: {
            projects: data.projects,
            osc: data.opensourcecontributions,
            repos: data.repos,
        },
    };
};

const Projects = (props) => {
    return (
        <>
            <section className={styles.header}>
                <pre style={{ fontSize: '.3rem', fontFamily: 'monospace' }}>
                    {`
   ▐▀▄       ▄▀▌   ▄▄▄▄▄▄▄
   ▌▒▒▀▄▄▄▄▄▀▒▒▐▄▀▀▒██▒██▒▀▀▄
  ▐▒▒▒▒▀▒▀▒▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀▄
  ▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▒▒▒▒▒▒▒▒▒▒▒▒▀▄
▀█▒▒▒█▌▒▒█▒▒▐█▒▒▒▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌
▀▌▒▒▒▒▒▒▀▒▀▒▒▒▒▒▒▀▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐   ▄▄
▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌▄█▒█
▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒█▀
▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▀
▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌
 ▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐
 ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌
  ▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐
  ▐▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▌
    ▀▄▄▀▀▀▀▀▄▄▀▀▀▀▀▀▀▄▄▀▀▀▀▀▄▄▀
`}
                </pre>
                <h2>"You’re purrfect"</h2>
                <h1>Projects</h1>
                <h2>Imagination is more important than knowledge.</h2>
            </section>

            <section className={styles.projects}>
                {props.projects.map((p) => (
                    <Project
                        key={p.id}
                        name={p.name}
                        github={p.links.github}
                        website={p.links.website}
                        description={p.description}
                        tech={p.technologies}
                    />
                ))}
            </section>

            <section className={styles.oscs}>
                <div className={styles.osc_head}>
                    <h1>Open Source Contributions</h1>
                    <h2>In real open source, you have the right to control your own destiny.</h2>
                </div>
                {props.osc.map((o) => (
                    <OSC
                        key={o.id}
                        name={o.name}
                        github={o.links.github}
                        website={o.links.website}
                        description={o.description}
                        tech={o.technologies}
                    />
                ))}
            </section>

            <section className={styles.repos}>
                <div className={styles.repos_head}>
                    <h1>Github Repositories</h1>
                    <h2>Simplicity is the soul of efficiency.</h2>
                </div>
                <div className={styles.repos_body}>
                    {props.repos.map((r, i) => (
                        <Repo key={i} name={r.name} url={r.url} stars={r.stars} forks={r.forks} />
                    ))}
                </div>
                <SectionButton
                    text='Would you like to visit my Github ?'
                    href='https://github.com/poseidon-code'
                    target='_blank'
                    rel='noopener noreferrer'>
                    Check Github
                </SectionButton>
            </section>

            <section className={styles.footer}>
                <p>Made with ❤ using NextJs by yours truly.</p>
                <span>&copy; Pritam Halder 2021</span>
            </section>
        </>
    );
};

export default Projects;
