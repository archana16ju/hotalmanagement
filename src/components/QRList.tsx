'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@payloadcms/ui'
import QRCode from 'qrcode'

interface QRListProps {
  document: any
}

const QRList = ({ document }: QRListProps) => {
  const [qrImages, setQrImages] = useState<
    { tableName: string; qrBase64: string }[]
  >([])

  const qrSettings = document?.qrSettings
  if (!qrSettings) return <div>Select a QR Settings document first</div>

  useEffect(() => {
    const generateQRs = async () => {
      if (!qrSettings?.tablecollections?.sections || !qrSettings.qrConfig?.enabled)
        return

      const baseUrl = qrSettings.qrConfig.baseurl
      const images: { tableName: string; qrBase64: string }[] = []

      for (const section of qrSettings.tablecollections.sections) {
        if (!section.tablecount) continue

        for (let i = 1; i <= section.tablecount; i++) {
          const tableSlug =
            section.sectionTitle.toLowerCase().replace(/\s+/g, '-') +
            `-table-${i}`
          const qrUrl = `${baseUrl}${tableSlug}`
          const qrBase64 = await QRCode.toDataURL(qrUrl)

          images.push({
            tableName: `${section.sectionTitle} Table ${i}`,
            qrBase64,
          })
        }
      }

      setQrImages(images)
    }

    generateQRs()
  }, [qrSettings])

  if (!qrImages.length) return <div>No QR codes to display</div>

  const handlePrint = () => {
    const win = window.open('', '_blank')
    if (!win) return

    let html = `
      <html>
        <head>
          <title>Print QR Codes</title>
          <style>
            body { font-family: sans-serif; display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 20px; }
            .qr-item { text-align: center; margin: 10px; }
            .qr-item img { width: 200px; height: 200px; }
            .qr-item h3 { margin-top: 10px; font-size: 16px; }
          </style>
        </head>
        <body>
    `
    for (const qr of qrImages) {
      html += `
        <div class="qr-item">
          <img src="${qr.qrBase64}" />
          <h3>${qr.tableName}</h3>
        </div>
      `
    }
    html += '</body></html>'

    win.document.write(html)
    win.document.close()
    win.focus()
    win.print()
    win.close()
  }

  const handleDownloadAll = () => {
    for (const qr of qrImages) {
      const link = document.createElement('a')
      link.href = qr.qrBase64
      link.download = `${qr.tableName}.png`
      link.click()
    }
  }

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
        {qrImages.map((qr, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <img src={qr.qrBase64} width={150} height={150} />
            <div>{qr.tableName}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 10 }}>
        <Button onClick={handlePrint} style={{ marginRight: 10 }}>
          🖨 Print All
        </Button>
        <Button onClick={handleDownloadAll}>⬇ Download All</Button>
      </div>
    </div>
  )
}

export default QRList