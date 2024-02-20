import {createHash} from "node:crypto"

const users = []    // Simule BDD pour le stockage des utilisateurs
const role = ['admin', 'utilisateur']

export const addUser = async (req, res) => {
    const {email, password} = req.body
    const hashedPassword = createHash("sha256").update(password).digest().toString("hex")

    let user = users.find((u) => u.email === email && u.password === hashedPassword)
    if (user) {
        res.status(401).send({
            message: "Utilisateur déjà enregistré",
            user
        })
    } else {
        // Ajoute le nouvel utilisateur à la liste users
        const newUser = { email, password: hashedPassword, role: 'utilisateur' }; // Vous pouvez générer le rôle de manière aléatoire
        users.push(newUser);
        res.status(200).send({
            message: 'Utilisateur enregistré avec succès',
            user: newUser,
        });
    }

}

export const loginUser = async function (req, res) {

    const { email, password } = req.body;
    const hashedPassword = createHash('sha256').update(password).digest('hex');

    let user = users.find((u) => u.email === email && u.password === hashedPassword);
    if (user) {
        // Générez le jeton JWT ici
        const token = app.jwt.sign({ email, role: user.role });

        res.status(200).send({
            message: 'Connexion réussie',
            token,
        });
    } else {
        res.status(401).send({
            message: 'Utilisateur non-identifié',
        });
    }

}