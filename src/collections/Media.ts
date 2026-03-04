import { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    group: 'Media',
  },
  upload: {
    staticDir: 'media',        
    mimeTypes: ['image/*'],   
  },
  fields: [
    {
      name: 'altText',
      type: 'text',
      required: false,
    },
  ],
};

export default Media;