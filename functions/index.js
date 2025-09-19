import {onCall, HttpsError, onRequest} from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import Stripe from "stripe";
import { Resend } from "resend";
import OpenAI from "openai";

import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";

const app = initializeApp();
const key = defineSecret("STRIPE_S_KEY") // Secrey key
const wh_secret = defineSecret("STRIPE_WH_KEY") // Webhook key
const RESEND_API_KEY = defineSecret("RESEND_API_KEY"); // resend key
const OPEN_AI_KEY = defineSecret("OPEN_AI_KEY"); // OPENAI key

const db = getFirestore(app);

// const firebaseAdmin = initializeApp();

// Create checkout session, pass our SK and request data
export const createCheckoutSession = onCall({ secrets: [key], enforceAppCheck: false }, async (req) => {
    // Auth check
    const user = req.auth;
    if (!user.uid) throw new HttpsError('unauthenticated', "Please login first!");
    const stripe = new Stripe(key.value());
    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price: "price_1RybZ23KZSngSUl4PoPVcQ4X",
            quantity: 1,
        }],
        mode: "subscription",
        success_url: `http://localhost:5173/summary?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: "http://localhost:5173/plans",
        client_reference_id: user.uid
        
    })

    return { id: session.id };
})

// Webhook
export const stripeWebhook = onRequest({ secrets: [key, wh_secret] }, async (req, res) => {
    let event = req.rawBody;
    const stripe = new Stripe(key.value());
    if (wh_secret) {
        const signature = req.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                req.rawBody,
                signature,
                wh_secret.value(),
            );
        } catch (err) {
            console.log("Webhook signature verification failed", err.message)
            return res.sendStatus(400);
        }
    }

    switch (event.type) {
        case 'checkout.session.completed':
            {
            const completed = event.data.object;
            console.log(completed);
            // Update Firestore
            const uid = completed.client_reference_id;
            console.log(uid);
            const userDocRef = db.doc(`users/${uid}`);
            await userDocRef.set({ plan: "pro", subscriptionStatus: "active" }, { merge: true })
            res.send();
            break;
            }
        case 'checkout.session.expired':
            break;
        case 'checkout.session.async_payment_succeeded':
            break;
        case 'checkout.session.async_payment_failed':
            break;
    }

    res.send();
})

// Resend newsletter + add to subscriber list
export const subscribeToNewsletter = onCall({ secrets: [RESEND_API_KEY] }, async (req) => {
    console.log(req.data);
    const data = req.data;
    const uid = req.auth?.uid;
    const email = data?.email;
    const displayName = data?.displayName;

    if (!email) throw new HttpsError("invalid-argument", "Email required to subscribe.");
    if (!req.auth?.uid) throw new HttpsError("unauthenticated", "Please login first!");

    const key = RESEND_API_KEY.value();
    const resend = new Resend(key);

     const welcome_msg = {
        from: "DEV@Deakin <onboarding@resend.dev>",
        to: email, 
        subject: 'Welcome to Deakin Daily Insider!',
        html: `Hi <strong>${displayName}</strong>, thanks for subscribing to Daily Insider. I hope you enjoy the scoop to come!`,
        text: `Hi ${displayName}, thanks for subscribing to Daily Insider. I hope you enjoy the scoop to come!`,
    }

    try {
        await resend.emails.send(welcome_msg);
        const userDocRef = db.doc(`subscribers/${uid}`);
        await userDocRef.set({ displayName: displayName, email: email }, { merge: true });
        return {ok: true}
    } catch (err) {
        console.error("Error", err.message)
        return {ok: false, error: err.message}
    }
})

// OpenAI --- DEVBot

export const sendToChat = onCall( {secrets: [OPEN_AI_KEY] },  async (req) => {
    const query = req.data.trim();
    
    if (!query) throw new Error("Enter something to chat!");

    const client = new OpenAI({ apiKey: OPEN_AI_KEY.value() })

    const DEVBOT = `
    You are DEVBot. Always write GitHub-Flavored Markdown.
    - In your first message, always introduce yourself as DEVBot with a robot emoji.
    - You exist to serve students who need help with programming and development.
    - Be kind, slightly sycophantic and encouraging to promote happiness and overall learning experience.
    - Derive your answers from legitimate sources, and explain like the greatest teacher of all time.
    - Use headings when helpful.
    - Put code in fenced blocks with a language tag.
    - Never wrap the entire response in a single code fence.`;

    const response = await client.responses.create({
        model: "gpt-5-nano",
        input: [
            { role: "system", content: DEVBOT },
            { role: "user", content: query.trim() }
        ],
    })
    return response.output_text;
});
