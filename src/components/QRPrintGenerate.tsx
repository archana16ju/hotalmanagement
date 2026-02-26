'use client'

import React from 'react'
import QRCode from 'qrcode'

export const QRPrintGenerate = ({ data }: any) => {
  const generateQRImage = async (text: string) => QRCode.toDataURL(text)

  const printAll = async () => {
    if (!data?.tablecollections?.sections?.length || !data.qrConfig?.enabled) {
      alert('No tables or QR generation disabled')
      return
    }

    const win = window.open('', '_blank')
    if (!win) return

    let html = ''
    for (const section of data.tablecollections.sections) {
      for (let i = 1; i <= section.tablecount; i++) {
        const tableSlug = section.sectionTitle.toLowerCase().replace(/\s+/g, '-') + `-table-${i}`
        const qrBase64 = await generateQRImage(`${data.qrConfig.baseurl}${tableSlug}`)
        html += `<div style="text-align:center;margin:20px;display:inline-block">
          <img src="${qrBase64}" width="200"/>
          <h3>${section.sectionTitle} Table ${i}</h3>
        </div>`
      }
    }

    win.document.write(html)
    win.document.close()
    win.print()
    win.close()
  }

  const downloadAll = async () => {
    if (!data?.tablecollections?.sections?.length || !data.qrConfig?.enabled) return

    for (const section of data.tablecollections.sections) {
      for (let i = 1; i <= section.tablecount; i++) {
        const tableSlug = section.sectionTitle.toLowerCase().replace(/\s+/g, '-') + `-table-${i}`
        const qrBase64 = await generateQRImage(`${data.qrConfig.baseurl}${tableSlug}`)

        const link = document.createElement('a')
        link.href = qrBase64
        link.download = `${tableSlug}.png`
        link.click()
      }
    }
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <button onClick={printAll} style={{ marginRight: 10 }}>🖨 Print QR Codes</button>
      <button onClick={downloadAll}>⬇ Download QR Codes</button>
    </div>
  )
}