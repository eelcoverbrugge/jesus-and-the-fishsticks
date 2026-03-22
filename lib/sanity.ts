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

export type PressDownload = {
  _id: string;
  title: string;
  description?: string;
  category: 'bio-nl' | 'bio-en' | 'photos' | 'logos' | 'tech-rider' | 'other';
  fileUrl: string;
  order?: number;
};

// ── GROQ queries ───────────────────────────────────────────────────────

export async function getPressDownloads(): Promise<PressDownload[]> {
  return client.fetch(
    `*[_type == "pressDownload"] | order(order asc) {
      _id, title, description, category, order,
      "fileUrl": file.asset->url
    }`
  );
}

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
    `*[_type == "show" && (status == "tba" || (status == "upcoming" && dateTime(date) >= dateTime(now())))] | order(date asc) {
      _id, title, date, venue, city, doorsOpen,
      guestActs, ticketUrl, price, status, tags, notes
    }`
  );
}

export async function getPastShows(): Promise<Show[]> {
  return client.fetch(
    `*[_type == "show" && (status == "past" || (status == "upcoming" && dateTime(date) < dateTime(now())))] | order(date desc) {
      _id, title, date, venue, city, doorsOpen,
      guestActs, ticketUrl, price, status, tags, notes
    }`
  );
}
