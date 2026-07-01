import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalTheme } from "./themes/ThemeContext";
import AuthGateway from "./components/Component01_AuthGateway";
import KineticPricingMatrix from "./components/Component02_PricingMatrix";
import WaitlistTeaser from "./components/Component03_WaitlistTeaser";
import BentoProfile from "./components/Component04_BentoProfile";
import StepConfigurator from "./components/Component05_StepConfigurator";
import BentoNotificationCenter from "./components/Component06_BentoNotificationCenter";
import KineticMediaSlider from "./components/Component07_KineticMediaSlider";
import MultiStepCheckout from "./components/Component08_MultiStepCheckout";
import PricingTable from "./components/Component09_PricingTable";
import OnboardingWizard from "./components/Component10_OnboardingWizard";
import MegaMenu from "./components/Component11_MegaMenu";
import AdvancedFilterSidebar from "./components/Component12_AdvancedFilterSidebar";
import ProductVariantConfigurator from "./components/Component13_ProductVariantConfigurator";
import MultiSelectTagInput from "./components/Component14_MultiSelectTagInput";
import InteractiveSkeletonLoader from "./components/Component15_InteractiveSkeletonLoader";
import LayeredMetricCharts from "./components/Component17_LayeredMetricCharts";
import TactileFAQAccordion from "./components/Component18_TactileFAQAccordion";
import KineticDataGrid from "./components/Component16_KineticDataGrid";
import ElasticKanbanBoard from "./components/Component22_ElasticKanbanBoard";
import ReleaseNotesFeed from "./components/Component19_ReleaseNotesFeed";
import OTPVerification from "./components/Component20_OTPVerification";
import NewsletterCTA from "./components/Component21_NewsletterCTA";
import ContentCardGrid from "./components/Component23_ContentCardGrid";
import SupportMessenger from "./components/Component24_SupportMessenger";
import DiscussionBoard from "./components/Component25_DiscussionBoard";
import ProductTour from "./components/Component26_ProductTour";
import HeroCarousel from "./components/Component27_HeroCarousel";
import StickyPurchaseBar from "./components/Component28_StickyPurchaseBar";
import MegaFooter from "./components/Component29_MegaFooter";
import SupportTicketing from "./components/Component30_SupportTicketing";
import EmptyStateRecovery from "./components/Component31_EmptyStateRecovery";
import AccountSettingsHub from "./components/Component32_AccountSettingsHub";
import EventRegistration from "./components/Component33_EventRegistration";

