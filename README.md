# Team Calendar & Scheduling Application

A modern, responsive team calendar and scheduling application built with Next.js, TypeScript, and Tailwind CSS. This application provides a comprehensive solution for managing team schedules, appointments, and job assignments with an intuitive drag-and-drop interface.

## 🚀 Features

### 📅 Calendar Management

- **Interactive Team Calendar**: Visual calendar grid showing team member schedules
- **Drag & Drop Functionality**: Easily move appointments between time slots and team members
- **Time Slot Management**: Hourly scheduling from 6 AM to 6 PM with 30-minute subdivisions
- **Real-time Conflict Detection**: Prevents double-booking and scheduling conflicts
- **Multiple Status Support**: Track appointments as Pending, Active, or Completed
- **Appointment CRUD Operations**: Create, read, update, and delete appointments with full validation

### 🛡️ Production-Ready Features

- **Form Validation & Conflict Prevention**: Comprehensive validation for all appointment inputs
- **Confirmation Dialogs**: Safe destructive actions with user confirmation
- **Error Boundaries**: Graceful error handling and crash prevention
- **Loading & Empty States**: Professional feedback for all application states
- **Data Validation**: Robust localStorage validation with corruption recovery

### 📱 Mobile-First Design

- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Mobile Navigation**: Hamburger menu with blur overlay for mobile header options
- **Collapsible Job Cards**: Mobile-friendly bottom sheet for job management
- **Touch-Friendly**: Optimized button sizes and spacing for mobile interaction
- **Adaptive Layouts**: Different layouts for different screen sizes

### 🎯 Advanced Filtering System

- **Status Filter**: Filter appointments by status (All, Pending, Active, Completed)
- **Team Member Filter**: View schedules for specific team members or all members
- **Assignment Filter**: Separate views for assigned and unassigned jobs
- **Time Controls**: Switch between different view modes and time intervals
- **Real-time Filtering**: Instant updates when changing filter criteria

### 👥 Team Management

- **Dynamic Team Members**: Support for 11 team members with color-coded identification
- **Team Assignment**: Assign jobs and appointments to specific team members
- **Visual Team Indicators**: Color-coded system for easy team member identification
- **Member-based Filtering**: Focus on individual team member schedules

### 📋 Job Management

- **Job Cards Interface**: Dedicated sidebar for managing unassigned and assigned jobs
- **Quick Assignment**: One-click job assignment to team members with appointment creation
- **Job Details**: Complete job information including client details, addresses, and job IDs
- **Smart Assignment Logic**: Future-ready "Assign All" functionality (placeholder implemented)
- **Assignment Status Tracking**: Visual indicators for job assignment status

### 🎨 Modern UI/UX

- **Glass-morphism Design**: Modern blur effects and transparent overlays
- **Consistent Theming**: Professional color scheme with consistent styling
- **Intuitive Navigation**: Easy-to-use interface with clear visual hierarchy
- **Accessibility**: ARIA labels and keyboard navigation support
- **Smooth Animations**: Polished transitions and interactive feedback

## 🛠️ Technology Stack

### Frontend

- **Next.js 15**: React framework with App Router and Turbopack
- **TypeScript**: Type-safe development with enhanced IDE support
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Context API**: Centralized state management for application data

### UI Components & Libraries

- **@dnd-kit/core**: Modern drag-and-drop functionality with accessibility
- **React Hooks**: Custom hooks for calendar logic and appointment management
- **SVG Icons**: Lightweight, scalable icons for UI elements

### Development Tools

- **ESLint**: Code linting and quality enforcement
- **PostCSS**: CSS processing and optimization
- **TypeScript Config**: Strict type checking configuration

## 📁 Project Structure

