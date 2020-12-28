Organisation des images :

- L'image générée dans le dossier app utilise l'image générée dans le dossier static.
- On copie le dossier dist généré par l'image static dans le dossier public de l'image app.
- Il est donc important de build l'image static avant l'image app
- Les images sont ensuite push sur un repository.
- En production, seul l'image app est monté sur un container à l'aide docker-compose

Pour commencer à développer sur le projet :

App:

- Aller dans le dossier app
- Si l'image docker n'est pas présente sur votre machine : make build
- Lancer la commande make exec permettant de lancer le container en mode interactif
- Une fois dedans, taper la commande : npm run dev
- Vous pouvez commencer à travailler de le dossier app

Static:

- Aller dans le dossier static
- Si l'image docker n'est pas présente sur votre machine : make build
- Lancer la commande make exec permettant de lancer le container en mode interactif
- Une fois dedans, taper la commande : npm run dev
- Vous pouvez commencer à travailler de le dossier static