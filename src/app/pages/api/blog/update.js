import { connectDatabase } from '../Db/db';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { id, title, content } = req.body;

        try {
            const db = await connectDatabase(); // Connexion à MongoDB
            const articlesCollection = db.collection('articles');

            const result = await articlesCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { title, content } }
            );

            res.status(200).json({ message: 'Article mis à jour avec succès' });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'article', error);
            res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'article' });
        }
    } else {
        res.status(405).end(); // Méthode non autorisée
    }
}