// Raw code imports for previewer
import AuthGatewayCode from "./components/Component01_AuthGateway/AuthGateway.jsx?raw";
import KineticPricingMatrixCode from "./components/Component02_PricingMatrix/PricingMatrix.jsx?raw";
import ProductVariantConfiguratorCode from "./components/Component13_ProductVariantConfigurator/ProductVariantConfigurator.jsx?raw";
import MultiSelectTagInputCode from "./components/Component14_MultiSelectTagInput/MultiSelectTagInput.jsx?raw";
import InteractiveSkeletonLoaderCode from "./components/Component15_InteractiveSkeletonLoader/InteractiveSkeletonLoader.jsx?raw";
import LayeredMetricChartsCode from "./components/Component17_LayeredMetricCharts/LayeredMetricCharts.jsx?raw";
import TactileFAQAccordionCode from "./components/Component18_TactileFAQAccordion/TactileFAQAccordion.jsx?raw";
import WaitlistTeaserCode from "./components/Component03_WaitlistTeaser/WaitlistTeaser.jsx?raw";
import BentoProfileCode from "./components/Component04_BentoProfile/BentoProfile.jsx?raw";
import StepConfiguratorCode from "./components/Component05_StepConfigurator/StepConfigurator.jsx?raw";
import BentoNotificationCenterCode from "./components/Component06_BentoNotificationCenter/BentoNotificationCenter.jsx?raw";
import KineticMediaSliderCode from "./components/Component07_KineticMediaSlider/KineticMediaSlider.jsx?raw";
import MultiStepCheckoutCode from "./components/Component08_MultiStepCheckout/MultiStepCheckout.jsx?raw";
import PricingTableCode from "./components/Component09_PricingTable/PricingTable.jsx?raw";
import OnboardingWizardCode from "./components/Component10_OnboardingWizard/OnboardingWizard.jsx?raw";
import MegaMenuCode from "./components/Component11_MegaMenu/MegaMenu.jsx?raw";
import AdvancedFilterSidebarCode from "./components/Component12_AdvancedFilterSidebar/AdvancedFilterSidebar.jsx?raw";
import KineticDataGridCode from "./components/Component16_KineticDataGrid/KineticDataGrid.jsx?raw";
import ElasticKanbanBoardCode from "./components/Component22_ElasticKanbanBoard/ElasticKanbanBoard.jsx?raw";
import ReleaseNotesFeedCode from "./components/Component19_ReleaseNotesFeed/ReleaseNotesFeed.jsx?raw";
import OTPVerificationCode from "./components/Component20_OTPVerification/OTPVerification.jsx?raw";
import NewsletterCTACode from "./components/Component21_NewsletterCTA/NewsletterCTA.jsx?raw";
import ContentCardGridCode from "./components/Component23_ContentCardGrid/ContentCardGrid.jsx?raw";
import SupportMessengerCode from "./components/Component24_SupportMessenger/SupportMessenger.jsx?raw";
import DiscussionBoardCode from "./components/Component25_DiscussionBoard/DiscussionBoard.jsx?raw";
import ProductTourCode from "./components/Component26_ProductTour/ProductTour.jsx?raw";
import HeroCarouselCode from "./components/Component27_HeroCarousel/HeroCarousel.jsx?raw";
import StickyPurchaseBarCode from "./components/Component28_StickyPurchaseBar/StickyPurchaseBar.jsx?raw";
import MegaFooterCode from "./components/Component29_MegaFooter/MegaFooter.jsx?raw";
import SupportTicketingCode from "./components/Component30_SupportTicketing/SupportTicketing.jsx?raw";
import EmptyStateRecoveryCode from "./components/Component31_EmptyStateRecovery/EmptyStateRecovery.jsx?raw";
import AccountSettingsHubCode from "./components/Component32_AccountSettingsHub/AccountSettingsHub.jsx?raw";
import EventRegistrationCode from "./components/Component33_EventRegistration/EventRegistration.jsx?raw";

/* ═══════════════════════════════════════════════════════════
   LIGHTWEIGHT JSX REGEX SYNTAX HIGHLIGHTER
   Colorizes JS, JSX tags, classes, and strings safely.
═══════════════════════════════════════════════════════════ */
function highlightJSX(src) {
  if (!src) return "";
  
  // Escape HTML tags to prevent rendering glitches
  let html = src
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
    
  const comments = [];
  const strings = [];
  
  // 1. Extract block comments
  html = html.replace(/\/\*[\s\S]*?\*\//g, (m) => {
    comments.push(`<span style="color: rgba(255,255,255,0.3)">${m}</span>`);
    return `__COMMENT_PLACEHOLDER_${comments.length - 1}__`;
  });
  
  // 2. Extract line comments
  html = html.replace(/\/\/.*/g, (m) => {
    comments.push(`<span style="color: rgba(255,255,255,0.3)">${m}</span>`);
    return `__COMMENT_PLACEHOLDER_${comments.length - 1}__`;
  });

  // 3. Extract template literals, double quotes, and single quotes
  html = html.replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`[\s\S]*?`)/g, (m) => {
    strings.push(`<span style="color: #a5d6ff">${m}</span>`);
    return `__STRING_PLACEHOLDER_${strings.length - 1}__`;
  });

  // 4. Keywords
  html = html.replace(/\b(import|export|default|from|const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|this|typeof|instanceof|class|extends|await|async|yield|import|export|default|null|undefined|true|false)\b/g, '<span style="color: #ff7b72">$1</span>');

  // 5. Functions/Methods definition or call
  html = html.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()/g, '<span style="color: #d2a6ff">$1</span>');

  // 6. HTML/JSX custom components (starts with uppercase)
  html = html.replace(/(&lt;\/?[A-Z][a-zA-Z0-9_]*|&lt;[A-Z][a-zA-Z0-9_]*)/g, '<span style="color: #ff7b72; font-weight: bold;">$1</span>');
  
  // 7. HTML/JSX standard elements (lowercase)
  html = html.replace(/(&lt;\/?[a-z][a-zA-Z0-9_]*|&lt;[a-z][a-zA-Z0-9_]*)/g, '<span style="color: #7ee787">$1</span>');

  // 8. JSX props/attributes
  html = html.replace(/([a-zA-Z0-9_-]+)(?=\s*=\s*\{|(?:\s*=\s*(?:__STRING_PLACEHOLDER|\b)))/g, '<span style="color: #ffb86c; font-style: italic;">$1</span>');

  // 9. Re-inject strings
  strings.forEach((str, idx) => {
    html = html.replace(`__STRING_PLACEHOLDER_${idx}__`, str);
  });

  // 10. Re-inject comments
  comments.forEach((com, idx) => {
    html = html.replace(`__COMMENT_PLACEHOLDER_${idx}__`, com);
  });

  return html;
}

