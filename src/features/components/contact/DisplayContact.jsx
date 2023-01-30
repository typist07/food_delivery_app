import React, { useState } from 'react'
import './displayContact.scss'
import { useForm, ValidationError } from '@formspree/react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../components/spinner/LoadingSpinner.jsx'

const DisplayContact = () => {
    const [loading, setLoading] = useState(true)
    const [state, handleSubmit] = useForm("mvonzppv");

    const displayStyle = loading ? { display: 'none' } : { display: 'block' }

    if (state.succeeded) {
        return (
            <div className='feeback__container'>
                <p className='thanks__feedback'>Thankyou for Contacting us. we will get back to you soon!!!</p>
                <button type="back" className="addTOCart__btn">
                    <Link to="/contact">Go Back</Link>
                </button>
            </div>
        )
    }

    return (
        <>
            {loading && <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}><LoadingSpinner /></div>}
            <iframe onLoad={() => setLoading(false)} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.879372356249!2d72.5062291!3d23.0282009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b7be1e11707%3A0x3b05de4f01dd08bc!2sIskcon%20ahmedabad!5e0!3m2!1sen!2sin!4v1674640919078!5m2!1sen!2sin" width="100%" height="450" style={{ displayStyle, border: 0, margin: '0.5rem 0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <form className="form" style={{ margin: '2rem auto' }} onSubmit={handleSubmit}>
                <div className="form__group">
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        required
                    />
                    <ValidationError
                        prefix="Name"
                        field="name"
                        errors={state.errors}
                        style={{ color: 'red' }}
                    />
                </div>

                <div className="form__group">
                    <input
                        id="email"
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        required
                    />
                    <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                        style={{ color: 'red' }}
                    />
                </div>

                <div className="form__group">
                    <textarea
                        id='message'
                        rows={5}
                        type="text"
                        name="message"
                        placeholder="Write your message"
                        required
                    />
                    <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                        style={{ color: 'red' }}
                    />
                </div>

                <button type="submit" disabled={state.submitting} className="addTOCart__btn">
                    Submit
                </button>
            </form>
        </>
    )
}

export default DisplayContact