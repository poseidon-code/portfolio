import { useEffect, useState } from 'react';

import * as Icon from '@icons';

const Clock = () => {
    const TODAY = new Date();

    return (
        <>
            <DateMonth today={TODAY} />
            <Time />
            <Day today={TODAY} />
        </>
    );
};

export default Clock;

const DateMonth = ({ today }) => (
    <div style={{ gridArea: 'date' }}>
        <Icon.CalendarDate />
        {today.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
    </div>
);

const Day = ({ today }) => (
    <div style={{ gridArea: 'day' }}>
        <Icon.CalendarDay />
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
        <div style={{ gridArea: 'time' }}>
            <Icon.Clock />
            {time}
        </div>
    );
};
