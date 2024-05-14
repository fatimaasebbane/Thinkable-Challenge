import { connectDatabase } from '../Db/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const db = await connectDatabase(); // Connexion à MongoDB
            const articlesCollection = db.collection('articles');

            let articles;
            if (req.query.id) {
                const article = await articlesCollection.findOne({ _id: new ObjectId(req.query.id) });
                if (article) {
                    res.status(200).json(article);
                } else {
                    res.status(404).json({ message: 'Article non trouvé' });
                }
            } else {
                articles = await articlesCollection.find({}).toArray();
                res.status(200).json(articles);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des articles', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des articles' });
        }
    } else {
        res.status(405).end(); // Méthode non autorisée
    }
}
