// src/app/models/income.model.ts
export interface Income {
    title: string;
    amount: number;
    date: string; // Utilisez string pour les dates dans les formulaires
    category: string;
    description: string;
    userId: number; // Ajoutez cette propriété si nécessaire
  }
  