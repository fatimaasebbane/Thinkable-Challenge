import { connectDatabase } from '../Db/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { title, content } = req.body;

        try {
            const db = await connectDatabase(); // Connexion à MongoDB
            const articlesCollection = db.collection('articles');

            const result = await articlesCollection.insertOne({ title, content });

            res.status(201).json({ message: 'Article créé avec succès', article: result.ops[0] });
        } catch (error) {
            console.error('Erreur lors de la création de l\'article', error);
            res.status(500).json({ message: 'Erreur lors de la création de l\'article' });
        }
    } else {
        res.status(405).end(); // Méthode non autorisée
    }
}
