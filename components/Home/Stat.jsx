const Stat = props => (
    <div>
        {props.icon}
        <h1>{props.number}</h1>
        <span>{props.text}</span>
    </div>
);

export default Stat;
