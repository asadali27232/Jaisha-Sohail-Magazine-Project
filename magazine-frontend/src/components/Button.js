const Button = ({ text, onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}>
            {text}
        </button>
    );
};

export default Button;
