import { connectDatabase } from '../Db/db';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id } = req.body;

        try {
            const db = await connectDatabase(); // Connexion à MongoDB
            const articlesCollection = db.collection('articles');

            const result = await articlesCollection.deleteOne({ _id: new ObjectId(id) });

            res.status(200).json({ message: 'Article supprimé avec succès' });
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'article', error);
            res.status(500).json({ message: 'Erreur lors de la suppression de l\'article' });
        }
    } else {
        res.status(405).end(); // Méthode non autorisée
    }
}
