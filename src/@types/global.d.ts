export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  created_at: string;
  updated_at: string;
}

export interface Card {
  id: number;
  front: string;
  back: string;
  created_at: string;
  updated_at: string;
  next_review: string;
  userId: number;
  deckId: number;
}

interface Deck {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  userId: number;
  cards?: Card[];
}
