import { userCollection } from "../app/firestore";
const getHistoryById = async (userId: string, historyId: string) => {
    const historyCollection = await userCollection.doc(userId).collection('history').where("id", "==", historyId).get();
    const history = historyCollection.docs.map((doc) => {
        const data = doc.data();
        return data;
    })
    const historyData = history[0];
    return { historyData };
}


export { getHistoryById };