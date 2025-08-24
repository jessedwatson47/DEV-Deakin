import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { sendPasswordReset } from '../../utils/firebase';
import { Form } from 'radix-ui';
import AlertModal from '../../components/AlertModal/AlertModal';
import {CheckCircledIcon} from '@radix-ui/react-icons'
import { continueWithEmailPassword, continueWithGoogle } from '../../utils/firebase';
import Spinner from '../../components/Spinner/Spinner';

function Login() {
    const navigate = useNavigate();

    const { user, loading } = useAuth();


    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [resetMsg, setResetMsg] = useState("");


    // Effect
    useEffect(() => {
        if (!loading && user && !user.isAnonymous) navigate("/", {replace:true});
    }, [user, loading, navigate]);

    // State
    const [contact, setContact] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    // Handlers

    const handleChange = (e) => {
        const {name, value} = e.target;
        setContact( (prev) => {
            return {...prev, [name]: value}
    })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
          await continueWithEmailPassword(contact.email, contact.password);
          navigate("/", { replace: true });
        } catch (err) {
          console.log(err.message);
          setError(err.message);
        } finally {
          setSubmitting(false);
        }
    }

    const loginWithGoogle = async(e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
          await continueWithGoogle();
          console.log(user);
        } catch (err) {
          console.log(err.message);
          setError(err.message);
        } finally {
          setSubmitting(false);
        }
    };

    const handleReset = async(e) => {
      e.preventDefault();
      try {
        setResetMsg(<p className="text-emerald-500 flex gap-2 items-center justify-center"><CheckCircledIcon/> If an account exists for that email, you'll get a reset link shortly.</p>);
        await sendPasswordReset(contact.email)
      } catch (err) {
        console.log(err.message);
      }
    }

  return (
    <section className="flex mx-auto max-w-screen-xl min-h-[100dvh] w-full items-center justify-center">
      <article className="flex flex-col gap-4 w-fit">
        <Link to="/" className="text-zinc-600">Go Back</Link>

        <Form.Root
          onSubmit={handleSubmit}
          className="ring-1 ring-zinc-200 flex flex-col gap-6 bg-zinc-100 min-h-[50dvh] min-w-[20dvw] p-10 shadow-2xl rounded"
        >
          <h1 className="self-center font-semibold text-xl">DEV@Deakin</h1>

          {/* Email */}
          <Form.Field name="email" className="flex flex-col gap-2">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control asChild>
              <input
                id="email"
                name="email"
                type="text"
                value={contact.email}
                onChange={handleChange}
                className="bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200"
                required
              />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-sm text-red-600">
              Email is required.
            </Form.Message>
          </Form.Field>

          {/* Password */}
          <Form.Field name="password" className="flex flex-col gap-2">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control asChild>
              <input
                id="password"
                name="password"
                type="password"
                value={contact.password}
                onChange={handleChange}
                className="bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200"
                required
              />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-sm text-red-600">
              Password is required.
            </Form.Message>
          </Form.Field>

          {/* Submit */}
          <Form.Submit asChild>
            {submitting 
            ? 
            <button
              type="submit"
              disabled
              className="my-auto mt-10 w-full cursor-pointer rounded bg-teal-500 px-3 py-2 text-lg font-semibold text-white opacity-50 flex gap-2 items-center justify-center"
            >
              <Spinner />
              Login
            </button>
            :
            <button
              type="submit"
              className="my-auto mt-10 w-full cursor-pointer rounded bg-teal-500 px-3 py-2 text-lg font-semibold text-white hover:bg-teal-400"
            >
              Login
            </button>
            }
          </Form.Submit>
            {/* Error Display */}
          {error ? <div className="text-red-600">{error}</div> : ""}
          {/* Google Login Btn */}
          <button
            type="button"
            onClick={loginWithGoogle}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 cursor-pointer"
            aria-label="Sign in with Google"
          >
            <svg className="w-4" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-zinc-400 self-center flex gap-1">
            Don't have an account?
            <Link to="/signup" className="text-teal-600">Sign Up</Link>
          </p>

          <AlertModal trigger="Forgot your password?" title="Reset your password" descText={resetMsg ? resetMsg : "Enter your email below:"} descInput={<input className="w-full bg-zinc-300 p-2 rounded" type="email" name="email" onChange={handleChange} value={contact.email} />} action="Send Reset" onClick={handleReset}></AlertModal>

        </Form.Root>
        
      </article>
    </section>
  )
}

export default Login