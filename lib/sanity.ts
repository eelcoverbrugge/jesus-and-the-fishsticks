import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-03-21',
  useCdn: false, // false = altijd actuele data
});

// ── Types ──────────────────────────────────────────────────────────────

export type Show = {
  _id: string;
  title: string;
  date: string;
  venue?: string;
  city?: string;
  doorsOpen?: string;
  guestActs?: string;
  ticketUrl?: string;
  price?: string;
  status: 'upcoming' | 'tba' | 'sold-out' | 'past';
  tags?: string[];
  notes?: string;
};

// ── GROQ queries ───────────────────────────────────────────────────────

export async function getShows(): Promise<Show[]> {
  return client.fetch(
    `*[_type == "show"] | order(date desc) {
      _id, title, date, venue, city, doorsOpen,
      guestActs, ticketUrl, price, status, tags, notes
    }`
  );
}

export async function getUpcomingShows(): Promise<Show[]> {
  return client.fetch(
    `*[_type == "show" && status in ["upcoming","tba"]] | order(date asc) {
      _id, title, date, venue, city, doorsOpen,
      guestActs, ticketUrl, price, status, tags, notes
    }`
  );
}

export async function getPastShows(): Promise<Show[]> {
  return client.fetch(
    `*[_type == "show" && status == "past"] | order(date desc) {
      _id, title, date, venue, city, doorsOpen,
      guestActs, ticketUrl, price, status, tags, notes
    }`
  );
}
