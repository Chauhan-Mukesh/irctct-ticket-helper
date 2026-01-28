'use client'

import { useState } from 'react'

interface BookingFormData {
  source: string
  destination: string
  travelDate: string
  passengerCount: number
  travelClass: string
  priority: string
}

interface AnalysisResult {
  journeySummary: string
  bestDirectTrains: string
  smartBookingHacks: string
  quotaRecommendation: string
  confirmationProbability: string
  bookingCalendar: string
  backupStrategies: string
}

export default function Home() {
  const [formData, setFormData] = useState<BookingFormData>({
    source: '',
    destination: '',
    travelDate: '',
    passengerCount: 1,
    travelClass: '3A',
    priority: 'confirmation'
  })
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze booking options')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'passengerCount' ? parseInt(value) : value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-2">
            IRCTC Expert Ticketing Agent
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            AI-Powered Ticket Booking Optimization for Indian Railways
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="source" className="block text-sm font-medium mb-2">
                    Source Station
                  </label>
                  <input
                    type="text"
                    id="source"
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    placeholder="e.g., Mumbai Central"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="destination" className="block text-sm font-medium mb-2">
                    Destination Station
                  </label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="e.g., New Delhi"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="travelDate" className="block text-sm font-medium mb-2">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    id="travelDate"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="passengerCount" className="block text-sm font-medium mb-2">
                    Passenger Count
                  </label>
                  <input
                    type="number"
                    id="passengerCount"
                    name="passengerCount"
                    value={formData.passengerCount}
                    onChange={handleInputChange}
                    min="1"
                    max="6"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="travelClass" className="block text-sm font-medium mb-2">
                    Travel Class
                  </label>
                  <select
                    id="travelClass"
                    name="travelClass"
                    value={formData.travelClass}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="1A">1A - First AC</option>
                    <option value="2A">2A - Second AC</option>
                    <option value="3A">3A - Third AC</option>
                    <option value="SL">SL - Sleeper</option>
                    <option value="2S">2S - Second Sitting</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium mb-2">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="time">Time (Fastest)</option>
                    <option value="confirmation">Confirmation (Highest Probability)</option>
                    <option value="cost">Cost (Economical)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Analyzing...' : 'Get Expert Recommendations'}
              </button>
            </form>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {result && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
              <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                Expert Analysis Results
              </h2>

              <section className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Journey Summary
                </h3>
                <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                  {result.journeySummary}
                </div>
              </section>

              <section className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Best Direct Train Options
                </h3>
                <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                  {result.bestDirectTrains}
                </div>
              </section>

              <section className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Smart Booking Hacks
                </h3>
                <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                  {result.smartBookingHacks}
                </div>
              </section>

              <section className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Quota Recommendation
                </h3>
                <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                  {result.quotaRecommendation}
                </div>
              </section>

              <section className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Confirmation Probability
                </h3>
                <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                  {result.confirmationProbability}
                </div>
              </section>

              <section className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  60-Day Booking Calendar Insight
                </h3>
                <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                  {result.bookingCalendar}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Backup Strategies
                </h3>
                <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                  {result.backupStrategies}
                </div>
              </section>
            </div>
          )}
        </div>

        <footer className="text-center mt-12 text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            This AI assistant provides strategic advice based on historical data and patterns.
            Always verify availability on the official IRCTC website before booking.
          </p>
        </footer>
      </div>
    </div>
  )
}
