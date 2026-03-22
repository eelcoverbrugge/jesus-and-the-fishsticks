import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'pressDownload',
  title: 'Persdownload',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'category',
      title: 'Categorie',
      type: 'string',
      options: {
        list: [
          { title: 'Bio (NL)', value: 'bio-nl' },
          { title: 'Bio (EN)', value: 'bio-en' },
          { title: "Persfoto's", value: 'photos' },
          { title: "Logo's", value: 'logos' },
          { title: 'Tech rider', value: 'tech-rider' },
          { title: 'Overig', value: 'other' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'PDF-bestand',
      type: 'file',
      options: { accept: 'application/pdf' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Volgorde (laag = eerst)',
      type: 'number',
      initialValue: 10,
    }),
  ],
  preview: {
    select: { title: 'title', category: 'category' },
    prepare({ title, category }) {
      const icons: Record<string, string> = {
        'bio-nl': '🇳🇱', 'bio-en': '🇬🇧', photos: '🖼️',
        logos: '🔤', 'tech-rider': '🎚️', other: '📄',
      };
      return { title, subtitle: category, media: () => icons[category] ?? '📄' };
    },
  },
});
