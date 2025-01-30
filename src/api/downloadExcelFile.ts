'use client'
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ✅ Fetch Excel file from API on the client
export const DownloadExcelFile = async ({ wpId, token }: any) => {
  try {
    if (!wpId) throw new Error('Missing wpId')

    const response = await api.get(`/working-packages/${wpId}/gen-aufmass`, {
      responseType: 'blob', // 🔹 Ensures response is a Blob (binary data)
      headers: {
        Authorization: `Bearer ${token}`, // �� Add JWT token to request
      },
    })

    return response.data // 🔹 Return the Blob directly
  } catch (error) {
    console.error('❌ Error fetching Excel file:', error)
    throw error
  }
}

// ✅ Client-side function to trigger download
export const handleDownloadExcel = async ({ wpId, token }: any) => {
  try {
    const fileBlob = await DownloadExcelFile({ wpId, token })

    // 🔥 Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(new Blob([fileBlob]))

    // 🔥 Create a link and trigger download
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `working-package-${wpId}.xlsx`) // File name
    document.body.appendChild(link)
    link.click()

    // 🔥 Cleanup
    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('❌ Failed to download Excel file:', error)
  }
}
