# IRCTC Expert Ticketing Agent

An AI-powered web application that provides expert ticket booking optimization for Indian Railways. This application acts as a veteran IRCTC booking expert with 10+ years of experience, helping users maximize their ticket confirmation probability through strategic recommendations.

## Features

- **🎯 Strategy-First Optimization**: Not just a search UI, but an intelligent booking strategist
- **🚂 Route Intelligence**: Suggests alternate boarding/destination stations to improve confirmation probability
- **📊 Quota Mastery**: Recommends optimal quota selection based on passenger profile and route
- **📅 Season-Aware Analysis**: Adapts strategies for festivals, holidays, and peak travel seasons
- **🎫 Waitlist Insights**: Analyzes historical patterns to predict confirmation probability
- **📆 60-Day Calendar Intelligence**: Identifies low-competition booking windows
- **💡 Smart Booking Hacks**: Station pair tricks and legal optimization strategies

## System Architecture

### Frontend
- **Framework**: Next.js (App Router)
- **UI**: Tailwind CSS with minimal, focused design
- **Features**: Responsive form with structured result sections

### Backend
- **Framework**: Next.js API Routes
- **AI Integration**: OpenAI GPT-4
- **System Prompt**: Expert IRCTC booking agent with comprehensive railway knowledge

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key (get from [OpenAI Platform](https://platform.openai.com))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Chauhan-Mukesh/irctct-ticket-helper.git
cd irctct-ticket-helper
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.local.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your_api_key_here
```

### Running the Application

#### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Production Build
```bash
npm run build
npm start
```

## Usage

1. **Enter Journey Details**:
   - Source station (e.g., "Mumbai Central")
   - Destination station (e.g., "New Delhi")
   - Travel date
   - Number of passengers
   - Travel class (1A, 2A, 3A, SL, 2S)
   - Priority (Time, Confirmation, or Cost)

2. **Get Expert Analysis**: Click "Get Expert Recommendations" to receive comprehensive booking strategies

3. **Review Results**: The AI provides 7 structured sections:
   - Journey Summary
   - Best Direct Train Options
   - Smart Booking Hacks (Station Pair Tricks)
   - Quota Recommendation
   - Confirmation Probability (Reasoned)
   - 60-Day Booking Calendar Insight
   - Backup Strategies (Tatkal/Split/Alternate Route)

## Core Capabilities

### 1. Network & Route Intelligence
- Real-world routes and travel times
- Route overlap and congestion analysis
- Alternate boarding station suggestions (1-2 stations before source)
- Alternate destination suggestions (1-3 stations after destination)

### 2. Quota Mastery
- General (GN), General Waitlist (GNWL)
- Remote Location (RLWL), Pooled Quota (PQWL)
- Ladies (LD), Senior Citizen (SS)
- Handicapped (HO), Cancer Patient (CK)
- Premium Tatkal (PT)

### 3. Season-Aware Strategy
- Festival periods (Diwali, Chhath, Holi)
- Summer rush and exam seasons
- Dynamic route and quota adjustments

### 4. Booking Optimization
- Historical waitlist movement analysis
- Coach composition trends
- Train-specific cancellation patterns
- Legal booking beyond destination strategies

## Important Notes

⚠️ **Disclaimer**: This AI assistant provides strategic advice based on patterns and historical data. Always verify availability on the official [IRCTC website](https://www.irctc.co.in) before booking.

🔒 **Legal Compliance**: All recommendations strictly follow IRCTC rules and regulations. No bypass or violation strategies are suggested.

📊 **Data Sources**: The AI is trained on public knowledge about Indian Railways. For real-time availability, use official IRCTC APIs or website.

## Project Structure

```
irctct-ticket-helper/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # AI analysis API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main booking form page
├── lib/
│   └── systemPrompt.ts           # AI system prompt configuration
├── public/                       # Static assets
├── .env.local.example            # Environment variables template
├── .gitignore                    # Git ignore rules
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4
- **API**: Next.js API Routes

## Future Enhancements

- [ ] User profile learning (non-personal)
- [ ] Real-time availability integration with IRCTC APIs
- [ ] Notification engine for availability changes
- [ ] Multi-date optimization
- [ ] Historical booking data analysis
- [ ] Redis caching for station metadata and routes
- [ ] Community intelligence aggregation (Reddit, X)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For questions or support, please open an issue in the repository.

## Acknowledgments

- Built according to specifications from the IRCTC Expert Ticketing Agent system design
- Powered by OpenAI GPT-4 for intelligent analysis
- Designed for the Indian Railways community
