import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

// Sanity webhook stuurt een POST naar deze URL na elke wijziging.
// Voeg in Sanity > API > Webhooks toe:
//   URL: https://jouwdomein.nl/api/revalidate?secret=JOUW_SECRET
//   Dataset: production
//   Trigger on: Create, Update, Delete

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  revalidatePath('/shows');
  revalidatePath('/');

  return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() });
}
