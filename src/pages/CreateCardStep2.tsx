import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';

const STEP_NAMES = [
  'Choose Occasion',
  'Thank You Designs for your {occasion ? occasionLabels[occasion] : 'Occasion'}',
  'Customize Design',
  'Write Your Message',
  'Choose Your Cause',
  'Add Finishing Touches',
  'Preview & Send',
];

type OccasionId =
  | 'wedding'
  | 'baby'
  | 'graduation'
  | 'birthday'
  | 'mitzvah'
  | 'corporate'
  | 'general'
  | 'memorial'
  | 'charity';

/* ---------- Design schema ---------- */
type HeaderStyle =
  | 'botanical'        // soft floral curves + leaves
  | 'monogram'         // centered monogram with thin frame
  | 'starburst'        // radial lines
  | 'confetti'         // scattered dots
  | 'starOfDavid'      // mitzvah star
  | 'ornamentFrame'    // corner ornaments / classic frame
  | 'wave'             // soft horizon wave
  | 'dotsField';       // refined dot grid

type FontFamily = 'serifScript' | 'serifItalic' | 'sansCaps' | 'serifClassic';

interface Design {
  id: string;
  occasion: OccasionId;
  name: string;
  tag: string;
  // Color tokens
  bg: string;            // card body bg
  headerBg: string;      // gradient/solid behind header art
  ink: string;           // primary ink for headline
  inkSoft: string;       // body text
  accent: string;        // accent for art + buttons
  accentSoft: string;    // tint
  tagBg: string;
  tagColor: string;
  donationBg: string;
  donationColor: string;
  // Style choices
  headerStyle: HeaderStyle;
  headlineText: string;
  font: FontFamily;
  greeting: string;
  body: string;
  donation: string;
  fontChoice: 'inter' | 'playfair' | 'dancing';
}

