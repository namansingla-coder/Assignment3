# Admin Dashboard - React Application

This project is an admin dashboard built with React, featuring various components like charts, calendar, kanban board, and tables.

## Features

- **Dashboard** - Overview of key metrics and data
- **App Components**
  - Calendar - Interactive calendar component
  - Kanban Board - Task management with drag and drop functionality
- **Charts**
  - Line Chart - Visualize trends over time
  - Bar Chart - Compare data across categories
  - Pie Chart - Show proportions of a whole
  - Area Chart - Display quantitative data graphically
  - Financial Chart - Track financial metrics
- **Tables**
  - User data management

## Tech Stack

- React
- React Router for navigation
- Tailwind CSS for styling
- Recharts for data visualization

## Project Structure

```
assignment3/
├── public/              # Static files
├── src/                 # Source files
│   ├── components/      # Reusable components
│   │   ├── AreaChartComponent.js
│   │   ├── BarChartComponent.js
│   │   ├── CalendarComponent.js
│   │   ├── CalendarDarkMode.css
│   │   ├── Charts.js
│   │   ├── FinancialChartComponent.js
│   │   ├── KanbanComponent.js
│   │   ├── Layout.js
│   │   ├── LineChartComponent.js
│   │   ├── Navbar.js
│   │   ├── PieChartComponent.js
│   │   ├── Sidebar.js
│   │   └── TableComponent.js
│   ├── context/         # React context providers
│   │   ├── SidebarContext.js
│   │   └── ThemeContext.js
│   ├── pages/           # Page components
│   │   └── Dashboard.js
│   ├── App.js           # Main application component
│   ├── index.css        # Global styles
│   └── index.js         # Application entry point
└── tailwind.config.js   # Tailwind CSS configuration
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects the app from Create React App

## Screenshots

[Add screenshots of your application here]

## License

[Add license information here]