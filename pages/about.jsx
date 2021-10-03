import { useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/About.module.scss';

const About = () => {
    useEffect(() => {
        axios.get('https://api.countapi.xyz/hit/pritamh.netlify.app/about');
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
                <h1>About Myself</h1>
                <h2>It's going to be hard, but hard does not mean impossible.</h2>
            </section>

            <section className={styles.footer}>
                <p>Made with ❤ using NextJs by yours truly.</p>
                <span>&copy; Pritam Halder 2021</span>
            </section>
        </>
    );
};

export default About;