/* ---------- Per-occasion design sets (3-4 each) ---------- */
const DESIGN_SETS: Record<OccasionId, Design[]> = {
  wedding: [
    {
      id: 'wedding-rose-garden',
      occasion: 'wedding',
      name: 'Rose Garden',
      tag: 'Blush & Rose',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #fdf6f3 0%, #f7d2d8 100%)',
      ink: '#7a3744',
      inkSoft: '#5d4045',
      accent: '#c17b8a',
      accentSoft: '#f5ede9',
      tagBg: '#f5ede9',
      tagColor: '#8b4a5a',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'botanical',
      headlineText: 'With Love & Gratitude',
      font: 'serifScript',
      greeting: 'Dear Emma & James,',
      body: 'Your wedding was the most beautiful day…',
      donation: '$4 to Rainforest Alliance',
      fontChoice: 'playfair',
    },
    {
      id: 'wedding-ivory-elegance',
      occasion: 'wedding',
      name: 'Ivory Elegance',
      tag: 'Cream & Gold',
      bg: '#fffdf8',
      headerBg: '#faf6ef',
      ink: '#2d2420',
      inkSoft: '#6b5e4a',
      accent: '#c9a96e',
      accentSoft: '#f5efe2',
      tagBg: '#f5efe2',
      tagColor: '#8a7340',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'ornamentFrame',
      headlineText: 'A Note of Gratitude',
      font: 'sansCaps',
      greeting: 'Dear Mr. & Mrs. Carter,',
      body: 'Thank you for celebrating with us…',
      donation: '$4 to UNICEF',
      fontChoice: 'inter',
    },
    {
      id: 'wedding-garden-party',
      occasion: 'wedding',
      name: 'Garden Party',
      tag: 'Sage Green',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #eef2e8 0%, #c5d4bc 100%)',
      ink: '#3d5a3a',
      inkSoft: '#4f6649',
      accent: '#5e7a5a',
      accentSoft: '#eef2e8',
      tagBg: '#eef2e8',
      tagColor: '#3d5a3a',
      donationBg: '#f5ede9',
      donationColor: '#8b4a5a',
      headerStyle: 'botanical',
      headlineText: 'Forever Thankful',
      font: 'serifScript',
      greeting: 'Dear Sophie & Liam,',
      body: 'Sharing our day with you was a joy…',
      donation: '$4 to The Nature Conservancy',
      fontChoice: 'playfair',
    },
    {
      id: 'wedding-timeless',
      occasion: 'wedding',
      name: 'Timeless',
      tag: 'Black & White',
      bg: '#ffffff',
      headerBg: '#f7f5f2',
      ink: '#1a1a1a',
      inkSoft: '#4a4a4a',
      accent: '#1a1a1a',
      accentSoft: '#ececea',
      tagBg: '#ececea',
      tagColor: '#1a1a1a',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'monogram',
      headlineText: 'Thank You',
      font: 'serifClassic',
      greeting: 'Dear friends,',
      body: 'Your presence made our day complete…',
      donation: '$4 to Doctors Without Borders',
      fontChoice: 'playfair',
    },
  ],
  baby: [
    {
      id: 'baby-wildflower-sage',
      occasion: 'baby',
      name: 'Wildflower Sage',
      tag: 'Sage Greens',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #eef2e8 0%, #c5d4bc 100%)',
      ink: '#3d5a3a',
      inkSoft: '#4f6649',
      accent: '#5e7a5a',
      accentSoft: '#eef2e8',
      tagBg: '#eef2e8',
      tagColor: '#3d5a3a',
      donationBg: '#f5ede9',
      donationColor: '#8b4a5a',
      headerStyle: 'botanical',
      headlineText: 'Welcome, Little One',
      font: 'serifScript',
      greeting: 'Dear Sarah,',
      body: "We're so thrilled to welcome baby Lily…",
      donation: '$3 to UNICEF',
      fontChoice: 'playfair',
    },
    {
      id: 'baby-soft-blush',
      occasion: 'baby',
      name: 'Soft Blush',
      tag: 'Baby Pinks',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #fdf6f3 0%, #fcdfe5 100%)',
      ink: '#a55a6a',
      inkSoft: '#7a4a55',
      accent: '#c17b8a',
      accentSoft: '#f5ede9',
      tagBg: '#f5ede9',
      tagColor: '#8b4a5a',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'confetti',
      headlineText: 'A Tiny Miracle',
      font: 'serifScript',
      greeting: 'Dear Aunt Mary,',
      body: 'Thank you for the love & sweet gifts…',
      donation: '$3 to March of Dimes',
      fontChoice: 'playfair',
    },
    {
      id: 'baby-sky-blue',
      occasion: 'baby',
      name: 'Sky Blue',
      tag: 'Baby Blues',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #eef4fb 0%, #c2d8ee 100%)',
      ink: '#2c4a6e',
      inkSoft: '#3d5a7e',
      accent: '#5a85b8',
      accentSoft: '#eef4fb',
      tagBg: '#eef4fb',
      tagColor: '#2c4a6e',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'wave',
      headlineText: 'Hello, Sweet Boy',
      font: 'serifScript',
      greeting: 'Dear Grandma,',
      body: 'Baby Noah loves the gift you sent…',
      donation: '$3 to Save the Children',
      fontChoice: 'playfair',
    },
    {
      id: 'baby-sunshine',
      occasion: 'baby',
      name: 'Sunshine',
      tag: 'Soft Yellows',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #fff8e1 0%, #fde9a3 100%)',
      ink: '#8a6a1e',
      inkSoft: '#6b5418',
      accent: '#d4a843',
      accentSoft: '#fff8e1',
      tagBg: '#fff8e1',
      tagColor: '#8a6a1e',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'starburst',
      headlineText: 'Our Little Sunshine',
      font: 'serifScript',
      greeting: 'Dear Friends,',
      body: 'Thank you for warming our home…',
      donation: '$3 to UNICEF',
      fontChoice: 'playfair',
    },
  ],
  graduation: [
    {
      id: 'grad-golden-cap',
      occasion: 'graduation',
      name: 'Golden Cap',
      tag: 'Gold & Navy',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #1e2a3a 0%, #16213a 100%)',
      ink: '#1e2a3a',
      inkSoft: '#3d4a5a',
      accent: '#c9a96e',
      accentSoft: '#f5efe2',
      tagBg: '#f5efe2',
      tagColor: '#8a7340',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'starburst',
      headlineText: 'With Gratitude',
      font: 'serifItalic',
      greeting: 'Dear Professor Kim,',
      body: 'Thank you for guiding me through…',
      donation: '$4 to Scholarship America',
      fontChoice: 'playfair',
    },
    {
      id: 'grad-classic-scholar',
      occasion: 'graduation',
      name: 'Classic Scholar',
      tag: 'Navy & White',
      bg: '#ffffff',
      headerBg: '#f4f6fa',
      ink: '#1e2a3a',
      inkSoft: '#3d4a5a',
      accent: '#1e2a3a',
      accentSoft: '#e3e8f0',
      tagBg: '#e3e8f0',
      tagColor: '#1e2a3a',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'monogram',
      headlineText: 'Thank You',
      font: 'serifClassic',
      greeting: 'Dear Mom & Dad,',
      body: 'Thank you for your endless support…',
      donation: '$4 to DonorsChoose',
      fontChoice: 'playfair',
    },
    {
      id: 'grad-celebration',
      occasion: 'graduation',
      name: 'Celebration',
      tag: 'Purple & Gold',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #f3eef9 0%, #d8c4ed 100%)',
      ink: '#4b2e7a',
      inkSoft: '#5a3d8a',
      accent: '#7a4dad',
      accentSoft: '#f3eef9',
      tagBg: '#f3eef9',
      tagColor: '#4b2e7a',
      donationBg: '#f5efe2',
      donationColor: '#8a7340',
      headerStyle: 'confetti',
      headlineText: 'I Did It — Thank You!',
      font: 'serifScript',
      greeting: 'Dear Friends,',
      body: 'I couldn\'t have done it without you…',
      donation: '$4 to Khan Academy',
      fontChoice: 'playfair',
    },
    {
      id: 'grad-modern',
      occasion: 'graduation',
      name: 'Modern Graduate',
      tag: 'Black & Gold',
      bg: '#ffffff',
      headerBg: '#1a1a1a',
      ink: '#1a1a1a',
      inkSoft: '#3a3a3a',
      accent: '#c9a96e',
      accentSoft: '#f5efe2',
      tagBg: '#f5efe2',
      tagColor: '#8a7340',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'ornamentFrame',
      headlineText: 'Class Of',
      font: 'sansCaps',
      greeting: 'Dear Mentor,',
      body: 'Your wisdom shaped my path…',
      donation: '$4 to Teach For America',
      fontChoice: 'inter',
    },
  ],
  birthday: [
    {
      id: 'bday-confetti-joy',
      occasion: 'birthday',
      name: 'Confetti Joy',
      tag: 'Bright & Multicolor',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #fff7f0 0%, #fde2cc 100%)',
      ink: '#c17b8a',
      inkSoft: '#7a3744',
      accent: '#c17b8a',
      accentSoft: '#f5ede9',
      tagBg: '#f5ede9',
      tagColor: '#8b4a5a',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'confetti',
      headlineText: 'Hooray — Thank You!',
      font: 'serifScript',
      greeting: 'Dear Friends,',
      body: 'Thank you for making my day so fun…',
      donation: '$3 to Make-A-Wish',
      fontChoice: 'playfair',
    },
    {
      id: 'bday-golden',
      occasion: 'birthday',
      name: 'Golden Birthday',
      tag: 'Gold & Cream',
      bg: '#fffdf8',
      headerBg: '#faf6ef',
      ink: '#8a6a1e',
      inkSoft: '#6b5418',
      accent: '#c9a96e',
      accentSoft: '#f5efe2',
      tagBg: '#f5efe2',
      tagColor: '#8a7340',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'ornamentFrame',
      headlineText: 'A Golden Year',
      font: 'serifItalic',
      greeting: 'Dear Aunt Linda,',
      body: 'Your gift made me feel so loved…',
      donation: '$3 to UNICEF',
      fontChoice: 'playfair',
    },
    {
      id: 'bday-floral',
      occasion: 'birthday',
      name: 'Floral Celebration',
      tag: 'Roses & Blooms',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #fdf6f3 0%, #f7d2d8 100%)',
      ink: '#7a3744',
      inkSoft: '#5d4045',
      accent: '#c17b8a',
      accentSoft: '#f5ede9',
      tagBg: '#f5ede9',
      tagColor: '#8b4a5a',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'botanical',
      headlineText: 'Thank You, Truly',
      font: 'serifScript',
      greeting: 'Dear Best Friend,',
      body: 'You always know how to celebrate me…',
      donation: '$3 to Rainforest Alliance',
      fontChoice: 'playfair',
    },
    {
      id: 'bday-bold-fun',
      occasion: 'birthday',
      name: 'Bold & Fun',
      tag: 'Vibrant',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #fde8ef 0%, #f7c2d4 50%, #fbe4a3 100%)',
      ink: '#1a1a1a',
      inkSoft: '#3a3a3a',
      accent: '#e85a8c',
      accentSoft: '#fde8ef',
      tagBg: '#fde8ef',
      tagColor: '#a02a5a',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'starburst',
      headlineText: 'BIG Thanks!',
      font: 'sansCaps',
      greeting: 'Dear Crew,',
      body: 'You made my birthday legendary…',
      donation: '$3 to Boys & Girls Clubs',
      fontChoice: 'inter',
    },
  ],
  mitzvah: [
    {
      id: 'mitzvah-midnight-gala',
      occasion: 'mitzvah',
      name: 'Midnight Gala',
      tag: 'Navy & Gold',
      bg: '#ffffff',
      headerBg: '#1e2a3a',
      ink: '#1e2a3a',
      inkSoft: '#3d4a5a',
      accent: '#c9a96e',
      accentSoft: '#f5efe2',
      tagBg: '#1e2a3a',
      tagColor: '#c9a96e',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'ornamentFrame',
      headlineText: "L'Chaim & Thank You",
      font: 'serifItalic',
      greeting: 'Dear David,',
      body: "Your presence at Noah's Bar Mitzvah meant everything…",
      donation: '$5 to Jewish Federation',
      fontChoice: 'playfair',
    },
    {
      id: 'mitzvah-star-of-david',
      occasion: 'mitzvah',
      name: 'Star of David',
      tag: 'Blue & Silver',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #eef4fb 0%, #c2d8ee 100%)',
      ink: '#1e3a5a',
      inkSoft: '#3d5a7e',
      accent: '#5a85b8',
      accentSoft: '#eef4fb',
      tagBg: '#eef4fb',
      tagColor: '#1e3a5a',
      donationBg: '#f5efe2',
      donationColor: '#8a7340',
      headerStyle: 'starOfDavid',
      headlineText: 'Todah Rabah',
      font: 'serifClassic',
      greeting: 'Dear Friends,',
      body: 'Thank you for celebrating this milestone…',
      donation: '$5 to PJ Library',
      fontChoice: 'playfair',
    },
    {
      id: 'mitzvah-garden-blessing',
      occasion: 'mitzvah',
      name: 'Garden Blessing',
      tag: 'Sage & White',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #eef2e8 0%, #c5d4bc 100%)',
      ink: '#3d5a3a',
      inkSoft: '#4f6649',
      accent: '#5e7a5a',
      accentSoft: '#eef2e8',
      tagBg: '#eef2e8',
      tagColor: '#3d5a3a',
      donationBg: '#f5efe2',
      donationColor: '#8a7340',
      headerStyle: 'botanical',
      headlineText: 'With Heartfelt Thanks',
      font: 'serifScript',
      greeting: 'Dear Family,',
      body: 'Your blessings mean the world to us…',
      donation: '$5 to Hazon (Jewish Environmental)',
      fontChoice: 'playfair',
    },
    {
      id: 'mitzvah-regal-gold',
      occasion: 'mitzvah',
      name: 'Regal Gold',
      tag: 'Purple & Gold',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #f3eef9 0%, #c8a8e6 100%)',
      ink: '#4b2e7a',
      inkSoft: '#5a3d8a',
      accent: '#c9a96e',
      accentSoft: '#f5efe2',
      tagBg: '#f3eef9',
      tagColor: '#4b2e7a',
      donationBg: '#f5efe2',
      donationColor: '#8a7340',
      headerStyle: 'starOfDavid',
      headlineText: 'Mazel Tov & Thank You',
      font: 'serifItalic',
      greeting: 'Dear Loved Ones,',
      body: 'A simcha shared is a simcha doubled…',
      donation: '$5 to Jewish Family Services',
      fontChoice: 'playfair',
    },
  ],
  corporate: [
    {
      id: 'corp-gilded-note',
      occasion: 'corporate',
      name: 'Gilded Note',
      tag: 'Gold & Charcoal',
      bg: '#fffdf8',
      headerBg: '#faf6ef',
      ink: '#2d2420',
      inkSoft: '#5a4f44',
      accent: '#c9a96e',
      accentSoft: '#f5efe2',
      tagBg: '#f5efe2',
      tagColor: '#8a7340',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'ornamentFrame',
      headlineText: 'A Note of Appreciation',
      font: 'sansCaps',
      greeting: 'Dear Team,',
      body: 'Your hard work on Q3 made all the difference…',
      donation: '$3 to local food bank',
      fontChoice: 'inter',
    },
    {
      id: 'corp-clean-modern',
      occasion: 'corporate',
      name: 'Clean Modern',
      tag: 'Slate & White',
      bg: '#ffffff',
      headerBg: '#f4f6f8',
      ink: '#2d3a48',
      inkSoft: '#5a6878',
      accent: '#5a6878',
      accentSoft: '#e8ecf0',
      tagBg: '#e8ecf0',
      tagColor: '#2d3a48',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'monogram',
      headlineText: 'Thank You',
      font: 'sansCaps',
      greeting: 'Dear Partner,',
      body: 'We value our continued collaboration…',
      donation: '$3 to United Way',
      fontChoice: 'inter',
    },
    {
      id: 'corp-forest-pro',
      occasion: 'corporate',
      name: 'Forest Professional',
      tag: 'Dark Green',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #1f3a2e 0%, #142a20 100%)',
      ink: '#1f3a2e',
      inkSoft: '#3d5546',
      accent: '#1f3a2e',
      accentSoft: '#e3ece6',
      tagBg: '#e3ece6',
      tagColor: '#1f3a2e',
      donationBg: '#f5efe2',
      donationColor: '#8a7340',
      headerStyle: 'ornamentFrame',
      headlineText: 'With Sincere Thanks',
      font: 'serifClassic',
      greeting: 'Dear Client,',
      body: 'Thank you for trusting our team…',
      donation: '$3 to The Nature Conservancy',
      fontChoice: 'playfair',
    },
    {
      id: 'corp-navy-exec',
      occasion: 'corporate',
      name: 'Navy Executive',
      tag: 'Navy & Silver',
      bg: '#ffffff',
      headerBg: '#1e2a3a',
      ink: '#1e2a3a',
      inkSoft: '#3d4a5a',
      accent: '#1e2a3a',
      accentSoft: '#e3e8f0',
      tagBg: '#e3e8f0',
      tagColor: '#1e2a3a',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'monogram',
      headlineText: 'In Appreciation',
      font: 'sansCaps',
      greeting: 'Dear Colleague,',
      body: 'Your contribution did not go unnoticed…',
      donation: '$3 to American Red Cross',
      fontChoice: 'inter',
    },
  ],
  general: [
    {
      id: 'gen-classic-rose',
      occasion: 'general',
      name: 'Classic Rose',
      tag: 'Soft Pink',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #fdf6f3 0%, #f7d2d8 100%)',
      ink: '#7a3744',
      inkSoft: '#5d4045',
      accent: '#c17b8a',
      accentSoft: '#f5ede9',
      tagBg: '#f5ede9',
      tagColor: '#8b4a5a',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'botanical',
      headlineText: 'Thank You',
      font: 'serifScript',
      greeting: 'Dear Friend,',
      body: 'Your kindness means more than words…',
      donation: '$3 to local charity',
      fontChoice: 'playfair',
    },
    {
      id: 'gen-elegant-cream',
      occasion: 'general',
      name: 'Elegant Cream',
      tag: 'Cream & Gold',
      bg: '#fffdf8',
      headerBg: '#faf6ef',
      ink: '#2d2420',
      inkSoft: '#5a4f44',
      accent: '#c9a96e',
      accentSoft: '#f5efe2',
      tagBg: '#f5efe2',
      tagColor: '#8a7340',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'ornamentFrame',
      headlineText: 'A Note of Thanks',
      font: 'serifItalic',
      greeting: 'Dear Friend,',
      body: 'I am so grateful for your generosity…',
      donation: '$3 to UNICEF',
      fontChoice: 'playfair',
    },
    {
      id: 'gen-modern-minimal',
      occasion: 'general',
      name: 'Modern Minimal',
      tag: 'White & Black',
      bg: '#ffffff',
      headerBg: '#f7f5f2',
      ink: '#1a1a1a',
      inkSoft: '#4a4a4a',
      accent: '#1a1a1a',
      accentSoft: '#ececea',
      tagBg: '#ececea',
      tagColor: '#1a1a1a',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'monogram',
      headlineText: 'Thanks',
      font: 'sansCaps',
      greeting: 'Hi,',
      body: 'Just a quick note to say thank you…',
      donation: '$3 to Doctors Without Borders',
      fontChoice: 'inter',
    },
    {
      id: 'gen-nature-thanks',
      occasion: 'general',
      name: 'Nature Thanks',
      tag: 'Sage Green',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #eef2e8 0%, #c5d4bc 100%)',
      ink: '#3d5a3a',
      inkSoft: '#4f6649',
      accent: '#5e7a5a',
      accentSoft: '#eef2e8',
      tagBg: '#eef2e8',
      tagColor: '#3d5a3a',
      donationBg: '#f5efe2',
      donationColor: '#8a7340',
      headerStyle: 'botanical',
      headlineText: 'With Gratitude',
      font: 'serifScript',
      greeting: 'Dear Friend,',
      body: 'Your kindness has not gone unnoticed…',
      donation: '$3 to The Nature Conservancy',
      fontChoice: 'playfair',
    },
  ],
  memorial: [
    {
      id: 'mem-peaceful-white',
      occasion: 'memorial',
      name: 'Peaceful White',
      tag: 'White & Silver',
      bg: '#ffffff',
      headerBg: '#f7f5f2',
      ink: '#3a3a3a',
      inkSoft: '#5a5a5a',
      accent: '#8a8a8a',
      accentSoft: '#ececea',
      tagBg: '#ececea',
      tagColor: '#3a3a3a',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'monogram',
      headlineText: 'In Loving Memory',
      font: 'serifClassic',
      greeting: 'Dear Friend,',
      body: 'Your kindness during this time meant so much…',
      donation: '$4 to Hospice Foundation',
      fontChoice: 'playfair',
    },
    {
      id: 'mem-soft-memorial',
      occasion: 'memorial',
      name: 'Soft Memorial',
      tag: 'Lavender & Grey',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #f0eef8 0%, #d5cfe6 100%)',
      ink: '#4a3d6e',
      inkSoft: '#5a4d7e',
      accent: '#7a6da5',
      accentSoft: '#f0eef8',
      tagBg: '#f0eef8',
      tagColor: '#4a3d6e',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'botanical',
      headlineText: 'With Heartfelt Thanks',
      font: 'serifItalic',
      greeting: 'Dear Friend,',
      body: 'Your sympathy has been a comfort…',
      donation: '$4 to American Cancer Society',
      fontChoice: 'playfair',
    },
    {
      id: 'mem-golden-memory',
      occasion: 'memorial',
      name: 'Golden Memory',
      tag: 'Gold & Ivory',
      bg: '#fffdf8',
      headerBg: '#faf6ef',
      ink: '#2d2420',
      inkSoft: '#5a4f44',
      accent: '#c9a96e',
      accentSoft: '#f5efe2',
      tagBg: '#f5efe2',
      tagColor: '#8a7340',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'ornamentFrame',
      headlineText: 'In Cherished Memory',
      font: 'serifItalic',
      greeting: 'Dear Friend,',
      body: 'Thank you for honoring their memory…',
      donation: '$4 to Alzheimer\'s Association',
      fontChoice: 'playfair',
    },
    {
      id: 'mem-natures-rest',
      occasion: 'memorial',
      name: "Nature's Rest",
      tag: 'Sage & White',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #eef2e8 0%, #c5d4bc 100%)',
      ink: '#3d5a3a',
      inkSoft: '#4f6649',
      accent: '#5e7a5a',
      accentSoft: '#eef2e8',
      tagBg: '#eef2e8',
      tagColor: '#3d5a3a',
      donationBg: '#f5efe2',
      donationColor: '#8a7340',
      headerStyle: 'botanical',
      headlineText: 'With Quiet Gratitude',
      font: 'serifScript',
      greeting: 'Dear Friend,',
      body: 'Your kind words brought us peace…',
      donation: '$4 to The Nature Conservancy',
      fontChoice: 'playfair',
    },
  ],
  charity: [
    {
      id: 'charity-hope-green',
      occasion: 'charity',
      name: 'Hope Green',
      tag: 'Green & White',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #eaf4ec 0%, #b8d6bd 100%)',
      ink: '#2f5a3a',
      inkSoft: '#456a4a',
      accent: '#3d7a4a',
      accentSoft: '#eaf4ec',
      tagBg: '#eaf4ec',
      tagColor: '#2f5a3a',
      donationBg: '#f5efe2',
      donationColor: '#8a7340',
      headerStyle: 'botanical',
      headlineText: 'A Note of Hope',
      font: 'serifScript',
      greeting: 'Dear Friend,',
      body: 'Your generosity gives others a fresh start…',
      donation: '$3 to chosen cause',
      fontChoice: 'playfair',
    },
    {
      id: 'charity-giving-heart',
      occasion: 'charity',
      name: 'Giving Heart',
      tag: 'Warm Red & Cream',
      bg: '#fffdf8',
      headerBg: 'linear-gradient(180deg, #fbeae6 0%, #e8a89c 100%)',
      ink: '#8a2e2a',
      inkSoft: '#6b3835',
      accent: '#b8453d',
      accentSoft: '#fbeae6',
      tagBg: '#fbeae6',
      tagColor: '#8a2e2a',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'ornamentFrame',
      headlineText: 'From the Heart',
      font: 'serifItalic',
      greeting: 'Dear Friend,',
      body: 'Your kindness warms more lives than you know…',
      donation: '$3 to chosen cause',
      fontChoice: 'playfair',
    },
    {
      id: 'charity-community-blue',
      occasion: 'charity',
      name: 'Community Blue',
      tag: 'Blue & White',
      bg: '#ffffff',
      headerBg: 'linear-gradient(180deg, #eaf2fb 0%, #b8d0ee 100%)',
      ink: '#1f4a7a',
      inkSoft: '#3d5a7e',
      accent: '#2c6ab0',
      accentSoft: '#eaf2fb',
      tagBg: '#eaf2fb',
      tagColor: '#1f4a7a',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'wave',
      headlineText: 'Stronger Together',
      font: 'sansCaps',
      greeting: 'Dear Supporter,',
      body: 'Together we lift our community higher…',
      donation: '$3 to chosen cause',
      fontChoice: 'inter',
    },
    {
      id: 'charity-grateful-gold',
      occasion: 'charity',
      name: 'Grateful Gold',
      tag: 'Gold & Green',
      bg: '#fffdf8',
      headerBg: 'linear-gradient(180deg, #faf3e0 0%, #d8c179 100%)',
      ink: '#6b5418',
      inkSoft: '#8a7340',
      accent: '#c9a14a',
      accentSoft: '#faf3e0',
      tagBg: '#faf3e0',
      tagColor: '#6b5418',
      donationBg: '#eaf4ec',
      donationColor: '#2f5a3a',
      headerStyle: 'starburst',
      headlineText: 'Forever Grateful',
      font: 'serifClassic',
      greeting: 'Dear Friend,',
      body: 'Your gift made a lasting difference…',
      donation: '$3 to chosen cause',
      fontChoice: 'playfair',
    },
  ],
};

