import {onCall, HttpsError, onRequest} from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import Stripe from "stripe";


import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";

const app = initializeApp();
const key = defineSecret("STRIPE_S_KEY")
const wh_secret = defineSecret("STRIPE_WH_KEY")
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
        success_url: "http://localhost:5173/",
        cancel_url: "http://localhost:5173/plans",
        client_reference_id: user.uid
        
    })

    return { id: session.id };
})

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

