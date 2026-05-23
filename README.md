
# Leafly Live 🌱

A modern lawn care service marketplace connecting customers with professional service providers. Built with React, TypeScript, and Capacitor for native iOS and Android apps.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Bundler**: Vite 5
- **Styling**: Tailwind CSS v3 + shadcn/ui
- **Routing**: React Router v6
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **Mobile**: Capacitor (iOS & Android)
- **Geolocation**: Capacitor Geolocation
- **Forms**: React Hook Form + Zod

## Features

- 🔐 User authentication with Supabase Auth
- 📍 Location-based service provider discovery
- ⭐ Provider ratings and reviews
- 📅 Service booking system
- 💬 In-app messaging
- 📱 Native iOS and Android apps
- 🎨 Beautiful mobile-first UI

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Xcode (for iOS development)
- Android Studio (for Android development)
- Supabase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/Nealdei96/Leafly.live.git
cd Leafly.live
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Update `.env.local` with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Mobile

#### iOS
```bash
npm run capacitor:build:ios
```

This will:
1. Build the web app
2. Add iOS platform to Capacitor
3. Sync all web assets to Xcode project
4. Open Xcode for further configuration

#### Android
```bash
npm run capacitor:build:android
```

This will:
1. Build the web app
2. Add Android platform to Capacitor
3. Sync all web assets to Android Studio
4. Open Android Studio for further configuration

### Project Structure

```
Leafly.live/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── ui/             # shadcn/ui components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── types/              # TypeScript definitions
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── capacitor.config.ts     # Capacitor configuration
└── package.json            # Dependencies
```

## Supabase Setup

### Database Tables

Create the following tables in your Supabase project:

#### service_providers
```sql
CREATE TABLE service_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  business_name VARCHAR NOT NULL,
  description TEXT,
  avatar_url VARCHAR,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  service_area_radius INTEGER,
  hourly_rate DECIMAL(10,2),
  availability JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### services
```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES service_providers NOT NULL,
  name VARCHAR NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  duration_minutes INTEGER,
  category VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### bookings
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES auth.users NOT NULL,
  provider_id UUID REFERENCES service_providers NOT NULL,
  service_id UUID REFERENCES services NOT NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  status VARCHAR DEFAULT 'pending',
  total_price DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### reviews
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings NOT NULL,
  provider_id UUID REFERENCES service_providers NOT NULL,
  customer_id UUID REFERENCES auth.users NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Routes

### Authentication
- `POST /auth/signup` - Create new account
- `POST /auth/login` - Sign in
- `POST /auth/logout` - Sign out

### Service Providers
- `GET /providers` - Get nearby providers
- `GET /providers/:id` - Get provider details
- `POST /providers` - Create provider profile
- `PUT /providers/:id` - Update provider profile

### Bookings
- `GET /bookings` - Get user bookings
- `POST /bookings` - Create booking
- `PUT /bookings/:id` - Update booking status
- `DELETE /bookings/:id` - Cancel booking

### Reviews
- `GET /reviews/:provider_id` - Get provider reviews
- `POST /reviews` - Create review

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and feature requests, please visit the [GitHub Issues](https://github.com/Nealdei96/Leafly.live/issues) page.

## Roadmap

- [ ] Real-time chat messaging
- [ ] Payment integration (Stripe)
- [ ] Push notifications
- [ ] Service provider dashboard
- [ ] Advanced search filters
- [ ] Provider analytics
- [ ] Multi-language support
- [ ] Dark mode support
