"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Home() {
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("http://localhost:4000")

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setMessage(data.message)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data")
      setMessage(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">API Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : message ? (
            <div className="p-4 bg-gray-100 rounded-md">
              <p className="text-center break-words">{message}</p>
            </div>
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}

          <Button onClick={fetchData} className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Refresh Data"
            )}
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
