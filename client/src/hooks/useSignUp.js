import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const useSignUp = () => {
    const { setUser } = useContext(UserContext);

    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }

        if (!inputs.firstName || !inputs.lastName || !inputs.email || !inputs.password || !inputs.confirmPassword) {
            return setError('Please enter all fields');
        }
    
        if (inputs.password !== inputs.confirmPassword) {
            return setError("Passwords don't match. Please try again.");
        }
    
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                firstName: inputs.firstName, 
                lastName: inputs.lastName, 
                email: inputs.email, 
                password: inputs.password 
            }),
        });
        const data = await response.json();
        if (response.ok) {
            setUser(data.user);
            navigate('/');
        } else {
            alert(`Error: ${data.msg}`);
        }
    };

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    };

    return {
        handleSubmit,
        handleInputChange,
        inputs,
        error
    };
};

export default useSignUp;