```
team_view/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main application page with navigation
├── components/                   # Reusable React components
│   ├── AppointmentModal.tsx     # Create/Edit appointment modal with validation
│   ├── CalendarGrid.tsx         # Main calendar grid with drag & drop
│   ├── ConfirmDialog.tsx        # Confirmation dialog for destructive actions
│   ├── EmptyState.tsx           # Empty state component
│   ├── ErrorBoundary.tsx        # Error boundary for crash prevention
│   ├── JobCards.tsx             # Job management sidebar with responsive design
│   └── LoadingState.tsx         # Loading state component
├── contexts/                     # React Context providers
│   └── AppContext.tsx           # Main application state with data validation
├── public/                       # Static assets
│   ├── star.svg                 # Star icon for UI
│   ├── team-view.svg            # Application logo
│   └── *.png                    # Various image assets
├── utils/                        # Utility functions
│   └── appointmentUtils.ts      # Calendar logic and conflict detection
├── package.json                  # Dependencies and scripts
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This documentation
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd team_view
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

## 📱 Usage Guide

### Creating Appointments

1. **Double-click on any time slot** in the calendar grid to create a new appointment
2. **Fill in appointment details** including client name, team member, duration, and status
3. **Validation checks** ensure no conflicts and valid input data
4. **Save the appointment** - it will appear on the calendar with appropriate color coding

### Managing Jobs

1. **View job cards** in the right sidebar or mobile bottom sheet
2. **Toggle between tabs**: Switch between "Assigned" and "Unassigned" views
3. **Assign individual jobs** by clicking the "Assign" button on any job card
4. **Assign All button** appears only in the "Unassigned" section (future feature)

### Filtering and Navigation

1. **Use status filter** to view appointments by completion status
2. **Filter by team member** to focus on specific team schedules
3. **Navigate dates** using the month arrows or "Today" navigation buttons
4. **Adjust time views** with the Day/Hour controls for different perspectives
5. **Mobile navigation** via hamburger menu on smaller screens

### Drag & Drop Operations

1. **Click and drag appointments** to move them between time slots
2. **Drop on different team members** to reassign appointments
3. **Conflict detection** will prevent invalid moves and show warnings
4. **Visual feedback** during drag operations with hover states

### Mobile Experience

1. **Hamburger menu** provides access to view options on mobile
2. **Collapsible job cards** at bottom of screen for easy access
3. **Responsive filters** stack vertically on smaller screens
4. **Touch-optimized** interface with proper button sizing

## ⚙️ Configuration

### Data Persistence

The application uses browser localStorage for data persistence with:

- **Automatic data validation** on load
- **Corruption recovery** with graceful fallbacks
- **Type-safe data structures** with TypeScript validation

### Customization Options

#### Team Members

Edit the team members array in `contexts/AppContext.tsx`:

```typescript
const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
  { id: 1, name: "Alex Johnson", color: "#F5A623" },
  { id: 2, name: "Sarah Wilson", color: "#9AE095" },
  // Add more team members...
]);
```

#### Time Slots

Modify the time slots in `components/CalendarGrid.tsx`:

```typescript
const timeSlots = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
];
```

#### Validation Rules

Customize validation in `components/AppointmentModal.tsx`:

```typescript
// Example: Extend business hours
if (endHour > 12) {
  // 12 = 6pm (last slot index)
  alert("Appointment extends beyond working hours (6:00 PM)...");
  return;
}
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured for React and TypeScript
- **Error Boundaries**: Comprehensive error handling
- **Data Validation**: Runtime validation for all data

### Performance Optimizations

- **Next.js 15**: Latest performance improvements
- **Turbopack**: Fast development builds
- **Component optimization**: Memoization where appropriate
- **Efficient state management**: Context API with selective updates

## 🐛 Troubleshooting

### Common Issues

1. **Data not persisting**: Check browser localStorage permissions
2. **Drag & drop not working**: Ensure @dnd-kit dependencies are installed
3. **Mobile layout issues**: Clear browser cache and check viewport settings

### Error Recovery

- **Corrupted data**: Application automatically recovers with default data
- **Component crashes**: Error boundaries prevent app-wide failures
- **Validation errors**: Clear feedback guides users to valid inputs
