import type { CollectionConfig } from 'payload'
import React from 'react'

export const QrSettings: CollectionConfig = {
  slug: 'qr-settings',
  timestamps: true,
  admin: {
    group: 'Settings',
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'tablecollections',
      type: 'relationship',
      relationTo: 'tables',
      required: true,
      label: 'Tables Collection',
    },
    {
      name: 'qrConfig',
      type: 'group',
      label: 'QR Configuration',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'baseurl',
          type: 'text',
          required: true,
          label: 'Base URL',
        },
        {
          name: 'size',
          type: 'number',
          defaultValue: 300,
          min: 100,
          max: 600,
        },
        {
          name: 'logoImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'qrGenerator',
      type: 'ui',
      admin: {
        position:'sidebar',
        components: {
          Field: '/payload/components/QRLazyGenerator',
        },
      },
    },
    {
      name: 'printconfig',
      type: 'group',
      label: 'Print Settings',
     admin: {
        position: 'sidebar',
     },
      fields: [
        {
          name: 'printsize',
          type: 'select',
          defaultValue: 'medium',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
        },
        {
          name: 'includeTableNumber',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'printTemplate',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },

    options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Generating', value: 'generating' },
        { label: 'Ready to print', value: 'ready' },
      ]
    },

  ],
}