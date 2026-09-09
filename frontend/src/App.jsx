import { useState } from 'react'
import './App.css'

const menuGroups = [
  
  {
    title: 'OVERVIEW',
    items: [{ icon: '▦', label: 'Dashboard' }],
  },
  {
    title: 'MANAGEMENT',
    items: [
      { icon: '⌂', label: 'Properties' },
      { icon: '▤', label: 'Units' },
      { icon: '♙', label: 'Tenants' },
      { icon: '▣', label: 'Leases' },
    ],
  },
  {
    title: 'OPERATIONS',
    items: [
      { icon: '▰', label: 'Payments' },
      { icon: '🔧', label: 'Maintenance' },
    ],
  },
  {
    title: 'COMMUNICATION',
    items: [
      { icon: '▤', label: 'Discussion' },
      { icon: '♧', label: 'Notifications' },
    ],
  },
  {
    title: 'REPORTING',
    items: [{ icon: '▥', label: 'Reports' }],
  },
  {
    title: 'SETTINGS',
    items: [{ icon: '⚙', label: 'Settings' }],
  },
]

function App() {
  const [activeItem, setActiveItem] = useState('Dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [openGroups, setOpenGroups] = useState({
    OVERVIEW: true,
    MANAGEMENT: true,
    OPERATIONS: true,
    COMMUNICATION: true,
    REPORTING: true,
    SETTINGS: true,
  })

  const toggleGroup = (group) => {
    setOpenGroups((current) => ({
      ...current,
      [group]: !current[group],
    }))
  }

  const selectItem = (label) => {
    setActiveItem(label)

    if (window.innerWidth < 768) {
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="dashboard-layout">
      <button
        className="mobile-menu-button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Open menu"
      >
        ☰
      </button>

      {mobileMenuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-icon">⌂</div>

          <div className="brand-text">
            <h2>Property Management</h2>
            <span>Software</span>
          </div>

          <button
            className="mobile-close"
            onClick={() => setMobileMenuOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuGroups.map((group) => (
            <div className="nav-section" key={group.title}>
              <button
                className="nav-section-header"
                onClick={() => toggleGroup(group.title)}
              >
                <span>{group.title}</span>

                <span
                  className={`section-arrow ${
                    openGroups[group.title] ? 'open' : ''
                  }`}
                >
                  ›
                </span>
              </button>

              {openGroups[group.title] && (
              <div className="nav-items">
              {group.items.map((item) => (
             <button
             key={item.label}
             className={`nav-link ${
             activeItem === item.label ? 'active' : ''
             }`}
             onClick={() => selectItem(item.label)}
              >
             <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              </button>
              ))}
              </div>
            )}
            </div>
          ))}
        </nav>

        <div className="profile">
          <div className="avatar">AO</div>

          <div className="profile-text">
            <strong>Abebe Owner</strong>
            <span>Property Owner</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>{activeItem}</h1>
          </div>

          <div className="topbar-actions">
            <div className="notification-wrapper">
              <span className="notification">♧</span>
              <span className="notification-count">3</span>
            </div>

            <div className="user-mini">
              <div className="mini-avatar">AO</div>

              <div>
                <strong>Abebe Owner</strong>
                <span>Owner</span>
              </div>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon purple">⌂</div>

            <div className="stat-info">
              <span>Total Properties</span>
              <strong>5</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">ETB</div>

            <div className="stat-info">
              <span>Rent Collected</span>
              <strong>ETB 780K</strong>
            </div>

            <small className="positive">+5%</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">▣</div>

            <div className="stat-info">
              <span>Occupied Units</span>
              <strong>18 / 24</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon red">▰</div>

            <div className="stat-info">
              <span>Outstanding</span>
              <strong>ETB 60K</strong>
            </div>

            <small className="negative">-1%</small>
          </div>
        </section>

        <section className="content-grid">
          <div className="card">
            <div className="card-header">
              <h3>Action Required — Portfolio Items</h3>
              <button>View All</button>
            </div>

            <div className="action-row">
              <span className="action-icon red">!</span>
              <span>Overdue payments</span>
              <strong>4</strong>
            </div>

            <div className="action-row">
              <span className="action-icon orange">!</span>
              <span>Maintenance requests</span>
              <strong>3</strong>
            </div>

            <div className="action-row">
              <span className="action-icon blue">!</span>
              <span>Lease renewals due</span>
              <strong>2</strong>
            </div>

            <div className="action-row">
              <span className="action-icon purple">!</span>
              <span>Open discussions</span>
              <strong>4</strong>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Quick Access</h3>
            </div>

            <div className="quick-grid">
              <button>
                <span>▰</span>
                Record Payment
              </button>

              <button>
                <span>🔧</span>
                Maintenance
              </button>

              <button>
                <span>▤</span>
                New Discussion
              </button>

              <button>
                <span>⌂</span>
                View Properties
              </button>

              <button>
                <span>▣</span>
                View Leases
              </button>

              <button>
                <span>▥</span>
                Reports
              </button>
            </div>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="card table-card">
            <div className="card-header">
              <h3>Portfolio Overview</h3>
              <button>View All</button>
            </div>

            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Units</th>
                    <th>Occupied</th>
                    <th>Vacant</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Green Valley Apartments</td>
                    <td>12</td>
                    <td>10</td>
                    <td>2</td>
                  </tr>

                  <tr>
                    <td>Sunrise Residence</td>
                    <td>8</td>
                    <td>6</td>
                    <td>2</td>
                  </tr>

                  <tr>
                    <td>City View</td>
                    <td>4</td>
                    <td>2</td>
                    <td>2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Recent Activity</h3>
              <button>View All</button>
            </div>

            <div className="activity">
              <div>
                <span className="dot green-dot" />

                <p>
                  <strong>Rent payment received</strong>
                  <span>Green Valley Apartments</span>
                </p>
              </div>

              <div>
                <span className="dot orange-dot" />

                <p>
                  <strong>Maintenance request opened</strong>
                  <span>Unit A-204</span>
                </p>
              </div>

              <div>
                <span className="dot purple-dot" />

                <p>
                  <strong>Lease updated</strong>
                  <span>Sunrise Residence</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App