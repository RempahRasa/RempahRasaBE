import { ResponseError } from '../../error/response-error';
import { userCollection } from '../../app/firestore';
import { FieldValue } from '@google-cloud/firestore';
import { VerificationResponseError } from '../../error/response-error-page';
import { getUserByVerificationToken } from '../../utils/user/getUserByVerificationToken';

const verificationService = async (token: string) => {
  if (token) {
    const { userData } = await getUserByVerificationToken(token);
    if (!userData) {
      throw new VerificationResponseError(
        401,
        'Verification Token is wrong',
        '../response/failed-verification.html'
      );
    }
    const verificationTokenExpires = userData.verificationTokenExpires;
    const currentDate = new Date();

    if (verificationTokenExpires < currentDate) {
      throw new VerificationResponseError(
        401,
        'Verification Token is expired',
        '../response/failed-verification.html'
      );
    }

    const updatedUser = {
      verified: true
    };

    const userVerified = await userCollection.doc(userData.id).update(updatedUser);
    await userCollection.doc(userData.id).update({
      verificationTokenExpires: FieldValue.delete(),
      verificationToken: FieldValue.delete()
    });
    if (userVerified) {
      return {
        verified: true
      };
    }
  }
  throw new ResponseError(401, 'Verification Token is unavailable');
};

export { verificationService };
