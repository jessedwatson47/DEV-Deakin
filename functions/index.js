import {onCall, HttpsError} from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import Stripe from "stripe";


// import {initializeApp} from "firebase-admin/app";
// import {getFirestore} from "firebase-admin/firestore";

const key = defineSecret("STRIPE_S_KEY")

// const firebaseAdmin = initializeApp();

// Create checkout session, pass our SK and request data
export const createCheckoutSession = onCall({ secrets: [key], enforceAppCheck: true }, async (req) => {
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

