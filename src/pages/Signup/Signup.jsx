import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { sendVerification, continueWithEmailPassword, createUser } from "../../utils/firebase";
import { Form } from 'radix-ui';
import { useAuth } from '../../context/AuthContext';


function Signup() {
    // Auth State
    const { userLoading } = useAuth();

    
    // Hooks
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [touched, setTouched] = useState({email:false, password:false, confirmPassword:false});

    // Handlers

    const handleChange = (e) => {
        const {name, value} = e.target;
        setContact( (prev) => {
            return {...prev, [name]: value}
    })
    }

    console.log(contact);
    console.log(userLoading);

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const p1 = contact.password.trim();
    const p2 = contact.confirmPassword.trim();
    if (p1 !== p2) return;

    try { // Create User
      setSubmitting(true);
      const { user } = await continueWithEmailPassword(contact.email, p1);
      await createUser(user, { email: contact.email });
      try { // Send Email Verification
          await sendVerification(user);
        } catch (err) {
          console.warn("Failed to send email verification: ", err);
        }
      navigate("/check-email", { replace: true });
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };
"bg-white p-2 rounded text-zinc-500 ring-1 ring-zinc-200"
  // Validation Styling
  const baseStyle = "bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black"
  const checkedStyle = "bg-white p-2 rounded text-zinc-600 ring-1 ring-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:invalid:ring-red-600 invalid:ring-2 invalid:ring-red-600 valid:ring-2 focus:valid:ring-emerald-500 valid:ring-emerald-600"


  return (
     <section className="flex mx-auto max-w-screen-xl min-h-[100dvh] w-full items-center justify-center">
      <article className="flex flex-col gap-4 w-fit">
        <Link to="/" className="text-zinc-600">Go Back</Link>

        <Form.Root
          onSubmit={handleSubmit}
          className="ring-1 ring-zinc-200 flex flex-col gap-6 bg-zinc-100 min-h-[50dvh] min-w-[20dvw] p-10 shadow-2xl rounded"
          validationBehavior="live"
        >
          <h1 className="self-center font-semibold text-xl">DEV@Deakin</h1>

          {/* Email */}
          <Form.Field name="email" className="flex flex-col gap-2">
            <Form.Label>Email</Form.Label>
            <Form.Control asChild>
              <input
                name="email" 
                id="email"
                type="email"
                value={contact.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                autoComplete="email"
                onBlur={() => setTouched(p => ({...p, email: true}))}
                required
                className={touched.email ? checkedStyle : baseStyle}
              />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-xs text-red-600">Email is required.</Form.Message>
            <Form.Message match="typeMismatch" className="text-xs text-red-600">Enter a valid email.</Form.Message>
          </Form.Field>

          {/* Password */}
          <Form.Field name="password" className="flex flex-col gap-2">
            <Form.Label>Password</Form.Label>
            <Form.Control asChild>
              <input
                name="password"
                id="password"
                type="password"
                value={contact.password}
                onChange={handleChange}
                placeholder="••••••"
                autoComplete="new-password"
                onBlur={() => setTouched(p => ({...p, password: true}))}
                minLength={6}
                required
                className={touched.password ? checkedStyle : baseStyle}
              />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-xs text-red-600">Password is required.</Form.Message>
            <Form.Message match="tooShort" className="text-xs text-red-600">Password must be atleast 6 characters.</Form.Message>
          </Form.Field>

          {/* Confirm Password */}
          <Form.Field name="confirmPassword" className="flex flex-col gap-2">
            <Form.Label>Confirm</Form.Label>
            <Form.Control asChild>
              <input
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                value={contact.confirmPassword}
                onChange={handleChange}
                placeholder="••••••"
                autoComplete="new-password"
                onBlur={() => setTouched(p => ({...p, confirmPassword: true}))}
                required
                className={touched.confirmPassword ? checkedStyle : baseStyle}
              />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-xs text-red-600">
              Please confirm your password.
            </Form.Message>
            <Form.Message match={(value, formData) => value !== formData.get("password")} className="text-xs text-red-600">
              Passwords do not match.
            </Form.Message>
          </Form.Field>

          <Form.Submit asChild>
            {submitting 
            ? 
            <button
              type="submit"
              disabled
              className="my-auto mt-10 w-full cursor-pointer rounded bg-teal-500 px-3 py-2 text-lg font-semibold text-white opacity-50 flex gap-2 items-center justify-center"
            >
              <svg aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              Sign Up
            </button>
            :
            <button
              type="submit"
              className="my-auto mt-10 w-full cursor-pointer rounded bg-teal-500 px-3 py-2 text-lg font-semibold text-white hover:bg-teal-400"
            >
              Sign Up
            </button>
            }
          </Form.Submit>
          {/* Error Display */}
          {error ? <div className="text-red-600">{error}</div> : ""}
          {/* To Login */}
          <p className="text-zinc-400 self-center flex gap-1">
                        Already have an account?
                        <Link to="/login" className="text-teal-600">Login</Link>
                      </p>
        </Form.Root>
      </article>
    </section>
  )
}

export default Signup