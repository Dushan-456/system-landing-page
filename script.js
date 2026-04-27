// ====================================================
//  PROJECT DATA — Edit this array to add/remove systems
//  status: "Developed" or "Coming Soon"
// ====================================================
const projects = [
  {
    title: "Meeting Room Booking System",
    desc: "A comprehensive room reservation platform for managing conference rooms, time slots, and bookings with an intuitive calendar view.",
    icon: "📅",
    tags: ["web", "fullstack"],
    link: "http://192.168.112.199/Meeting-Room-Booking-System/web/index.php", // ← Replace with your live URL
    status: "Developed",
    accentFrom: "#4f8cff",
    accentTo: "#6366f1",
  },

  {
    title: "MSF Automation",
    desc: "SurveyMonkey automation platform with real-time API integration, survey analysis, folder management, and data export capabilities.",
    icon: "⚡",
    tags: ["web", "automation"],
    link: "http://192.168.112.199:3000",
    status: "Developed",
    accentFrom: "#2dd4bf",
    accentTo: "#22d3ee",
  },
  {
    title: "OT Calculator",
    desc: "Overtime calculation tool for accurately computing work hours, overtime rates, and generating payroll-ready summaries.",
    icon: "🧮",
    tags: ["web"],
    link: "#",
    status: "Coming Soon",
    accentFrom: "#34d399",
    accentTo: "#10b981",
  },
  {
    title: "Vehicle Parking Management System",
    desc: "Smart parking management solution for tracking vehicles, managing parking slots, generating reports, and streamlining operations.",
    icon: "🚗",
    tags: ["web", "fullstack"],
    link: "#",
    status: "Coming Soon",
    accentFrom: "#f472b6",
    accentTo: "#fb7185",
  },

  {
    title: "Library E-Repository",
    desc: "Digital document repository for libraries to manage, search, and distribute electronic resources and publications.",
    icon: "📂",
    tags: ["web"],
    link: "#",
    status: "Coming Soon",
    accentFrom: "#0ea5e9",
    accentTo: "#0284c7",
  },
  {
    title: "Office Internal Management System",
    desc: "All-in-one internal management suite for handling office operations, user management, analytics dashboards, and administrative workflows.",
    icon: "🏢",
    tags: ["web", "fullstack"],
    link: "#",
    status: "Coming Soon",
    accentFrom: "#a855f7",
    accentTo: "#ec4899",
  },
];

// ====================================================
//  Render & Interactions
// ====================================================
const grid = document.getElementById('cardsGrid');
const searchInput = document.getElementById('searchInput');
const filterPills = document.querySelectorAll('.filter-pill');
let activeFilter = 'all';

function renderCards(filter = 'all', search = '') {
    const filtered = projects.filter(p => {
        const matchFilter = filter === 'all' || p.tags.includes(filter);
        const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <p>No systems found matching your criteria.</p>
            </div>`;
        return;
    }

    grid.innerHTML = filtered.map((p, i) => {
        const isComingSoon = p.status === "Coming Soon";
        const href = isComingSoon
            ? `coming-soon.html?project=${encodeURIComponent(p.title)}`
            : p.link;
        const cardClass = isComingSoon ? 'card card--coming-soon' : 'card';
        const statusBadgeClass = isComingSoon ? 'status-badge status-badge--soon' : 'status-badge status-badge--live';
        const statusLabel = isComingSoon ? 'Coming Soon' : 'Live';

        return `
        <a target="_blank" href="${href}" class="${cardClass}" style="animation-delay: ${i * 0.08}s; --card-accent: linear-gradient(90deg, ${p.accentFrom}, ${p.accentTo});" ${isComingSoon ? '' : 'target="_blank" rel="noopener"'}>
            <div class="${statusBadgeClass}">${statusLabel}</div>
            <div class="card-icon" style="--icon-bg: ${p.accentFrom}18; --icon-color: ${p.accentFrom};">
                ${p.icon}
            </div>
            <div class="card-title">${p.title}</div>
            <div class="card-desc">${p.desc}</div>
            <div class="card-footer">
                <div class="card-tags">
                    ${p.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}
                </div>
                <div class="card-arrow">→</div>
            </div>
        </a>`;
    }).join('');
}

// Filter pills
filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeFilter = pill.dataset.filter;
        renderCards(activeFilter, searchInput.value);
    });
});

// Search
searchInput.addEventListener('input', () => {
    renderCards(activeFilter, searchInput.value);
});

// Initial render
renderCards();
