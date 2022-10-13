import { useEffect } from 'react';
import axios from 'axios';

import SectionButton from 'components/UI/SectionButton';
import SectionHead from 'components/UI/SectionHead';
import { Star, Folder, Fork, Database } from '@icons';

import styles from 'styles/Projects.module.scss';
import { projectData } from 'utility/ProjectsData';
import { Languages, OSC, Project, Repository, Stat } from 'components/Projects';

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

            <section className={styles.Stats}>
                <Stat icon={<Folder />} number={props.stats.repos} text='Repositories' />
                <Stat icon={<Fork />} number={props.stats.forks} text='Total Forks' />
                <Stat icon={<Star />} number={props.stats.stars} text='Total Stars' />
                <Stat icon={<Database />} number={props.stats.size} text='Total Size' />
            </section>

            <section className={styles.Languages}>
                <Languages stats={props.languages} />
            </section>

            {/* TODO : update @for-through count in Projects.module.scss (.Projects.div) */}
            <section className={styles.Projects}>
                {props.projects.map((project, i) => (
                    <Project key={`project-${i}`} project={project} />
                ))}
            </section>

            {/* TODO : update @for-through count in Projects.module.scss (.OSCs.article) */}
            <section className={styles.OSCs}>
                <SectionHead
                    style={{ '--hue': 12 }}
                    background='backgrounds/bg-4.jpg'
                    title='Open Source Contributions'
                    text='In real open source, you have the right to control your own destiny.'
                />
                {props.osc.map((osc, i) => (
                    <OSC key={`osc-${i}`} osc={osc} />
                ))}
            </section>

            {/* TODO : update @for-through count in Projects.module.scss (.Repositories.ul.li) */}
            <section className={styles.Repositories}>
                <SectionHead
                    style={{ '--hue': 74 }}
                    background='backgrounds/bg-1.jpg'
                    title='Github Repositories'
                    text='Simplicity is the soul of efficiency.'
                />
                <ul>
                    {props.repos.map((repository, i) => (
                        <Repository key={`repository-${i}`} repository={repository} />
                    ))}
                </ul>
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
