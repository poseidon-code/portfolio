const Technology = ({ technology }) => (
    <li>
        {technology.icon}
        <h2>{technology.technology}</h2>
        <span>{technology.text}</span>
    </li>
);

export default Technology;
