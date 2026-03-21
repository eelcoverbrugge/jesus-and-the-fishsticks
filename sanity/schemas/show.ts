import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'show',
  title: 'Show',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naam van het optreden',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Datum & tijd',
      type: 'datetime',
      options: { dateFormat: 'DD-MM-YYYY', timeFormat: 'HH:mm' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Zaal / podium',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'Stad',
      type: 'string',
      initialValue: 'Eindhoven',
    }),
    defineField({
      name: 'doorsOpen',
      title: 'Zaal open (bijv. 20:00)',
      type: 'string',
    }),
    defineField({
      name: 'guestActs',
      title: 'Speciale gasten',
      type: 'string',
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Ticketlink',
      type: 'url',
    }),
    defineField({
      name: 'price',
      title: 'Prijs',
      type: 'string',
      description: 'Bijv. "Gratis", "€ 10", "TBA"',
      initialValue: 'Gratis',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Aankomend', value: 'upcoming' },
          { title: 'Binnenkort bekend', value: 'tba' },
          { title: 'Uitverkocht', value: 'sold-out' },
          { title: 'Geweest', value: 'past' },
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Releaseshow', 'Debut EP', 'Gratis toegang',
          'Festival', 'Club', 'Benefiet',
        ],
      },
    }),
    defineField({
      name: 'notes',
      title: 'Extra info',
      type: 'text',
      rows: 2,
    }),
  ],
  orderings: [
    {
      title: 'Datum (nieuwste eerst)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Datum (oudste eerst)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'venue',
      date: 'date',
      status: 'status',
    },
    prepare({ title, subtitle, date, status }) {
      const d = date ? new Date(date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
      const icons: Record<string, string> = { upcoming: '🟢', tba: '🟡', 'sold-out': '🔴', past: '⚫' };
      return {
        title: `${icons[status] ?? ''} ${title}`,
        subtitle: `${d}${subtitle ? ` · ${subtitle}` : ''}`,
      };
    },
  },
});
