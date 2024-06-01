import { ResponseError } from '../../error/response-error';
import { db } from '../../app/firestore';
import { FieldValue } from '@google-cloud/firestore';
import { VerificationResponseError } from '../../error/response-error-page';

const verificationService = async (token: string) => {
    if(token) {
        const userCollection = db.collection('users');
        const user = await userCollection.where('verificationToken', '==', token).get();
        const result = user.docs.map((doc) => {
            const data = doc.data();
            return data;
        });
        if (result.length <= 0) {
            throw new VerificationResponseError(401, 'Verification Token is wrong', '../response/failed-verification.html');
        }
        const userDoc = user.docs[0];
        const userData = userDoc.data();
        const verificationTokenExpires = userData.verificationTokenExpires;
        const currentDate = new Date();
        if (verificationTokenExpires < currentDate) {
            throw new VerificationResponseError(401, 'Verification Token is expired', '../response/failed-verification.html');
        }
        const newUser = {
            verified: true
        };
        const userVerified = await userCollection.doc(userDoc.id).update(newUser);
        await userCollection.doc(userDoc.id).update({verificationTokenExpires: FieldValue.delete(), verificationToken: FieldValue.delete()});
        if (userVerified) {
            return {
                verified: true
            };
        }
    }
    throw new ResponseError(401, 'Verification Token is unavailable');
}

export {verificationService};