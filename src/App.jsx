import { useState, useEffect } from 'react'
import { 
  Menu, 
  X, 
  ChevronRight, 
  BookOpen, 
  Zap, 
  Smartphone, 
  Settings, 
  ShieldCheck, 
  HelpCircle,
  Camera,
  Layers,
  Search,
  ArrowRight
} from 'lucide-react'
import './App.css'

const SECTIONS = [
  { id: 'intro', title: 'Introduction', icon: BookOpen },
  { id: 'setup', title: 'Quick Setup', icon: Zap },
  { id: 'features', title: 'Core Features', icon: Layers },
  { id: 'app', title: 'App Integration', icon: Smartphone },
  { id: 'maintenance', title: 'Maintenance', icon: Settings },
  { id: 'safety', title: 'Safety Guide', icon: ShieldCheck },
  { id: 'faq', title: 'Support & FAQ', icon: HelpCircle },
]

function App() {
  const [activeTab, setActiveTab] = useState('intro')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const handleNavClick = (id) => {
    setActiveTab(id)
    setIsMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass-card mx-4 my-2 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex w-10 h-10 accent-gradient rounded-xl items-center justify-center text-white shadow-lg">
            <Camera size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-primary">
            Cuti<span className="text-secondary">Scope</span>
            <span className="ml-2 py-0.5 px-2 bg-slate-100 text-[10px] rounded-full text-slate-500 uppercase font-bold tracking-widest border border-slate-200">Manual v1.0</span>
          </h1>
        </div>

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-4 py-2 w-64 border border-slate-200">
          <Search size={16} className="text-slate-400" />
          <input type="text" placeholder="Search manual..." className="bg-transparent border-none focus:outline-none ml-2 text-sm w-full" />
        </div>

        {/* Mobile Toggle */}
        <button onClick={toggleMobileMenu} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div className="flex flex-1 relative px-4 pb-8 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className={`
          fixed inset-0 z-40 lg:relative lg:z-0 lg:flex lg:w-72 lg:flex-col
          transition-transform duration-300 transform
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="h-full glass-card lg:border-none lg:shadow-none bg-white p-6 lg:p-4 overflow-y-auto">
            <div className="mb-8 lg:hidden flex justify-between items-center">
              <span className="font-bold text-lg text-primary">Menu</span>
              <button onClick={toggleMobileMenu} className="p-2 bg-slate-100 rounded-full"><X size={20} /></button>
            </div>
            
            <div className="space-y-2">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest px-4 mb-4">Contents</p>
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${activeTab === section.id 
                      ? 'bg-primary text-white shadow-lg scale-[1.02]' 
                      : 'text-slate-600 hover:bg-slate-50'}
                  `}
                >
                  <section.icon size={20} className={activeTab === section.id ? 'text-secondary' : 'text-slate-400'} />
                  <span className="font-medium text-sm text-left">{section.title}</span>
                  {activeTab === section.id && <ChevronRight size={16} className="ml-auto opacity-50" />}
                </button>
              ))}
            </div>

            {/* Support Widget */}
            <div className="mt-12 p-5 rounded-2xl bg-slate-900 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-secondary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              <p className="text-xs text-slate-400 mb-1">Need help?</p>
              <h4 className="font-bold text-sm mb-3">Live Support</h4>
              <button className="w-full py-2 bg-white text-primary rounded-lg text-xs font-bold hover:bg-secondary transition-colors">Contact Expert</button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-8 pt-4 lg:pt-0 overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-8 pb-20">
            {activeTab === 'intro' && (
              <section className="animate-in space-y-6">
                <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-2xl group">
                  <div className="absolute inset-0 premium-gradient opacity-90"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <span className="inline-block py-1 px-3 bg-secondary/30 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm mb-3 border border-secondary/20 w-fit">Welcome</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">Master Your CutiScope</h2>
                    <p className="text-slate-300 max-w-lg text-sm sm:text-base">Experience the next generation of precision dermatological imaging with advanced polarization technology.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                       <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">01</span>
                       Getting Started
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">Learn how to unpack, charge, and calibrate your CutiScope for the first time to ensure perfect accuracy.</p>
                    <button onClick={() => handleNavClick('setup')} className="text-primary font-bold text-sm flex items-center gap-2 group underline-offset-4 hover:underline">
                      View Setup Guide <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                       <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm">02</span>
                       Polarization 101
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">Switch between Cross and Parallel polarization modes to see structural details invisible to the naked eye.</p>
                    <button onClick={() => handleNavClick('features')} className="text-primary font-bold text-sm flex items-center gap-2 group underline-offset-4 hover:underline">
                      Explore Optics <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'setup' && (
              <section className="animate-in space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-100">
                  <h2 className="text-2xl font-bold mb-8">Unboxing & Hardware Setup</h2>
                  <div className="space-y-8">
                    {[
                      { step: 'Charge Device', desc: 'Connect the USB-C cable to the base of the device. A solid green light indicates a full charge (approx 2 hours).' },
                      { step: 'Attach Lens', desc: 'Gently rotate the precision optical lens clockwise until you hear a soft click. Ensure the golden contacts are aligned.' },
                      { step: 'Power On', desc: 'Press and hold the primary button (circular) for 3 seconds. The ring light will flash twice once ready.' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-6">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full accent-gradient text-white flex items-center justify-center font-bold text-lg shadow-md">
                          {idx + 1}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-lg text-primary">{item.step}</h4>
                          <p className="text-slate-500 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 flex items-start gap-4">
                  <div className="p-2 bg-amber-200 rounded-lg text-amber-700">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 text-sm">Pro Tip</h4>
                    <p className="text-amber-800 text-xs mt-1">For the best results, ensure the lens surface is cleaned with the provided microfiber cloth before every session.</p>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'features' && (
              <section className="animate-in space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 p-8 rounded-3xl premium-gradient text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <h3 className="text-2xl font-bold mb-4">The Dual-Light System</h3>
                    <p className="text-slate-300 max-w-xl mb-6 leading-relaxed">CutiScope features an proprietary dual-source polarization unit allowing for sub-epidermal visualization without immersion gels.</p>
                    <div className="flex flex-wrap gap-4">
                      <span className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-xs font-bold backdrop-blur-sm">Non-Polarized Mode</span>
                      <span className="px-4 py-2 bg-secondary/20 rounded-full border border-secondary/30 text-xs font-bold backdrop-blur-sm">Polarized Mode</span>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-white border border-slate-100">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-primary">
                       <Layers size={24} />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Smart Zoom</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Variable 30x to 100x optical magnification with auto-focus stabilization.</p>
                  </div>

                  <div className="p-6 rounded-3xl bg-white border border-slate-100">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-primary">
                       <Search size={24} />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Structure Analysis</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Automated texture mapping highlights irregularities in skin patterns instantly.</p>
                  </div>
                </div>
              </section>
            )}

            {/* Placeholder for other tabs */}
            {(['app', 'maintenance', 'safety', 'faq'].includes(activeTab)) && (
              <section className="animate-in flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300">
                  <Settings size={40} />
                </div>
                <h2 className="text-2xl font-bold text-primary">Component Updating...</h2>
                <p className="text-slate-500 max-w-sm">This section of the CutiScope manual is currently being finalized with the latest 2026 firmware updates.</p>
                <button onClick={() => setActiveTab('intro')} className="px-6 py-2 bg-primary text-white rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-transform">Back to Home</button>
              </section>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-12 px-6 border-t border-slate-100 text-center">
        <div className="flex justify-center gap-6 mb-8">
          {['Privacy', 'Terms', 'Warranty', 'Contact'].map(item => (
            <a key={item} href="#" className="font-bold text-[10px] uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">{item}</a>
          ))}
        </div>
        <p className="text-xs text-slate-400">© 2026 CutiScope Technologies. All rights reserved.</p>
        <p className="text-[10px] text-slate-300 mt-2">Designed for dermatologists, engineered for accuracy.</p>
      </footer>
    </div>
  )
}

export default App
