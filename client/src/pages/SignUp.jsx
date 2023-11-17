import React from 'react';
import useSignUp from '../hooks/useSignUp';
import '../styles/SignUp.css';
import '../styles/Form.css';

function SignUp() {
    const { inputs, handleInputChange, handleSubmit } = useSignUp();

    return (
        <div className="form-container">
            <h1 className='form-header'>Let's Get Started</h1>
            <form onSubmit={handleSubmit}>
                <div className="label-input-wrapper">
                    <div>
                        <label>First Name</label>
                        <input type="text" name="firstName" onChange={handleInputChange} value={inputs.firstName} required />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type="text" name="lastName" onChange={handleInputChange} value={inputs.lastName} required />
                    </div>
                </div>
                <div>
                    <label>Email</label>
                    <input className="input-full-width" type="email" name="email" onChange={handleInputChange} value={inputs.email} required />
                </div>
                <div className="label-input-wrapper">
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" onChange={handleInputChange} value={inputs.password} required />
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" onChange={handleInputChange} value={inputs.confirmPassword} required />
                    </div>
                </div>
                <button className="submit-button" type="submit"><span>Sign Up </span></button>
            </form>
        </div>
    );
}

export default SignUp;
