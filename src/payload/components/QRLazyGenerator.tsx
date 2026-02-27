'use client'

import React, { useState } from 'react'
import QRCode from 'qrcode'
import { useFormFields } from '@payloadcms/ui'

const QRLazyGenerator = () => {

  const formFields = useFormFields(([fields]) => fields)

  const baseurl = formFields?.['qrConfig.baseurl']?.value
  const size = formFields?.['qrConfig.size']?.value || 300
  const tablecollections = formFields?.['tablecollections']?.value

  const [qrs, setQrs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const generateQRCodes = async () => {

    if (!baseurl) {
      alert('Missing Base URL. Please enter and SAVE.')
      return
    }

    if (!tablecollections) {
      alert('Please select Tables Collection and SAVE.')
      return
    }

    setLoading(true)

    try {

      const res = await fetch(`/api/tables/${tablecollections}`)

      if (!res.ok) {
        throw new Error('Failed to fetch tables')
      }

      const tableDoc = await res.json()

      const sections = tableDoc?.sections

      if (!sections?.length) {
        alert('No sections found')
        setLoading(false)
        return
      }

      const list: any[] = []

      for (const section of sections) {

        const count = section.tableCount || section.tablecount

        if (!count) continue

        for (let i = 1; i <= count; i++) {

          const slug =
            section.sectionTitle.toLowerCase().replace(/\s+/g, '-') +
            `-table-${i}`

          const url = baseurl + slug

          const image = await QRCode.toDataURL(url, {
            width: 300,
            margin: 2,
          })

          list.push({
            name: `${section.sectionTitle} Table ${i}`,
            image,
            url,
          })
        }
      }

      setQrs(list)

    } catch (error) {

      console.error(error)
      alert('Error generating QR codes')

    }

    setLoading(false)
  }

  const printQRCodes = () => {

    if (!qrs.length) {
      alert('Generate QR codes first')
      return
    }

    const printWindow = window.open('', '_blank')

    if (!printWindow) return

    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Codes</title>
          <style>
            body {
              font-family: Arial;
              display: flex;
              flex-wrap: wrap;
              gap: 20px;
              padding: 20px;
            }
            .qr-item {
              width: 200px;
              text-align: center;
              margin-bottom: 20px;
            }
            img {
              width: 180px;
              height: 180px;
            }
          </style>
        </head>
        <body>
          ${qrs.map(qr => `
            <div class="qr-item">
              <img src="${qr.image}" />
              <div>${qr.name}</div>
            </div>
          `).join('')}
        </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.focus()

    setTimeout(() => {
      printWindow.print()
    }, 500)
  }

  return (

    <div style={{ padding: 20 }}>

      <button
        type="button"
        onClick={generateQRCodes}
        disabled={loading}
        style={{
          padding: '10px 20px',
          background: '#000',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          marginRight: 10
        }}
      >
        {loading ? 'Generating...' : 'Generate QR Codes'}
      </button>

      <button
        type="button"
        onClick={printQRCodes}
        style={{
          padding: '10px 20px',
          background: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Print QR Codes
      </button>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 20,
        marginTop: 20
      }}>

        {qrs.map((qr, i) => (

          <div key={i} style={{ textAlign: 'center' }}>

            <img src={qr.image} width={150} />

            <div style={{ marginTop: 5 }}>
              {qr.name}
            </div>

            <a
              href={qr.image}
              download={`${qr.name}.png`}
              style={{ fontSize: 12 }}
            >
              Download
            </a>

          </div>

        ))}

      </div>

    </div>
  )
}

export default QRLazyGenerator