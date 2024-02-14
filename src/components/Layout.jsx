import { Outlet } from 'react-router-dom'
import Dashboard from './Dashboard.jsx';

export default function Layout() {
    return (
        // flex to make sure sidebar and profile are side by side
        <div style={{ display: 'flex' }}>
        <Dashboard />
          {/* Adjust marginLeft according to your sidebar width */}
          <Outlet />
      </div>
    )
}