import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { SYSTEM_PROMPT } from '@/lib/systemPrompt'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

interface BookingRequest {
  source: string
  destination: string
  travelDate: string
  passengerCount: number
  travelClass: string
  priority: string
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json()

    // Validate required fields
    if (!body.source || !body.destination || !body.travelDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate passenger count
    if (body.passengerCount < 1 || body.passengerCount > 6) {
      return NextResponse.json(
        { error: 'Passenger count must be between 1 and 6' },
        { status: 400 }
      )
    }

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          error: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.',
          journeySummary: 'API Configuration Required',
          bestDirectTrains: 'Please configure your OpenAI API key to use this feature.',
          smartBookingHacks: 'Set the OPENAI_API_KEY environment variable in your .env.local file.',
          quotaRecommendation: 'You can get an API key from https://platform.openai.com',
          confirmationProbability: 'N/A',
          bookingCalendar: 'N/A',
          backupStrategies: 'N/A'
        },
        { status: 200 }
      )
    }

    // Create user prompt with booking details
    const userPrompt = `Please analyze this journey and provide expert recommendations:

Source Station: ${body.source}
Destination Station: ${body.destination}
Travel Date: ${body.travelDate}
Number of Passengers: ${body.passengerCount}
Travel Class: ${body.travelClass}
Priority: ${body.priority}

Provide a comprehensive analysis following the structured format with all 7 sections.`

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    })

    const analysisText = completion.choices[0]?.message?.content || ''

    // Parse the structured output
    const result = parseAnalysisOutput(analysisText)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error analyzing booking:', error)
    return NextResponse.json(
      { error: 'Failed to analyze booking options' },
      { status: 500 }
    )
  }
}

function parseAnalysisOutput(text: string) {
  const sections = {
    journeySummary: '',
    bestDirectTrains: '',
    smartBookingHacks: '',
    quotaRecommendation: '',
    confirmationProbability: '',
    bookingCalendar: '',
    backupStrategies: ''
  }

  // Split by section headers
  const patterns = [
    { key: 'journeySummary', regex: /(?:1\.|##?)\s*Journey Summary[:\s]*([\s\S]*?)(?=(?:2\.|##?)\s*Best Direct|$)/i },
    { key: 'bestDirectTrains', regex: /(?:2\.|##?)\s*Best Direct Train Options[:\s]*([\s\S]*?)(?=(?:3\.|##?)\s*Smart Booking|$)/i },
    { key: 'smartBookingHacks', regex: /(?:3\.|##?)\s*Smart Booking Hacks[:\s]*([\s\S]*?)(?=(?:4\.|##?)\s*Quota|$)/i },
    { key: 'quotaRecommendation', regex: /(?:4\.|##?)\s*Quota Recommendation[:\s]*([\s\S]*?)(?=(?:5\.|##?)\s*Confirmation|$)/i },
    { key: 'confirmationProbability', regex: /(?:5\.|##?)\s*Confirmation Probability[:\s]*([\s\S]*?)(?=(?:6\.|##?)\s*(?:60-Day|Booking Calendar)|$)/i },
    { key: 'bookingCalendar', regex: /(?:6\.|##?)\s*(?:60-Day Booking Calendar|Booking Calendar)[:\s]*([\s\S]*?)(?=(?:7\.|##?)\s*Backup|$)/i },
    { key: 'backupStrategies', regex: /(?:7\.|##?)\s*Backup Strategies[:\s]*([\s\S]*?)$/i }
  ]

  patterns.forEach(({ key, regex }) => {
    const match = text.match(regex)
    if (match && match[1]) {
      sections[key as keyof typeof sections] = match[1].trim()
    }
  })

  // If parsing fails, return the full text in journeySummary
  if (!sections.journeySummary && text) {
    sections.journeySummary = text
  }

  return sections
}
