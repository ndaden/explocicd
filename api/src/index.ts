import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';

const app = new Elysia()
  // Configuration de Swagger
  .use(
    swagger({
      documentation: {
        info: {
          title: 'ExploCI/CD API Documentation',
          version: '1.0.0',
          description: 'API ElysiaJS avec exemples de routes',
        },
        tags: [
          { name: 'General', description: 'Routes générales' },
          { name: 'Users', description: 'Gestion des utilisateurs' },
        ],
      },
    })
  )
  
  // Route d'exemple simple
  .get('/', () => ({
    message: 'Bienvenue sur l\'API ExploCI/CD',
    version: '1.0.0',
    documentation: '/swagger',
  }), {
    detail: {
      tags: ['General'],
      summary: 'Route d\'accueil',
      description: 'Retourne les informations de base de l\'API',
    },
  })
  
  // Route d'exemple avec paramètre
  .get('/hello/:name', ({ params: { name } }) => ({
    message: `Bonjour ${name}!`,
    timestamp: new Date().toISOString(),
  }), {
    detail: {
      tags: ['General'],
      summary: 'Salutation personnalisée',
      description: 'Retourne un message de bienvenue personnalisé',
    },
  })
  
  // Exemple de route POST avec validation
  .post('/users', ({ body }) => ({
    success: true,
    message: 'Utilisateur créé avec succès',
    user: body,
  }), {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        age: { type: 'number', minimum: 0 },
      },
      required: ['name', 'email'],
    },
    detail: {
      tags: ['Users'],
      summary: 'Créer un utilisateur',
      description: 'Crée un nouvel utilisateur avec les données fournies',
    },
  })
  
  // Exemple de route GET pour récupérer des utilisateurs
  .get('/users', () => ({
    users: [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
    ],
  }), {
    detail: {
      tags: ['Users'],
      summary: 'Lister les utilisateurs',
      description: 'Retourne la liste de tous les utilisateurs',
    },
  })
  
  // Route avec paramètre d'URL
  .get('/users/:id', ({ params: { id } }) => ({
    user: {
      id: parseInt(id),
      name: 'Utilisateur exemple',
      email: 'user@example.com',
    },
  }), {
    detail: {
      tags: ['Users'],
      summary: 'Récupérer un utilisateur',
      description: 'Retourne les informations d\'un utilisateur spécifique',
    },
  })
  
  // Route de health check
  .get('/health', () => ({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }), {
    detail: {
      tags: ['General'],
      summary: 'Vérification de santé',
      description: 'Vérifie que l\'API est opérationnelle',
    },
  })
  
  .listen(3001);

console.log(
  `🦊 L'API Elysia est démarrée sur ${app.server?.hostname}:${app.server?.port}`
);
console.log(`📚 Documentation Swagger disponible sur http://localhost:${app.server?.port}/swagger`);