/* ═══════════════════════════════════════════════════════════
   COMPONENT REGISTRY
   → Add each new component here as we build them.
   → Access individually: http://localhost:5173/preview/01
   → Access showcase:     http://localhost:5173/
═══════════════════════════════════════════════════════════ */
export const COMPONENTS = [
  {
    id: "01",
    slug: "01",
    name: "Floating Auth Gateway",
    description: "Login & Signup — glassmorphic 2.5D card, subtle parallax tilt, 3D flip",
    tags: ["Auth", "Forms", "Glassmorphism"],
    component: AuthGateway,
    code: AuthGatewayCode,
  },
  {
    id: "02",
    slug: "02",
    name: "Kinetic Pricing Matrix",
    description: "3-tier pricing — 2.5D depth cards, cascade mount, hover lift, shimmer CTA",
    tags: ["Pricing", "Cards", "E-commerce"],
    component: KineticPricingMatrix,
    code: KineticPricingMatrixCode,
  },
  {
    id: "03",
    slug: "03",
    name: "Layered Waitlist Teaser",
    description: "Coming Soon waitlist — 1px crisp layered card, drifting blurred 2D color orbs, 5-theme accent palette",
    tags: ["Waitlist", "Teaser", "Glow Orbs"],
    component: WaitlistTeaser,
    code: WaitlistTeaserCode,
  },
  {
    id: "04",
    slug: "04",
    name: "Crisp Bento User Profile",
    description: "Dashboard layout — asymmetric bento grid, 2.5D separation borders, Appearance customizer, active states calibration",
    tags: ["Dashboard", "Bento Grid", "Profile"],
    component: BentoProfile,
    code: BentoProfileCode,
  },
  {
    id: "05",
    slug: "05",
    name: "Sliding Configurator",
    description: "Checkout form — 2D/2.5D overlapping cards, header theme switcher, horizontal sliding scale transitions",
    tags: ["Configurator", "Multi-Step", "AnimatePresence"],
    component: StepConfigurator,
    code: StepConfiguratorCode,
  },
  {
    id: "06",
    slug: "06",
    name: "Modern Bento Notification Center",
    description: "Asymmetric Bento Grid — 1px borders, layered flat aesthetic, 5-theme accent color sync, jelly-stretch morph toggles",
    tags: ["Dashboard", "Notifications", "Bento Grid"],
    component: BentoNotificationCenter,
    code: BentoNotificationCenterCode,
  },
  {
    id: "07",
    slug: "07",
    name: "Kinetic Media Slider",
    description: "Product Showcase Carousel — 2.5D foreground layering, shutter-split reveal, kinetic letter scramble, magnetic particles",
    tags: ["Slider", "Carousel", "Media"],
    component: KineticMediaSlider,
    code: KineticMediaSliderCode,
  },
  {
    id: "08",
    slug: "08",
    name: "Multi-Step Checkout & Cart Drawer",
    description: "Ecommerce Checkout Flow — liquid-elastic cart drawer, orbiting boundary neon tracers, active payment card lift, error vibration",
    tags: ["Checkout", "Multi-Step", "Cart Drawer"],
    component: MultiStepCheckout,
    code: MultiStepCheckoutCode,
  },
  {
    id: "09",
    slug: "09",
    name: "Interactive Pricing Table & Switcher",
    description: "Pricing plans — monthly/yearly counter roll-up, 2.5D highlight tier layering, 5-theme accent layout controller, liquid-ripple click response",
    tags: ["Pricing", "Cards", "Interactive"],
    component: PricingTable,
    code: PricingTableCode,
  },
  {
    id: "10",
    slug: "10",
    name: "Multi-Step User Onboarding Wizard",
    description: "Account creation flow — snappy staggered cascading spring entries, 5-theme accent swatch selector, progress tracking numbers morphing to checkmarks",
    tags: ["Onboarding", "Multi-Step", "Form"],
    component: OnboardingWizard,
    code: OnboardingWizardCode,
  },
  {
    id: "11",
    slug: "11",
    name: "Rich Mega-Menu Navigation Bar",
    description: "Mega-Menu dropdown — layout-morph panel resizing, magnetic submenu hover pills, setting-revealed 5-theme swatch controller",
    tags: ["Navigation", "Navbar", "Dropdown"],
    component: MegaMenu,
    code: MegaMenuCode,
  },
  {
    id: "12",
    slug: "12",
    name: "Advanced Search & Filter Sidebar",
    description: "Data catalog filters — path-drawn checkboxes with scale pop, dualprice tracking segment neon glow, category accordion height morphs",
    tags: ["Sidebar", "Filter", "Catalog"],
    component: AdvancedFilterSidebar,
    code: AdvancedFilterSidebarCode,
  },
  {
    id: "13",
    slug: "13",
    name: "Product Variant Configurator",
    description: "Premium product customizer — dynamic vector watch faces, 5-theme accent swatch selector, crossfade variant transitions, layout-morph active boundaries, sweeping gloss CTA reflection",
    tags: ["E-commerce", "Configurator", "Animations"],
    component: ProductVariantConfigurator,
    code: ProductVariantConfiguratorCode,
  },
  {
    id: "14",
    slug: "14",
    name: "Multi-Select Tag Input",
    description: "Autocomplete multi-tag selector — tag pop scales, dropdown slide entry, 5-theme color focus rings, backspace delete shake safeguard, arrow navigation",
    tags: ["Input", "Form", "Keyboard"],
    component: MultiSelectTagInput,
    code: MultiSelectTagInputCode,
  },
  {
    id: "15",
    slug: "15",
    name: "Interactive Skeleton Loader",
    description: "Cohesive dashboard skeleton — unified angled linear sheen shimmers, 5-theme accent color sync, layout-stable component crossfades, responsive stats grid",
    tags: ["Dashboard", "Skeleton", "Loader"],
    component: InteractiveSkeletonLoader,
    code: InteractiveSkeletonLoaderCode,
  },
  {
    id: "16",
    slug: "16",
    name: "Elevated 2.5D Kinetic Data Grid",
    description: "High-tech server status grid — dynamic Z-axis hover lifting, sorting spring reordering, nested detailed diagnostics charts, batch action drawer",
    tags: ["Dashboard", "Data Grid", "Interactive"],
    component: KineticDataGrid,
    code: KineticDataGridCode,
  },
  {
    id: "17",
    slug: "17",
    name: "3D Layered Metric Widgets & Trend Charts",
    description: "Tactile dashboard metrics — 3D-angled chart surfaces, floating SVG path graphs, spring-loaded neon coordinate lines, liquid glass tooltips",
    tags: ["Dashboard", "Charts", "Interactive"],
    component: LayeredMetricCharts,
    code: LayeredMetricChartsCode,
  },
  {
    id: "18",
    slug: "18",
    name: "Tactile Elastic FAQ Accordion Stack",
    description: "Physical support accordion — overlapping 2.5D card items, spring-loaded push-down physics, helpfulness rating counters with visual emoji particle splashes",
    tags: ["FAQ", "Accordion", "Micro-interactions"],
    component: TactileFAQAccordion,
    code: TactileFAQAccordionCode,
  },
  {
    id: "19",
    slug: "19",
    name: "Kinetic Release Notes Feed",
    description: "Flat-layered changelog feed — vertical tracking timeline with glowing markers, horizontal staggered entries, magnetic tag pulls, custom accents selector",
    tags: ["Changelog", "Timeline", "Interactive"],
    component: ReleaseNotesFeed,
    code: ReleaseNotesFeedCode,
  },
  {
    id: "20",
    slug: "20",
    name: "Kinetic OTP Verification",
    description: "Flat-layered 2FA validation panel — bounce input forwarding, synchronized error vibration shake, sequential liquid success animations, resend timers",
    tags: ["Auth", "Validation", "Form"],
    component: OTPVerification,
    code: OTPVerificationCode,
  },
  {
    id: "21",
    slug: "21",
    name: "High-Conversion Newsletter CTA",
    description: "Flat-layered sub input card — floating active placeholder label, morphing button actions, physics-based micro-particle confetti explosions, 5-theme selector",
    tags: ["Form", "Input", "Glow-Orbs"],
    component: NewsletterCTA,
    code: NewsletterCTACode,
  },
  {
    id: "22",
    slug: "22",
    name: "Elastic 2.5D Kanban Board",
    description: "Collaborative project board — Z-axis cursor-tilt cards, drag-and-drop column overlays, dynamic complete triggers, inline card creation",
    tags: ["Kanban", "Workflow", "Interactive"],
    component: ElasticKanbanBoard,
    code: ElasticKanbanBoardCode,
  },
  {
    id: "23",
    slug: "23",
    name: "Dynamic Content Card Grid",
    description: "Flat-layered responsive card grid — stagger-fade scroll entries, featured image hover zooms, active color overlays, magnetic read-more arrow glide",
    tags: ["Grid", "Cards", "Interactive"],
    component: ContentCardGrid,
    code: ContentCardGridCode,
  },
  {
    id: "24",
    slug: "24",
    name: "Floating Support Messenger Widget",
    description: "Floating messenger window — bottom-anchored spring morphs, incoming message slide-ins, sequentially bouncing typing dots, user message scale bounces",
    tags: ["Messenger", "Chat", "Interactive"],
    component: SupportMessenger,
    code: SupportMessengerCode,
  },
  {
    id: "25",
    slug: "25",
    name: "Nested Threaded Discussion Board",
    description: "Nested comments section — indent guidelines, layout morph reply reveals, micro-jump upvotes, entry staggered highlights",
    tags: ["Discussion", "Comments", "Interactive"],
    component: DiscussionBoard,
    code: DiscussionBoardCode,
  },
  {
    id: "26",
    slug: "26",
    name: "Step-by-Step Interactive Product Tour",
    description: "Interactive onboarding overlay — absolute outline highlight morphing, snappy spring tooltip positioning, skip tour horizontal slide indicators, custom themes",
    tags: ["Onboarding", "Tour", "Interactive"],
    component: ProductTour,
    code: ProductTourCode,
  },
  {
    id: "27",
    slug: "27",
    name: "Kinetic Hero Product Carousel",
    description: "Auto-advancing product spotlight — horizontal slide-outs, vertical cylinder slots for titles and prices, pause-on-hover circular progress dots, CTA diagonal gloss sweep",
    tags: ["Carousel", "Landing Page", "Interactive"],
    component: HeroCarousel,
    code: HeroCarouselCode,
  },
  {
    id: "28",
    slug: "28",
    name: "Sticky E-commerce Action Bar",
    description: "Scroll-threshold sticky purchase bar — dynamic color variant picker micro-flips, morphing button spinners, success checkmarks, settings gear swatches",
    tags: ["E-commerce", "Sticky", "Form"],
    component: StickyPurchaseBar,
    code: StickyPurchaseBarCode,
  },
  {
    id: "29",
    slug: "29",
    name: "Dynamic Mega Footer & Newsletter",
    description: "Flat-layered interactive site footer — animated link underlines, social icon bounces, SVG input boundary tracers, newsletter success liquid ripples",
    tags: ["Footer", "Layout", "Interactive"],
    component: MegaFooter,
    code: MegaFooterCode,
  },
  {
    id: "30",
    slug: "30",
    name: "Support Ticketing & Contact Form",
    description: "Flat-layered support dispatcher — dynamic department conditional questions with height morphs, button progress transitions, liquid-ripple success state",
    tags: ["Form", "Ticketing", "Department"],
    component: SupportTicketing,
    code: SupportTicketingCode,
  },
  {
    id: "31",
    slug: "31",
    name: "404 / Empty State Recovery Page",
    description: "Tactile offline screen — floating sine-wave 404 animation, magnetic Home button pull, active swatch sync accents, database search",
    tags: ["404", "Empty State", "Magnetic"],
    component: EmptyStateRecovery,
    code: EmptyStateRecoveryCode,
  },
  {
    id: "32",
    slug: "32",
    name: "Accessible Account Settings Hub",
    description: "Accessibility-first user dashboard — vertical active indicator tab sliding, guided layout-morph 2FA setups, instant content crossfades",
    tags: ["A11y", "Settings", "Forms"],
    component: AccountSettingsHub,
    code: AccountSettingsHubCode,
  },
  {
    id: "33",
    slug: "33",
    name: "Kinetic Event & Webinar Registration",
    description: "High-conversion RSVP block — mechanical split-flap countdown rolls, hover slide-out speaker cards, layout-dissolving confirmation morphs",
    tags: ["Form", "Countdown", "Cards"],
    component: EventRegistration,
    code: EventRegistrationCode,
  },
];

