import Button from './Button';

const SectionButton = ({ children, text, ...rest }) => {
    return (
        <div>
            <h1>{text}</h1>
            <Button {...rest}>{children}</Button>
        </div>
    );
};

export default SectionButton;
