import { useEffect } from 'react';
import axios from 'axios';

import { SectionButton } from 'components/UI/Button';
import { Star, Folder, Fork, Database } from '@icons';

import styles from 'styles/Projects.module.scss';
import { projectData } from 'utility/ProjectsData';
import { Languages, OSC, Project, Repo, Stat } from 'components/Projects';

export const getStaticProps = async () => {
    const { projects, osc, repos, stats, languages } = await projectData();

    return {
        props: { projects, osc, repos, stats, languages },
    };
};

const Projects = props => {
    useEffect(() => {
        axios.get('https://api.countapi.xyz/hit/pritamh.netlify.app/projects');
    }, []);

    return (
        <>
            <section className={styles.header}>
                <img src='/images/p3.png' alt='home' title='👻 A spooky Gengar found !' aria-hidden='true' />
                <h2>"You're purrfect"</h2>
                <h1>Projects</h1>
                <h2>Imagination is more important than knowledge.</h2>
            </section>

            <section className={styles.stats}>
                <Stat icon={<Folder />} number={props.stats.repos} text='Repositories' />
                <Stat icon={<Fork />} number={props.stats.forks} text='Total Forks' />
                <Stat icon={<Star />} number={props.stats.stars} text='Total Stars' />
                <Stat icon={<Database />} number={props.stats.size} text='Total Size' />
            </section>

            <section className={styles.languages}>
                <Languages stats={props.languages} />
            </section>

            {/* TODO : update @for-thorugh count in Projects.module.scss (.projects.project) */}
            <section className={styles.projects}>
                {props.projects.map(p => (
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

            {/* TODO : update @for-thorugh count in Projects.module.scss (.oscs.osc) */}
            <section className={styles.oscs}>
                <div className={styles.osc_head}>
                    <h1>Open Source Contributions</h1>
                    <h2>In real open source, you have the right to control your own destiny.</h2>
                </div>
                {props.osc.map(o => (
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

            {/* TODO : update @for-thorugh count in Projects.module.scss (.repos.repos_body.repo) */}
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
                    style={{ '--hue': 74 }}
                    background='backgrounds/bg-1.jpg'
                    text='Would you like to visit my Github ?'
                    href='https://github.com/poseidon-code'
                    target='_blank'
                    rel='noopener noreferrer'>
                    Check Github
                </SectionButton>
            </section>
        </>
    );
};

export default Projects;