/* ═══════════════════════════════════════════════════════════
   PREVIEW ROUTE — single component, full screen, no chrome
   URL: /preview/01  /preview/02  …
   
   This is how you test each component individually!
═══════════════════════════════════════════════════════════ */
function PreviewRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const slug = location.pathname.replace("/preview/", "").trim();
  const entry = COMPONENTS.find((c) => c.slug === slug);
  const [codeOpen, setCodeOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!entry) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center"
        style={{ background: "#060810" }}>
        <p className="text-2xl font-black text-white mb-2">Component not found</p>
        <p className="text-sm mb-6" style={{ color: "rgba(200,215,255,0.4)" }}>
          No component with slug "{slug}"
        </p>
        <button onClick={() => navigate("/")}
          className="px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer"
          style={{ background: "rgba(0,229,255,0.15)", border: "1px solid rgba(0,229,255,0.3)", color: "#00E5FF" }}>
          ← Back to Showcase
        </button>
      </div>
    );
  }

  const Comp = entry.component;

  const handleCopy = () => {
    if (entry.code) {
      navigator.clipboard.writeText(entry.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Floating back button */}
      <motion.button
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        onClick={() => navigate("/")}
        whileHover={{ x: -3, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="fixed top-4 left-4 z-[999] flex items-center gap-2 px-3.5 py-2 rounded-xl
          text-[11px] font-bold tracking-wide cursor-pointer"
        style={{
          background: "rgba(8,10,22,0.9)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(200,215,255,0.7)",
          backdropFilter: "blur(16px)",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Showcase
      </motion.button>

      {/* Controls row */}
      <div className="fixed top-4 right-4 z-[999] flex items-center gap-2">
        {/* View Code Button */}
        {entry.code && (
          <motion.button
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            onClick={() => setCodeOpen((v) => !v)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold cursor-pointer"
            style={{
              background: "rgba(8,10,22,0.9)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: codeOpen ? "#00E5FF" : "rgba(200,215,255,0.7)",
              backdropFilter: "blur(16px)",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
            {codeOpen ? "Hide Code" : "View Code"}
          </motion.button>
        )}

        {/* Component ID badge */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-[11px] font-bold"
          style={{
            background: "rgba(8,10,22,0.9)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(200,215,255,0.5)",
            backdropFilter: "blur(16px)",
          }}
        >
          <span className="font-mono" style={{ color: "#00E5FF" }}>#{entry.id}</span>
          {entry.name}
        </motion.div>
      </div>

      {/* Full-screen component render */}
      <div className="transition-all duration-300" style={{ marginRight: codeOpen ? "640px" : "0px" }}>
        <Comp />
      </div>

      {/* Sliding Code Panel Drawer */}
      <AnimatePresence>
        {codeOpen && entry.code && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed top-0 bottom-0 right-0 z-[990] flex flex-col border-l"
            style={{
              width: "640px",
              background: "rgba(6, 8, 16, 0.98)",
              borderColor: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Header / Info bar */}
            <div className="pt-20 px-6 pb-4 border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-white font-mono">{entry.name}</h3>
                <span className="text-[10px] text-white/40 font-mono">Source code component file</span>
              </div>

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider font-mono border cursor-pointer transition-all flex items-center gap-1.5"
                style={{
                  background: copied ? "rgba(0,255,136,0.12)" : "rgba(255,255,255,0.04)",
                  borderColor: copied ? "#00FF88" : "rgba(255,255,255,0.08)",
                  color: copied ? "#00FF88" : "rgba(200,215,255,0.6)",
                }}
              >
                {copied ? (
                  <>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    Copy Code
                  </>
                )}
              </button>
            </div>

            {/* Code Block Container */}
            <div className="flex-1 overflow-auto p-6 font-mono text-[11px] leading-relaxed select-text">
              <pre className="whitespace-pre overflow-x-auto select-text selection:bg-cyan-500/35">
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlightJSX(entry.code),
                  }}
                />
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SHOWCASE — sidebar + grid of component cards
   URL: /
═══════════════════════════════════════════════════════════ */
function ShowcasePage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { activeVariant } = useGlobalTheme();

  return (
    <div className="flex min-h-screen">

      {/* ── Sidebar ── */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -264, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -264, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-0 top-0 bottom-0 z-50 flex flex-col overflow-hidden"
            style={{
              width: 264,
              background: "linear-gradient(180deg,rgba(10,14,30,0.99) 0%,rgba(6,8,16,0.99) 100%)",
              borderRight: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Brand */}
            <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(0,229,255,0.12)", border: "1px solid rgba(0,229,255,0.28)" }}>
                  <span className="text-xs font-black" style={{ color: "#00E5FF" }}>50</span>
                </div>
                <div>
                  <div className="text-sm font-black text-white">2.5D Web UI</div>
                  <div className="text-[9px]" style={{ color: "rgba(200,215,255,0.28)" }}>
                    Component Library
                  </div>
                </div>
              </div>
            </div>

            {/* Nav list */}
            <div className="flex-1 overflow-y-auto px-3 py-3">
              <div className="text-[9px] font-black tracking-widest uppercase px-2 mb-2"
                style={{ color: "rgba(200,215,255,0.2)" }}>
                Built ({COMPONENTS.length} / 50)
              </div>
              <div className="flex flex-col gap-1">
                {COMPONENTS.map((item) => (
                  <motion.button key={item.id}
                    onClick={() => navigate(`/preview/${item.slug}`)}
                    whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }}
                    className="w-full text-left px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200"
                    style={{
                      background: `${activeVariant.triggerColor}0f`,
                      border: `1px solid ${activeVariant.triggerColor}26`,
                    }}>
                    <div className="flex items-start gap-2.5">
                      <span className="text-[10px] font-black font-mono-theme mt-0.5 flex-shrink-0"
                        style={{ color: activeVariant.triggerColor }}>
                        {item.id}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-white leading-tight">{item.name}</div>
                        <div className="text-[9px] mt-0.5 leading-snug" style={{ color: "rgba(200,215,255,0.28)" }}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}

                {/* Empty slots */}
                <div className="text-[9px] font-black tracking-widest uppercase px-2 mt-3 mb-1.5"
                  style={{ color: "rgba(200,215,255,0.12)" }}>
                  Coming soon ({50 - COMPONENTS.length})
                </div>
                {Array.from({ length: 50 }, (_, i) => i + 1)
                  .filter((n) => !COMPONENTS.some((c) => parseInt(c.id) === n))
                  .map((n) => (
                    <div key={n} className="px-3 py-2 rounded-xl opacity-20 select-none"
                      style={{ border: "1px dashed rgba(255,255,255,0.07)" }}>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black font-mono"
                          style={{ color: "rgba(200,215,255,0.3)" }}>
                          {String(n).padStart(2, "0")}
                        </span>
                        <div className="text-[10px]" style={{ color: "rgba(200,215,255,0.18)" }}>
                          Upcoming component
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="text-[9px]" style={{ color: "rgba(200,215,255,0.18)" }}>
                React · Tailwind CSS · Framer Motion
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Sidebar toggle */}
      <motion.button
        onClick={() => setSidebarOpen((v) => !v)}
        whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
        className="fixed top-4 z-[60] w-8 h-8 flex items-center justify-center rounded-xl cursor-pointer"
        style={{
          left: sidebarOpen ? 272 : 12,
          background: "rgba(10,14,30,0.95)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(200,215,255,0.6)",
          backdropFilter: "blur(12px)",
          transition: "left 0.32s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          {sidebarOpen
            ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
          }
        </svg>
      </motion.button>

      {/* ── Main area ── */}
      <main className="flex-1 overflow-y-auto transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? 264 : 0, minHeight: "100vh" }}>
        <div className="p-8 pt-16 sm:pt-8 max-w-5xl mx-auto">

          {/* Page header */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                Library
              </div>
              <span className="text-[11px] opacity-40">
                {COMPONENTS.length} / 50 built
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black mb-2">50 × 2.5D Components</h1>
            <p className="text-sm opacity-60">
              Click any card to preview it full-screen, or navigate directly via{" "}
              <code className="px-1.5 py-0.5 rounded text-[11px] bg-cyan-500/10 text-cyan-400">
                /preview/01
              </code>
            </p>
          </motion.div>

          {/* Component cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPONENTS.map((item, i) => (
              <motion.div key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                onClick={() => navigate(`/preview/${item.slug}`)}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative overflow-hidden cursor-pointer group p-5 transition-all duration-300 ${activeVariant.cardClass}`}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${activeVariant.triggerColor}0d 0%, transparent 100%)` }} />

                <div className="relative p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black font-mono-theme px-2 py-1 rounded-lg"
                      style={{ background: `${activeVariant.triggerColor}1a`, color: activeVariant.triggerColor }}>
                      #{item.id}
                    </span>
                    <svg className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={activeVariant.triggerColor} strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </div>
                  <h3 className={`font-black text-sm mb-1 ${activeVariant.accentText}`}>{item.name}</h3>
                  <p className={`text-[11px] leading-snug mb-3 opacity-60 ${activeVariant.mode === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className={`text-[9px] font-bold px-2 py-0.5 rounded-full bg-current/5 ${activeVariant.mode === 'dark' ? 'text-white/60' : 'text-slate-800/60'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${activeVariant.triggerColor}80, transparent)` }} />
              </motion.div>
            ))}

            {Array.from({ length: 50 }, (_, i) => i + 1)
              .filter((n) => !COMPONENTS.some((c) => parseInt(c.id) === n))
              .map((n) => (
                <div key={n} className={`p-5 opacity-20 select-none ${activeVariant.cardClass}`}>
                  <div className="text-[10px] font-black font-mono mb-2 opacity-50">
                    #{String(n).padStart(2, "0")}
                  </div>
                  <div className="h-2 rounded w-3/4 mb-2 bg-current opacity-10" />
                  <div className="h-2 rounded w-1/2 bg-current opacity-10" />
                </div>
              ))
            }
          </div>
        </div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT APP — ROUTING TABLE
═══════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <AnimatePresence mode="wait">
      <GlobalThemeSwitcher />
      <Routes>
        <Route path="/" element={<ShowcasePage />} />
        <Route path="/preview/:slug" element={<PreviewPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function GlobalThemeSwitcher() {
  const { 
    activeStyle, 
    activePalette, 
    setActiveStyleId, 
    setActivePaletteId, 
    variants 
  } = useGlobalTheme();
  
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2">
      {/* Style Selector */}
      <div className="bg-[#0c0e1a]/95 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3.5 shadow-2xl">
        <span className="text-[9px] font-mono uppercase tracking-widest text-white/50 hidden sm:inline">Architecture:</span>
        <div className="flex gap-2">
          {variants.map(variant => (
            <button
              key={variant.id}
              onClick={() => setActiveStyleId(variant.id)}
              className="px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide transition-all border cursor-pointer"
              style={{
                backgroundColor: activeStyle.id === variant.id ? "rgba(255,255,255,0.1)" : "transparent",
                borderColor: activeStyle.id === variant.id ? "rgba(255,255,255,0.2)" : "transparent",
                color: activeStyle.id === variant.id ? "#fff" : "rgba(255,255,255,0.5)"
              }}
              title={variant.name}
            >
              {variant.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Palette Selector */}
      <motion.div 
        key={activeStyle.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0c0e1a]/95 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3.5 shadow-xl"
      >
        <span className="text-[9px] font-mono uppercase tracking-widest text-white/50 hidden sm:inline">Color Palette:</span>
        <div className="flex gap-2">
          {activeStyle.palettes.map(palette => (
            <button
              key={palette.id}
              onClick={() => setActivePaletteId(palette.id)}
              className="w-5 h-5 rounded-full cursor-pointer relative transition-all hover:scale-110 flex items-center justify-center border border-white/20"
              style={{ backgroundColor: palette.triggerColor }}
              title={palette.name}
              aria-label={`Switch palette to ${palette.name}`}
            >
              {activePalette.id === palette.id && (
                <motion.div
                  layoutId="global-active-palette-ring"
                  className="absolute -inset-1.5 rounded-full border-2 border-white"
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                />
              )}
            </button>
          ))}
        </div>
        <span className="text-[9px] font-mono uppercase border-l border-white/10 pl-3 hidden sm:inline" style={{ color: activePalette.triggerColor }}>
          {activePalette.name}
        </span>
      </motion.div>
    </div>
  );
}


/* Wrapper that reads the :slug param and renders PreviewRoute */
function PreviewPage() {
  return <PreviewRoute />;
}

