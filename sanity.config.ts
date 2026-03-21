import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'jesus-and-the-fishsticks',
  title: 'Jesus & The Fishsticks',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Inhoud')
          .items([
            S.listItem()
              .title('Shows & Agenda')
              .icon(() => '🎸')
              .child(S.documentTypeList('show').title('Shows')),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
