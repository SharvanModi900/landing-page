# Proof of Problem Protocol (PoPP) Landing Page

A modern, responsive landing page for the Proof of Problem Protocol - the decentralized protocol for verifiable truth validation and problem-solving.

## 🚀 Features


- **Modern Design**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Responsive**: Optimized for all devices and screen sizes
- **Interactive**: Smooth scrolling navigation and hover effects
- **Accessible**: WCAG compliant with proper semantic HTML
- **Fast**: Optimized performance with Next.js App Router
- **SEO Ready**: Proper metadata and Open Graph tags

## 📋 Sections

1. **Hero Section** - Main introduction with call-to-action buttons
2. **Origin & Motivation** - The story behind PoPP's creation
3. **How PoPP Works** - 5-layer architecture explanation
4. **Using PoPP** - User guides for different roles (Citizens, Validators, DAOs)
5. **Real-World Impact** - Case studies across multiple domains
6. **Philosophy & Vision** - The four pillars and long-term vision
7. **Roadmap** - Development timeline and milestones
8. **Call to Action** - Join the movement section

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SharvanModi900/landing-page.git
cd landing-page
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
popp-landing-page/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main landing page
│   │   ├── layout.tsx        # Root layout with metadata
│   │   └── globals.css       # Global styles
│   └── components/
│       └── Navigation.tsx    # Navigation component
├── public/                   # Static assets
├── package.json              # Dependencies & scripts
└── README.md                 # This file
```

## 🎨 Customization

### Colors
The color scheme is defined in Tailwind CSS classes. Main colors:
- Primary: Blue (`blue-600`, `blue-700`)
- Secondary: Purple (`purple-600`, `purple-700`)
- Accent: Indigo (`indigo-600`, `indigo-700`)

### Content
Update the content in `src/app/page.tsx` to match your specific needs.

### Styling
Modify `src/app/globals.css` for global styles or update Tailwind classes in components.

## 📱 Responsive Design

The landing page is fully responsive with breakpoints:
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

We welcome contributions of all kinds — bug fixes, features, documentation, and design improvements.

Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

### Quick Start

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/<your-username>/popp-landing-page.git
cd popp-landing-page

# 3. Install dependencies
npm install

# 4. Start dev server (port 3021)
npm run dev
```

### Before Submitting a PR

```bash
npm run lint    # Must pass with zero errors
npm run build   # Must build successfully
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for coding standards, commit conventions, and the full PR checklist.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the Proof of Problem Protocol community
- Inspired by the need for decentralized truth validation
- Designed to make complex protocols accessible to everyone

## 🔗 Related Repositories

- **[Protocol Research](https://github.com/SharvanModi900/proof-of-problem-protocol)** — Whitepaper, chapters, architecture blueprints, and protocol documentation

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Proof of Problem Protocol** - Turning complaints into civilization's building blocks.
