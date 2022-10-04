const Technology = props => (
    <li>
        {props.icon}
        <h2>{props.technology}</h2>
        <span>{props.text}</span>
    </li>
);

export default Technology;
