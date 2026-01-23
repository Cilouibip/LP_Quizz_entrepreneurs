#!/bin/bash
echo "🔄 Redémarrage du serveur Next.js..."

echo "📛 Arrêt des processus sur le port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

echo "🧹 Nettoyage du cache..."
rm -rf .next
rm -rf node_modules/.cache

echo "🚀 Démarrage du serveur..."
npm run dev
