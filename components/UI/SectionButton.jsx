import Button from './Button';

const SectionButton = (props) => {
    return (
        <div>
            <h1>{props.text}</h1>
            <Button link={props.link} href={props.href}>
                {props.children}
            </Button>
        </div>
    );
};

export default SectionButton;