/* ---------- Header art renderers (color-driven) ---------- */
const HeaderArt: React.FC<{ design: Design }> = ({ design }) => {
  const { headerStyle, accent, ink, headerBg, headlineText, font } = design;

  // Determine if header bg is dark to invert headline color
  const isDarkBg = headerBg.includes('#1') || headerBg.includes('#2') || headerBg.includes('1a1a1a');
  const headlineColor = isDarkBg ? (accent.startsWith('#c') || accent.startsWith('#d') ? accent : '#ffffff') : ink;

  const fontStyle: React.CSSProperties =
    font === 'serifScript'
      ? { fontFamily: "'Dancing Script', cursive", fontSize: '40px', letterSpacing: '0.02em' }
      : font === 'serifItalic'
      ? { fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '28px', fontWeight: 500, letterSpacing: '0.02em' }
      : font === 'sansCaps'
      ? { fontFamily: "'Inter', sans-serif", fontSize: '14px', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 400 }
      : { fontFamily: "'Playfair Display', Georgia, serif", fontSize: '30px', fontWeight: 500, letterSpacing: '0.01em' };

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: '220px', background: headerBg }}
    >
      {/* Background art per style */}
      {headerStyle === 'botanical' && (
        <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full opacity-90" fill="none" strokeLinecap="round">
          <path d="M30 100 C 60 80, 90 70, 170 30" stroke={accent} strokeOpacity="0.5" strokeWidth="0.9" />
          <path d="M70 78 C 64 72, 64 66, 70 64 C 74 68, 74 74, 70 78 Z" fill={accent} opacity="0.55" />
          <path d="M105 60 C 99 54, 99 48, 105 46 C 109 50, 109 56, 105 60 Z" fill={accent} opacity="0.55" />
          <path d="M140 44 C 134 38, 134 32, 140 30 C 144 34, 144 40, 140 44 Z" fill={accent} opacity="0.55" />
          {[60, 100, 150].map((cx, i) => (
            <g key={i} transform={`translate(${cx} ${[70, 50, 32][i]})`}>
              <circle cx="0" cy="0" r="6" fill={accent} opacity="0.85" />
              <circle cx="0" cy="0" r="3" fill={ink} opacity="0.5" />
            </g>
          ))}
        </svg>
      )}

      {headerStyle === 'monogram' && (
        <>
          <div
            className="absolute"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '9999px',
              border: `1px solid ${isDarkBg ? 'rgba(255,255,255,0.5)' : accent}`,
              top: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: isDarkBg ? '#ffffff' : ink,
                fontSize: '22px',
                letterSpacing: '0.05em',
              }}
            >
              TY
            </span>
          </div>
          <span className="text-center px-4 absolute" style={{ ...fontStyle, color: headlineColor, top: '128px' }}>
            {headlineText}
          </span>
        </>
      )}

      {headerStyle === 'starburst' && (
        <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full opacity-80" fill="none" strokeLinecap="round">
          <g stroke={accent} strokeOpacity="0.55" strokeWidth="0.7">
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i / 16) * Math.PI * 2;
              const x1 = 100 + Math.cos(angle) * 18;
              const y1 = 60 + Math.sin(angle) * 18;
              const x2 = 100 + Math.cos(angle) * 50;
              const y2 = 60 + Math.sin(angle) * 50;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </g>
          <circle cx="100" cy="60" r="14" fill={accent} fillOpacity="0.6" />
        </svg>
      )}

      {headerStyle === 'confetti' && (
        <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full" fill="none">
          {[
            [25, 30], [60, 22], [150, 18], [170, 50], [40, 60], [90, 40],
            [140, 78], [30, 90], [170, 95], [80, 100], [120, 18], [55, 105],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 3.2 : 2.2} fill={i % 2 === 0 ? accent : ink} fillOpacity="0.55" />
          ))}
        </svg>
      )}

      {headerStyle === 'starOfDavid' && (
        <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full" fill="none">
          <g transform="translate(100 60)" stroke={accent} strokeOpacity="0.85" strokeWidth="1.2" strokeLinejoin="round" fill="none">
            <polygon points="0,-26 22.5,13 -22.5,13" />
            <polygon points="0,26 22.5,-13 -22.5,-13" />
          </g>
          <circle cx="100" cy="60" r="40" fill="none" stroke={accent} strokeOpacity="0.25" />
        </svg>
      )}

      {headerStyle === 'ornamentFrame' && (
        <>
          {[
            { top: 18, left: 18, borders: 'tl' },
            { top: 18, right: 18, borders: 'tr' },
            { bottom: 18, left: 18, borders: 'bl' },
            { bottom: 18, right: 18, borders: 'br' },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: (c as any).top,
                bottom: (c as any).bottom,
                left: (c as any).left,
                right: (c as any).right,
                width: '22px',
                height: '22px',
                borderTop: c.borders.includes('t') ? `1px solid ${accent}` : undefined,
                borderBottom: c.borders.includes('b') ? `1px solid ${accent}` : undefined,
                borderLeft: c.borders.includes('l') ? `1px solid ${accent}` : undefined,
                borderRight: c.borders.includes('r') ? `1px solid ${accent}` : undefined,
              }}
            />
          ))}
          <div className="flex flex-col items-center">
            <div style={{ width: '70px', height: '1px', backgroundColor: accent, marginBottom: '14px' }} />
            <span className="text-center px-4" style={{ ...fontStyle, color: headlineColor, whiteSpace: 'nowrap' }}>
              {headlineText}
            </span>
            <div style={{ width: '70px', height: '1px', backgroundColor: accent, marginTop: '14px' }} />
          </div>
        </>
      )}

      {headerStyle === 'wave' && (
        <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full" fill="none">
          <path d="M0 80 Q 50 60 100 78 T 200 70" stroke={accent} strokeOpacity="0.55" strokeWidth="1.2" fill="none" />
          <path d="M0 95 Q 50 78 100 92 T 200 86" stroke={accent} strokeOpacity="0.35" strokeWidth="1" fill="none" />
        </svg>
      )}

      {headerStyle === 'dotsField' && (
        <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full" fill="none">
          <defs>
            <pattern id={`dots-${design.id}`} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.9" fill={accent} fillOpacity="0.35" />
            </pattern>
          </defs>
          <rect width="200" height="120" fill={`url(#dots-${design.id})`} />
        </svg>
      )}

      {/* Headline text (skip for monogram + ornamentFrame which place their own) */}
      {headerStyle !== 'monogram' && headerStyle !== 'ornamentFrame' && (
        <span
          className="relative z-10 text-center px-4"
          style={{ ...fontStyle, color: headlineColor, lineHeight: 1.1 }}
        >
          {headlineText}
        </span>
      )}
    </div>
  );
};

