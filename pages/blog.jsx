import Link from 'next/link';

import { Working } from '@icons';

const Construction = () => {
    return (
        <section className='construction'>
            <div>
                <Working />
                <h1>Opps ! This page is under construction.</h1>
                <span>
                    &larr;&nbsp;<Link href='/'>Go Back</Link>
                </span>
            </div>
        </section>
    );
};

export default Construction;
