import { useState } from 'react';
import { supabase } from '../client';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css'; 

function Login({ setToken }) {
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });
            if (error) throw error;
            setToken(data);
            navigate('/homepage');
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="form-container login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
                <p className="signup-link">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
