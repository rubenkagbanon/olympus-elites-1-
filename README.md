# Olympus Elites

Site React + Vite pour le projet `olympus-elites`.

## Prérequis

- Node.js 18+ (ici Node 24 est utilisé)
- Corepack (pour exécuter `pnpm` sans l’installer globalement)

## Installation

```powershell
cd "C:\Users\ruben\OneDrive\Documents\Telech\olympus-elites (1)"
corepack pnpm install
```

## Lancer le site en développement

```powershell
cd "C:\Users\ruben\OneDrive\Documents\Telech\olympus-elites (1)"
corepack pnpm exec vite --host
```

Le serveur démarre normalement sur `http://localhost:5173/`, mais s’il y a un conflit de port il peut utiliser `http://localhost:3001/` ou un autre port disponible.

## Commands utiles

- `corepack pnpm exec vite --host` : démarrer le serveur de développement
- `corepack pnpm exec vite build` : construire l’application cliente
- `corepack pnpm exec vite preview --host` : prévisualiser la build production localement
- `corepack pnpm exec pnpm test` : exécuter les tests si disponibles

## Notes

- Le projet utilise `pnpm` et un `pnpm-lock.yaml`.
- Si `pnpm` n’est pas disponible globalement, Corepack garantit l’utilisation de la bonne version.
