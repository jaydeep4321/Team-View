# Team Calendar & Scheduling Application

A modern, responsive team calendar and scheduling application built with Next.js, TypeScript, and Tailwind CSS. This application provides a comprehensive solution for managing team schedules, appointments, and job assignments with an intuitive drag-and-drop interface.

## 🚀 Features

### 📅 Calendar Management

- **Interactive Team Calendar**: Visual calendar grid showing team member schedules
- **Drag & Drop Functionality**: Easily move appointments between time slots and team members
- **Time Slot Management**: Hourly scheduling from 6 AM to 6 PM with 30-minute subdivisions
- **Real-time Conflict Detection**: Prevents double-booking and scheduling conflicts
- **Multiple Status Support**: Track appointments as Pending, Active, or Completed

### 🎯 Advanced Filtering System

- **Status Filter**: Filter appointments by status (All, Pending, Active, Completed)
- **Team Member Filter**: View schedules for specific team members or all members
- **Assignment Filter**: Separate views for assigned and unassigned jobs
- **Time Controls**: Switch between different view modes and time intervals

### 👥 Team Management

- **Dynamic Team Members**: Support for multiple team members with color-coded identification
- **Team Assignment**: Assign jobs and appointments to specific team members
- **Visual Team Indicators**: Color-coded system for easy team member identification

### 📋 Job Management

- **Job Cards Interface**: Dedicated sidebar for managing unassigned and assigned jobs
- **Quick Assignment**: One-click job assignment to team members with appointment creation
- **Job Details**: Complete job information including client details, addresses, and job IDs
- **Bulk Assignment**: "Assign All" functionality for efficient job distribution

### 🎨 Modern UI/UX

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Consistent Theming**: Professional color scheme with consistent styling
- **Blur Effects**: Modern glass-morphism design elements
- **Intuitive Navigation**: Easy-to-use interface with clear visual hierarchy

## 🛠️ Technology Stack

### Frontend

- **Next.js 15**: React framework with App Router for optimal performance
- **TypeScript**: Type-safe development with enhanced IDE support
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Context API**: Centralized state management for application data

### UI Components & Libraries

- **@dnd-kit/core**: Modern drag-and-drop functionality
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
│   └── page.tsx                 # Main application page
├── components/                   # Reusable React components
│   ├── AppointmentModal.tsx     # Create/Edit appointment modal
│   ├── CalendarGrid.tsx         # Main calendar grid component
│   ├── Header.tsx               # Application header (legacy)
│   ├── JobCards.tsx             # Job management sidebar
│   └── TeamSidebar.tsx          # Team member sidebar (legacy)
├── contexts/                     # React Context providers
│   └── AppContext.tsx           # Main application state context
├── hooks/                        # Custom React hooks
│   └── useKeyboardShortcuts.ts  # Keyboard shortcuts (removed)
├── public/                       # Static assets
│   ├── star.svg                 # Star icon for UI
│   ├── team-view.svg            # Application logo
│   └── *.png                    # Various image assets
├── utils/                        # Utility functions
│   └── appointmentUtils.ts      # Calendar and appointment logic
├── package.json                  # Dependencies and scripts
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
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
3. **Save the appointment** - it will appear on the calendar with appropriate color coding

### Managing Jobs

1. **View job cards** in the right sidebar, toggle between "Assigned" and "Unassigned" tabs
2. **Assign individual jobs** by clicking the "Assign" button on any job card
3. **Bulk assign jobs** using the "Assign All" button for efficiency

### Filtering and Navigation

1. **Use status filter** to view appointments by completion status
2. **Filter by team member** to focus on specific team schedules
3. **Navigate dates** using the month arrows or "Today" navigation buttons
4. **Adjust time views** with the Day/Hour controls for different perspectives

### Drag & Drop Operations

1. **Click and drag appointments** to move them between time slots
2. **Drop on different team members** to reassign appointments
3. **Conflict detection** will prevent invalid moves and show warnings

## ⚙️ Configuration

### Environment Variables

The application uses browser localStorage for data persistence. No external database configuration is required for basic functionality.

### Customization Options

#### Team Members

Edit the team members array in `contexts/AppContext.tsx`:

```typescript
const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
  { id: 1, name: 'Alex Johnson', color: '#F5A623' },
  { id: 2, name: 'Sarah Wilson', color: '#9AE095' },
  // Add more team members...
]);
```

#### Time Slots

Modify the time slots in `components/CalendarGrid.tsx`:

```typescript
const timeSlots = [
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
];
```

#### Color Themes

Update colors in `app/globals.css` and component styling to match your brand:

```css
/* Example color customization */
.appointment-completed {
  background: #eef6ff;
}
.appointment-active {
  background: #fbf5ff;
}
.appointment-pending {
  background: #fef7ec;
}
```
