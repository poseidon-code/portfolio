import { useEffect, useState } from 'react';
import styles from '../../styles/About.module.scss';

import { Clock, CalendarDate, CalendarDay } from '../UI/Icons';

const ClockTime = () => {
    const TODAY = new Date();

    return (
        <>
            <DateMonth today={TODAY} />
            <Time />
            <Day today={TODAY} />
        </>
    );
};

export default ClockTime;

const DateMonth = ({ today }) => (
    <div className={styles.date}>
        <CalendarDate />
        {today.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
    </div>
);

const Day = ({ today }) => (
    <div className={styles.day}>
        <CalendarDay />
        {today.toLocaleDateString('en-US', { weekday: 'long' })}
    </div>
);

const Time = () => {
    const today = new Date();
    const [time, setTime] = useState('');

    useEffect(() => {
        const time_update = setTimeout(() => {
            setTime(today.toLocaleTimeString());
        }, 1000);

        return () => clearTimeout(time_update);
    }, [today]);

    return (
        <div className={styles.time}>
            <Clock />
            {time}
        </div>
    );
};
