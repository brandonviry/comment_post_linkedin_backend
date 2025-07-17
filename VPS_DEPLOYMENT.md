# Guide de Déploiement sur VPS

Ce document décrit les étapes pour déployer l'application backend sur un serveur VPS (Virtual Private Server) sous Ubuntu.

## Prérequis

- Un VPS avec Ubuntu 22.04 (ou supérieur).
- Un accès `root` ou un utilisateur avec des privilèges `sudo`.
- Un nom de domaine (ex: `api.votredomaine.com`) pointant vers l'adresse IP de votre VPS via un enregistrement DNS de type `A`.

## 1. Configuration Initiale du Serveur

Connectez-vous à votre VPS en SSH.

```bash
# Mettre à jour les paquets
sudo apt update && sudo apt upgrade -y

# Installer Git et Node.js (v18+)
sudo apt install git -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 2. Installation de l'Application

```bash
# Clonez votre dépôt (remplacez l'URL)
git clone https://github.com/votre-utilisateur/votre-projet.git
cd comment_post_linkedin_backend

# Installez les dépendances
npm install
```

## 3. Configuration du Pare-feu (UFW)

Nous ouvrons uniquement les ports nécessaires.

```bash
# Autoriser les connexions SSH (essentiel !)
sudo ufw allow OpenSSH

# Autoriser le port de l'application Node.js (pour le reverse proxy en local)
sudo ufw allow 3001

# Activer le pare-feu
sudo ufw enable
```
*Note : Les ports pour le web (80/443) seront ouverts plus tard via Nginx.*

## 4. Gestionnaire de Processus (PM2)

PM2 maintient l'application en ligne et la redémarre en cas de crash.

```bash
# Installer PM2 globalement
sudo npm install pm2 -g

# Démarrer l'application
pm2 start index.js --name linkedin-api

# Configurer PM2 pour qu'il se lance au démarrage du serveur
# (Copiez-collez la commande que pm2 startup vous donnera)
pm2 startup

# Sauvegarder la liste des processus
pm2 save
```

## 5. Reverse Proxy avec Nginx

Nginx reçoit les requêtes publiques (HTTPS) et les transmet à l'application qui tourne sur le port 3001.

### a. Installation

```bash
sudo apt install nginx -y
```

### b. Configuration

Créez un fichier de configuration pour votre site.

```bash
# Remplacez api.votredomaine.com par votre vrai sous-domaine
sudo nano /etc/nginx/sites-available/api.votredomaine.com
```

Collez ce contenu dans l'éditeur `nano` :

```nginx
server {
    listen 80;
    server_name api.votredomaine.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enregistrez (`Ctrl+X`, `Y`, `Entrée`).

### c. Activation

```bash
# Activez le site (remplacez par votre domaine)
sudo ln -s /etc/nginx/sites-available/api.votredomaine.com /etc/nginx/sites-enabled/

# Testez la configuration Nginx
sudo nginx -t
# Doit retourner 'syntax is ok' et 'test is successful'
```

## 6. Sécurisation avec HTTPS (Certbot)

Certbot installe un certificat SSL/TLS gratuit de Let's Encrypt.

```bash
# Installez Certbot
sudo apt install certbot python3-certbot-nginx -y

# Ouvrez les ports web dans le pare-feu
sudo ufw allow 'Nginx Full'

# Obtenez et installez le certificat (remplacez par votre domaine)
sudo certbot --nginx -d api.votredomaine.com
```

Suivez les instructions à l'écran. Choisissez l'option **2** pour rediriger tout le trafic HTTP vers HTTPS.

## 7. Mettre à jour l'Application

Pour déployer des changements depuis votre ordinateur :

1.  **Sur votre PC local :**
    ```bash
    git add .
    git commit -m "Votre message"
    git push
    ```

2.  **Sur votre VPS :**
    ```bash
    cd ~/comment_post_linkedin_backend
    git pull
    pm2 restart linkedin-api
    ```
