import styles from '../styles/Projects.module.scss';

import Project from '../components/Projects/Project';

const PROJECTS = [
    {
        name: 'Portfolio',
        github: 'https://github.com/poseidon-code/portfolio',
        website: 'https://supacons.netlify.app',
        description:
            'Vanilla SVG Icons ripped from popular FontAwesome Icon pack. Made with NextJs JavaScript framework.',
        tech: ['NextJs', 'CSS3'],
    },
    {
        name: 'Portfolio',
        github: 'https://github.com/poseidon-code/portfolio',
        website: 'https://supacons.netlify.app',
        description:
            'Vanilla SVG Icons ripped from popular FontAwesome Icon pack. Made with NextJs JavaScript framework.',
        tech: ['NextJs', 'CSS3'],
    },
    {
        name: 'Portfolio',
        github: 'https://github.com/poseidon-code/portfolio',
        website: 'https://supacons.netlify.app',
        description:
            'Vanilla SVG Icons ripped from popular FontAwesome Icon pack. Made with NextJs JavaScript framework.',
        tech: ['NextJs', 'CSS3'],
    },
    {
        name: 'Portfolio',
        github: 'https://github.com/poseidon-code/portfolio',
        website: 'https://supacons.netlify.app',
        description:
            'Vanilla SVG Icons ripped from popular FontAwesome Icon pack. Made with NextJs JavaScript framework.',
        tech: ['NextJs', 'CSS3'],
    },
    {
        name: 'Portfolio',
        github: 'https://github.com/poseidon-code/portfolio',
        website: 'https://supacons.netlify.app',
        description:
            'Vanilla SVG Icons ripped from popular FontAwesome Icon pack. Made with NextJs JavaScript framework.',
        tech: ['NextJs', 'CSS3'],
    },
    {
        name: 'Portfolio',
        github: 'https://github.com/poseidon-code/portfolio',
        website: 'https://supacons.netlify.app',
        description:
            'Vanilla SVG Icons ripped from popular FontAwesome Icon pack. Made with NextJs JavaScript framework.',
        tech: ['NextJs', 'CSS3'],
    },
    {
        name: 'Portfolio',
        github: 'https://github.com/poseidon-code/portfolio',
        website: 'https://supacons.netlify.app',
        description:
            'Vanilla SVG Icons ripped from popular FontAwesome Icon pack. Made with NextJs JavaScript framework.',
        tech: ['NextJs', 'CSS3'],
    },
    {
        name: 'Portfolio',
        github: 'https://github.com/poseidon-code/portfolio',
        website: 'https://supacons.netlify.app',
        description:
            'Vanilla SVG Icons ripped from popular FontAwesome Icon pack. Made with NextJs JavaScript framework.',
        tech: ['NextJs', 'CSS3'],
    },
    {
        name: 'Portfolio',
        github: 'https://github.com/poseidon-code/portfolio',
        website: 'https://supacons.netlify.app',
        description:
            'Vanilla SVG Icons ripped from popular FontAwesome Icon pack. Made with NextJs JavaScript framework.',
        tech: ['NextJs', 'CSS3'],
    },
];

// export const getStaticProps = async () => {

// }

const Projects = () => {
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
                {PROJECTS.map((p, i) => (
                    <Project
                        key={i}
                        name={p.name}
                        github={p.github}
                        website={p.website}
                        description={p.description}
                        tech={p.tech}
                    />
                ))}
            </section>

            <section className={styles.footer}>
                <p>Made with ❤ using NextJs by yours truly.</p>
                <span>&copy; Pritam Halder 2021</span>
            </section>
        </>
    );
};

export default Projects;
