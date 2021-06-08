import Link from 'next/link';
import { Working } from '../components/UI/Icons';

const Construction = () => {
    return (
        <section className='construction'>
            <Working />
            <h1>Opps ! This page is under construction.</h1>
            <span>
                &larr;&nbsp;<Link href='/'>Go Back</Link>
            </span>
        </section>
    );
};

export default Construction;
