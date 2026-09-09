import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { ROLES } from '../auth/roles'
import '../App.css'

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

function OwnerDashboard({ user, logout }) {
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

  const ownerName = user?.name || 'Property Owner'

  const initials = ownerName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

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
          <div className="avatar">{initials}</div>

          <div className="profile-text">
            <strong>{ownerName}</strong>
            <span>Property Owner</span>
          </div>
        </div>

        <button className="logout-button" onClick={logout}>
          Logout
        </button>
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
              <div className="mini-avatar">{initials}</div>

              <div>
                <strong>{ownerName}</strong>
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
//manager dashboard

function ManagerDashboard({ user, logout }) {
  const [activeItem, setActiveItem] = useState('Dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const managerMenuGroups = [
    {
      title: 'OVERVIEW',
      items: [{ icon: '◦', label: 'Dashboard' }],
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

  const managerName = user?.name || 'Property Manager'

  const initials = managerName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

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
          {managerMenuGroups.map((group) => (
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
          <div className="avatar">{initials}</div>

          <div className="profile-text">
            <strong>{managerName}</strong>
            <span>Property Manager</span>
          </div>
        </div>

        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>{activeItem}</h1>
            {activeItem === 'Dashboard' && (
              <p>Overview of properties assigned to you</p>
            )}
          </div>

          <div className="topbar-actions">
            <div className="notification-wrapper">
              <span className="notification">♧</span>
              <span className="notification-count">4</span>
            </div>

            <div className="user-mini">
              <div className="mini-avatar">{initials}</div>

              <div>
                <strong>{managerName}</strong>
                <span>Manager</span>
              </div>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon purple">⌂</div>

            <div className="stat-info">
              <span>Assigned Properties</span>
              <strong>3</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">▣</div>

            <div className="stat-info">
              <span>Units Managed</span>
              <strong>64</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">ETB</div>

            <div className="stat-info">
              <span>Collected (Aug)</span>
              <strong>ETB 780K</strong>
            </div>

            <small className="positive">+5%</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon red">!</div>

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
              <h3>Priority Actions</h3>
              <button>View All</button>
            </div>

            <div className="action-row">
              <span className="action-icon red">!</span>
              <span>Overdue tenant payments</span>
              <strong>4</strong>
            </div>

            <div className="action-row">
              <span className="action-icon orange">!</span>
              <span>Open maintenance requests</span>
              <strong>6</strong>
            </div>

            <div className="action-row">
              <span className="action-icon blue">!</span>
              <span>Lease renewals due</span>
              <strong>3</strong>
            </div>

            <div className="action-row">
              <span className="action-icon purple">!</span>
              <span>Open discussion cases</span>
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
                Properties
              </button>

              <button>
                <span>♙</span>
                Tenants
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
              <h3>Recent Tenant Activity</h3>
              <button>View All</button>
            </div>

            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Tenant</th>
                    <th>Property</th>
                    <th>Unit</th>
                    <th>Activity</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Abel Tesfaye</td>
                    <td>Green Valley</td>
                    <td>A-204</td>
                    <td>Payment Received</td>
                  </tr>

                  <tr>
                    <td>Hana Bekele</td>
                    <td>Sunrise Residence</td>
                    <td>B-103</td>
                    <td>Maintenance Request</td>
                  </tr>

                  <tr>
                    <td>Samuel Getachew</td>
                    <td>City View</td>
                    <td>C-301</td>
                    <td>Lease Updated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Maintenance by Priority</h3>
              <button>View All</button>
            </div>

            <div className="activity">
              <div>
                <span className="dot red-dot" />

                <p>
                  <strong>High Priority</strong>
                  <span>2 requests</span>
                </p>
              </div>

              <div>
                <span className="dot orange-dot" />

                <p>
                  <strong>Medium Priority</strong>
                  <span>3 requests</span>
                </p>
              </div>

              <div>
                <span className="dot green-dot" />

                <p>
                  <strong>Low Priority</strong>
                  <span>1 request</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}// manager dashboard

////tenant dashboard
function TenantDashboard({ user, logout }) {
  const [activeItem, setActiveItem] = useState('Dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const tenantMenuGroups = [
    {
      title: 'OVERVIEW',
      items: [{ icon: '⌂', label: 'Dashboard' }],
    },
    {
      title: 'RENTAL',
      items: [
        { icon: '▣', label: 'My Lease' },
        { icon: 'ETB', label: 'My Payments' },
      ],
    },
    {
      title: 'SUPPORT',
      items: [
        { icon: '🔧', label: 'Maintenance' },
        { icon: '▤', label: 'Discussion' },
      ],
    },
    {
      title: 'ACCOUNT',
      items: [
        { icon: '♧', label: 'Notifications' },
        { icon: '♙', label: 'Profile' },
      ],
    },
  ]

  const [openGroups, setOpenGroups] = useState({
    OVERVIEW: true,
    RENTAL: true,
    SUPPORT: true,
    ACCOUNT: true,
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

  const tenantName = user?.name || 'Tenant'

  const initials = tenantName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

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
          {tenantMenuGroups.map((group) => (
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
          <div className="avatar">{initials}</div>

          <div className="profile-text">
            <strong>{tenantName}</strong>
            <span>Tenant</span>
          </div>
        </div>

        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>{activeItem}</h1>

            {activeItem === 'Dashboard' && (
              <p>Unit A-204 — Green Valley Apartments</p>
            )}
          </div>

          <div className="topbar-actions">
            <div className="notification-wrapper">
              <span className="notification">♧</span>
              <span className="notification-count">2</span>
            </div>

            <div className="user-mini">
              <div className="mini-avatar">{initials}</div>

              <div>
                <strong>{tenantName}</strong>
                <span>Tenant</span>
              </div>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon green">✓</div>

            <div className="stat-info">
              <span>Lease Status</span>
              <strong>Active</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">ETB</div>

            <div className="stat-info">
              <span>Monthly Rent</span>
              <strong>ETB 8,500</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">▣</div>

            <div className="stat-info">
              <span>Next Due Date</span>
              <strong>Sep 5</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon red">!</div>

            <div className="stat-info">
              <span>Amount Due</span>
              <strong>ETB 15,000</strong>
            </div>
          </div>
        </section>

        <section className="tenant-main-grid">
          <div className="card tenant-lease-card">
            <div className="card-header">
              <h3>My Lease</h3>
              <button onClick={() => selectItem('My Lease')}>
                View Lease
              </button>
            </div>

            <div className="lease-property">
              <div className="lease-property-icon">⌂</div>

              <div>
                <strong>Green Valley Apartments</strong>
                <span>Unit A-204</span>
              </div>
            </div>

            <div className="lease-details">
              <div>
                <span>Lease Start</span>
                <strong>Jan 1, 2026</strong>
              </div>

              <div>
                <span>Lease End</span>
                <strong>Dec 31, 2026</strong>
              </div>

              <div>
                <span>Monthly Rent</span>
                <strong>ETB 8,500</strong>
              </div>

              <div>
                <span>Status</span>
                <strong className="tenant-active-status">Active</strong>
              </div>
            </div>
          </div>

          <div className="card tenant-payment-card">
            <div className="payment-label">Amount Due</div>

            <strong className="payment-amount">ETB 15,000</strong>

            <span className="payment-date">Due Sep 5, 2026</span>

            <button className="chapa-button">
              Pay with Chapa
            </button>

            <button
              className="payment-history-button"
              onClick={() => selectItem('My Payments')}
            >
              View Payment History
            </button>
          </div>
        </section>

        <section className="content-grid">
          <div className="card">
            <div className="card-header">
              <h3>Quick Access</h3>
            </div>

            <div className="tenant-quick-grid">
              <button onClick={() => selectItem('Maintenance')}>
                <span className="tenant-quick-icon">🔧</span>

                <div>
                  <strong>Submit Request</strong>
                  <small>Report a maintenance issue</small>
                </div>
              </button>

              <button onClick={() => selectItem('Discussion')}>
                <span className="tenant-quick-icon">▤</span>

                <div>
                  <strong>Start Discussion</strong>
                  <small>Contact property management</small>
                </div>
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Property Information</h3>
            </div>

            <div className="tenant-property-info">
              <div>
                <span>Property</span>
                <strong>Green Valley Apartments</strong>
              </div>

              <div>
                <span>Unit</span>
                <strong>A-204</strong>
              </div>

              <div>
                <span>Manager</span>
                <strong>Test Manager</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="card tenant-activity-card">
          <div className="card-header">
            <h3>Recent Activity</h3>
            <button>View All</button>
          </div>

          <div className="activity">
            <div>
              <span className="dot green-dot" />

              <p>
                <strong>Rent payment received</strong>
                <span>ETB 8,500 — Aug 5, 2026</span>
              </p>
            </div>

            <div>
              <span className="dot orange-dot" />

              <p>
                <strong>Maintenance request submitted</strong>
                <span>Kitchen sink repair</span>
              </p>
            </div>

            <div>
              <span className="dot purple-dot" />

              <p>
                <strong>Discussion case updated</strong>
                <span>Property manager replied</span>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}//tenant dashboard

function SimpleDashboard({ user, logout }) {
  const getMessage = () => {
    switch (user?.role) {
      case ROLES.ADMINISTRATOR:
        return 'Welcome to the Administrator Dashboard.'

      case ROLES.PROPERTY_MANAGER:
        return 'Welcome to the Property Manager Dashboard.'

      case ROLES.TENANT:
        return 'Welcome to the Tenant Dashboard.'

      default:
        return 'Welcome to your Dashboard.'
    }
  }

  return (
    <main style={{ padding: '30px' }}>
      <h1>Dashboard</h1>

      <p>Welcome, {user?.name}</p>

      <p>Role: {user?.role}</p>

      <p>{getMessage()}</p>

      <button onClick={logout}>Logout</button>
    </main>
  )
}

export default function Dashboard() {
  const { user, logout } = useAuth()

  if (user?.role === ROLES.PROPERTY_OWNER) {
    return <OwnerDashboard user={user} logout={logout} />
  }

  if (user?.role === ROLES.PROPERTY_MANAGER) {
    return <ManagerDashboard user={user} logout={logout} />
  }

  if (user?.role === ROLES.TENANT) {
    return <TenantDashboard user={user} logout={logout} />
  }


  return <SimpleDashboard user={user} logout={logout} />
}