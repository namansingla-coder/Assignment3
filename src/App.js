import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Calendar from './components/CalendarComponent';
import Kanban from './components/KanbanComponent';
import TableComponent from './components/TableComponent';
import BarChartComponent from './components/BarChartComponent';
import PieChartComponent from './components/PieChartComponent';
import LineChartComponent from './components/LineChartComponent';
import AreaChartComponent from './components/AreaChartComponent';
import FinancialChart from './components/FinancialChartComponenet'; 
function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/charts/bar" element={<BarChartComponent />} />
          <Route path="/charts/pie" element={<PieChartComponent />} />
          <Route path="/charts/line" element={<LineChartComponent />} />
          <Route path="/charts/financial" element={<FinancialChart />} />
          <Route path="/charts/area" element={<AreaChartComponent />} />
          <Route path="/tables" element={<TableComponent />} />
        </Route>
      </Routes>
  );
}

export default App;