/* ---------- Page ---------- */
const occasionLabels: Record<OccasionId, string> = {
  wedding: 'Wedding',
  baby: 'Baby',
  graduation: 'Graduation',
  birthday: 'Birthday',
  mitzvah: 'Bar / Bat Mitzvah',
  corporate: 'Corporate',
  general: 'General Thank You',
  memorial: 'Memorial',
  charity: 'Charity',
};

export default function CreateCardStep2() {
  const navigate = useNavigate();
  const { cardData, updateCardData, setCurrentStep } = useCardWizard();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);

  const occasion = (cardData.occasion as OccasionId | null) || null;

  // Guard: if the user lands on Step 2 without an occasion (e.g. after an
  // auth redirect or by deep-linking), send them back to Step 1 so they
  // never see a mismatched/fallback design set.
  useEffect(() => {
    if (!occasion) {
      navigate('/create-card/step1', { replace: true });
    }
  }, [occasion, navigate]);

  const designs = useMemo(() => {
    if (!occasion) return DESIGN_SETS.general;
    return DESIGN_SETS[occasion] || DESIGN_SETS.general;
  }, [occasion]);

  const handleContinue = () => {
    if (!selectedId) {
      toast.error('Please choose a design');
      return;
    }
    const design = designs.find((d) => d.id === selectedId);
    if (!design) return;

    updateCardData({
      templateId: design.id,
      colorPalette: {
        theme: design.id,
        name: design.name,
        tag: design.tag,
        bg: design.bg,
        headerBg: design.headerBg,
        ink: design.ink,
        inkSoft: design.inkSoft,
        accent: design.accent,
        accentSoft: design.accentSoft,
        tagBg: design.tagBg,
        tagColor: design.tagColor,
        donationBg: design.donationBg,
        donationColor: design.donationColor,
        headerStyle: design.headerStyle,
        headlineText: design.headlineText,
        font: design.font,
      },
      fontChoice: design.fontChoice,
    });
    setCurrentStep(3);
    navigate('/create-card/step3');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf7f2' }}>
      <ProgressBar currentStep={2} totalSteps={7} stepNames={STEP_NAMES} />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8 pb-32">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1
            className="text-4xl md:text-5xl mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2a2622' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Thank You Designs for your {occasion ? occasionLabels[occasion] : 'Occasion'}
          </motion.h1>
          <motion.p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ color: '#6b6259' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Hand-picked styles to match the moment. You'll customize the details next.
          </motion.p>
        </div>

        {/* Back link */}
        <button
          onClick={() => navigate('/create-card/step1')}
          className="inline-flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-70"
          style={{ color: '#8a8079' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to occasions
        </button>

        {/* Design grid — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {designs.map((design, index) => {
            const isSelected = selectedId === design.id;
            return (
              <motion.button
                key={design.id}
                type="button"
                onClick={() => setSelectedId(design.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="group relative text-left rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: design.bg,
                  border: isSelected ? '2px solid #c17b8a' : '1px solid #ede8e3',
                  boxShadow: isSelected
                    ? '0 16px 44px rgba(193, 123, 138, 0.22)'
                    : '0 10px 40px -12px rgba(45, 36, 32, 0.12)',
                }}
              >
                {isSelected && (
                  <div
                    className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center shadow-md"
                    style={{ backgroundColor: '#c17b8a' }}
                  >
                    <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                )}

                <HeaderArt design={design} />

                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: design.tagBg, color: design.tagColor }}
                    >
                      {design.name}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                      style={{ backgroundColor: design.donationBg, color: design.donationColor }}
                    >
                      💚 {design.donation}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: design.ink,
                      fontSize: '16px',
                    }}
                  >
                    {design.greeting}
                  </p>
                  <p
                    className="mt-1 text-sm leading-relaxed line-clamp-1"
                    style={{ color: design.inkSoft, opacity: 0.85 }}
                  >
                    {design.body}
                  </p>
                  <div className="mt-5 flex items-center gap-2">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewId(design.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          setPreviewId(design.id);
                        }
                      }}
                      className="flex-1 py-2.5 rounded-md text-sm font-medium text-center cursor-pointer transition-all duration-200 hover:brightness-105"
                      style={{
                        backgroundColor: '#ffffff',
                        color: design.ink,
                        border: `1px solid ${design.accent}`,
                      }}
                    >
                      Preview
                    </div>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(design.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedId(design.id);
                        }
                      }}
                      className="flex-1 py-2.5 rounded-md text-sm font-semibold text-center cursor-pointer transition-all duration-200 hover:brightness-110 shadow-sm"
                      style={{ backgroundColor: '#c17b8a', color: '#ffffff' }}
                      aria-label={`Select ${design.name}`}
                    >
                      {isSelected ? '✓ Selected' : 'Select →'}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Full-screen preview modal */}
      <AnimatePresence>
        {previewId && (() => {
          const design = designs.find((d) => d.id === previewId);
          if (!design) return null;
          return (
            <motion.div
              key="preview-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
              style={{ backgroundColor: 'rgba(45, 36, 32, 0.72)', backdropFilter: 'blur(6px)' }}
              onClick={() => setPreviewId(null)}
              role="dialog"
              aria-modal="true"
              aria-label={`Preview of ${design.name}`}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 24, stiffness: 260 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl"
                style={{ backgroundColor: design.bg }}
              >
                {/* Close */}
                <button
                  type="button"
                  onClick={() => setPreviewId(null)}
                  aria-label="Close preview"
                  className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full flex items-center justify-center bg-white/90 hover:bg-white shadow-md transition-all hover:scale-105"
                  style={{ color: '#2d2420' }}
                >
                  <X className="w-5 h-5" strokeWidth={2.25} />
                </button>

                {/* Header art */}
                <HeaderArt design={design} />

                {/* Body */}
                <div className="p-7 md:p-9">
                  <div className="flex items-center justify-between gap-2 mb-5 flex-wrap">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: design.tagBg, color: design.tagColor }}
                    >
                      {design.name}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                      style={{ backgroundColor: design.donationBg, color: design.donationColor }}
                    >
                      💚 {design.donation}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: design.ink,
                      fontSize: '20px',
                    }}
                  >
                    {design.greeting}
                  </p>

                  <p
                    className="mt-3 leading-relaxed"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: design.inkSoft,
                      fontSize: '15px',
                      opacity: 0.92,
                    }}
                  >
                    {design.body} Your kindness, your presence, and your generosity made this moment one we'll carry with us forever. We are endlessly grateful to have you in our lives.
                  </p>

                  <p
                    className="mt-6"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: design.ink,
                      fontSize: '16px',
                      fontStyle: 'italic',
                    }}
                  >
                    With love,
                  </p>

                  {/* Charity donation badge */}
                  <div
                    className="mt-7 rounded-2xl p-5 text-center"
                    style={{ backgroundColor: design.donationBg, color: design.donationColor }}
                  >
                    <p className="text-xs uppercase tracking-wider mb-1 opacity-80">
                      A Gift in Your Honor
                    </p>
                    <p className="text-base font-medium">
                      💚 {design.donation}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => setPreviewId(null)}
                      className="flex-1 py-3 rounded-full text-sm font-medium border transition-all hover:bg-black/5"
                      style={{ borderColor: '#ede8e3', color: '#6b6259' }}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(design.id);
                        setPreviewId(null);
                      }}
                      className="flex-1 py-3 rounded-full text-sm font-medium text-white transition-all hover:scale-[1.02]"
                      style={{
                        backgroundColor: design.accent,
                        boxShadow: `0 6px 18px ${design.accent}55`,
                      }}
                    >
                      Select This Design
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Sticky footer */}
      {selectedId && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(250, 247, 242, 0.92)',
            borderColor: '#ede8e3',
          }}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <p className="text-sm" style={{ color: '#6b6259' }}>
              Beautiful choice — let's customize it.
            </p>
            <button
              onClick={handleContinue}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: '#c17b8a',
                boxShadow: '0 6px 18px rgba(193, 123, 138, 0.35)',
              }}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
