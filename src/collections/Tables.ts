import type { CollectionConfig } from 'payload'

export const Tables: CollectionConfig = {
  slug: 'tables',

  admin: {
    useAsTitle: 'displayName',
  },

  fields: [
    {
      name: 'displayName',
      type: 'text',
      required: true,
      label: 'Floor / Area Name',
    },

    {
      name: 'sections',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'tableCount',
          type: 'number',
          required: true,
        },
      ],
    },
  ],
}