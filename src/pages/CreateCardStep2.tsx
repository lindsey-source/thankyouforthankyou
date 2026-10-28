import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, X, Heart } from "lucide-react";
import { AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';
import { HeaderArt } from '@/components/CardDesigner/HeaderArt';
import type { Design, HeaderStyle, FontFamily, OccasionId } from '@/components/CardDesigner/designTypes';
import { LiveCardPreview, coupleInitials } from '@/components/CardDesigner/LiveCardPreview';
import { resolveBabyDetails } from '@/lib/babyDetails';

const STEP_NAMES = [
  'Choose Occasion',
  'Pick Your Style',
  'Customize Design',
  'Write Your Message',
  'Choose Your Cause',
  'Add Finishing Touches',
  'Preview & Send',
];

/* Design schema, HeaderStyle, FontFamily, OccasionId are imported from designTypes. */

/* ---------- Per-occasion design sets (3-4 each) ---------- */
export const DESIGN_SETS: Record<OccasionId, Design[]> = {
  wedding: [
    {
      id: 'wedding-rose-garden',
      occasion: 'wedding',
      name: 'Rose Garden',
      tag: 'Watercolor Peonies',
      bg: '#ffffff',
      headerBg: '#fbf7ef',
      ink: '#7a3744',
      inkSoft: '#5d4045',
      accent: '#c9a96e',
      accentSoft: '#f5ede9',
      tagBg: '#f5ede9',
      tagColor: '#8b4a5a',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'roseStem',
      headlineText: 'Thank You',
      font: 'serifScript',
      greeting: 'Dear Aunt Rachel,',
      body: 'Thank you for celebrating with us. Having you there made our wedding day even more beautiful.',
      donation: '$4 to Rainforest Alliance',
      fontChoice: 'dancing',
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
      headerStyle: 'ivoryFrame',
      headlineText: 'Thank You',
      font: 'serifClassic',
      greeting: 'Dear Grandma & Grandpa,',
      body: 'Thank you for celebrating with us. We are so grateful for your love and support.',
      donation: '$4 to UNICEF',
      fontChoice: 'playfair',
    },
    {
      id: 'wedding-garden-party',
      occasion: 'wedding',
      name: 'Marble & Gold',
      tag: 'White Marble & Gold Foil',
      bg: '#ffffff',
      headerBg: '#ffffff',
      ink: '#2d2420',
      inkSoft: '#6b5e4a',
      accent: '#c9a96e',
      accentSoft: '#f5efe2',
      tagBg: '#f5efe2',
      tagColor: '#8a7340',
      donationBg: '#f5ede9',
      donationColor: '#8b4a5a',
      headerStyle: 'gardenLeaves',
      headlineText: 'Thank You',
      font: 'serifClassic',
      greeting: 'Dear Sophie,',
      body: 'Sharing our day with you was a joy. Thank you for celebrating with us.',
      donation: '$4 to The Nature Conservancy',
      fontChoice: 'playfair',
    },
    {
      id: 'wedding-timeless',
      occasion: 'wedding',
      name: 'Timeless',
      tag: 'Navy & Gold',
      bg: '#ffffff',
      headerBg: '#1e2a44',
      ink: '#2d2420',
      inkSoft: '#5a5049',
      accent: '#c9a96e',
      accentSoft: '#ececea',
      tagBg: '#ececea',
      tagColor: '#1e2a44',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'decoFrame',
      headlineText: 'Thank You',
      font: 'serifClassic',
      greeting: 'Dear friends,',
      body: 'Your presence made our day complete. Thank you for celebrating with us.',
      donation: '$4 to Doctors Without Borders',
      fontChoice: 'playfair',
    },
  ],
  baby: [
    {
      id: 'baby-wildflower-sage',
      occasion: 'baby',
      name: 'Little Star',
      tag: 'Moon & Gold',
      bg: 'hsl(var(--baby-paper))',
      headerBg: 'hsl(var(--baby-twilight))',
      ink: 'hsl(var(--baby-ink))',
      inkSoft: 'hsl(var(--muted-foreground))',
      accent: 'hsl(var(--stationery-gold))',
      accentSoft: 'hsl(var(--brand-cream-deep))',
      tagBg: 'hsl(var(--brand-cream-deep))',
      tagColor: 'hsl(var(--brand-dark))',
      donationBg: '#f5ede9',
      donationColor: '#8b4a5a',
      headerStyle: 'babyMoon',
      headlineText: 'Welcome, Little Star',
      font: 'serifClassic',
      greeting: 'Dear Sarah,',
      body: 'Thank you for welcoming our little one with so much love. Your kindness lights up these first days for our family.',
      donation: '$3 to UNICEF',
      fontChoice: 'playfair',
    },
    {
      id: 'baby-soft-blush',
      occasion: 'baby',
      name: 'Watercolor Wash',
      tag: 'Blush, Peach & Sage',
      bg: 'hsl(var(--baby-paper))',
      headerBg: 'hsl(var(--baby-paper))',
      ink: 'hsl(var(--baby-ink))',
      inkSoft: 'hsl(var(--muted-foreground))',
      accent: 'hsl(var(--stationery-gold))',
      accentSoft: 'hsl(var(--brand-cream-deep))',
      tagBg: 'hsl(var(--brand-cream-deep))',
      tagColor: 'hsl(var(--brand-dark))',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'babyWash',
      headlineText: 'Welcome, Little One',
      font: 'serifClassic',
      greeting: 'Dear Aunt Mary,',
      body: 'Thank you for the sweet gift and the warm wishes. Our newest arrival is already surrounded by so much love.',
      donation: '$3 to March of Dimes',
      fontChoice: 'playfair',
    },
    {
      id: 'baby-sky-blue',
      occasion: 'baby',
      name: 'Modern Minimal',
      tag: 'Quiet Cream',
      bg: 'hsl(var(--baby-paper))',
      headerBg: 'hsl(var(--baby-paper))',
      ink: 'hsl(var(--baby-ink))',
      inkSoft: 'hsl(var(--muted-foreground))',
      accent: 'hsl(var(--stationery-gold))',
      accentSoft: 'hsl(var(--brand-cream-deep))',
      tagBg: 'hsl(var(--brand-cream-deep))',
      tagColor: 'hsl(var(--brand-dark))',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'babyMinimal',
      headlineText: 'Lily',
      font: 'serifClassic',
      greeting: 'Dear Grandma,',
      body: 'Thank you for celebrating our baby with us. Your thoughtfulness means the world to our growing family.',
      donation: '$3 to Save the Children',
      fontChoice: 'playfair',
    },
    {
      id: 'baby-sunshine',
      occasion: 'baby',
      name: 'Over the Rainbow',
      tag: 'Watercolor Rainbow',
      bg: 'hsl(var(--baby-paper))',
      headerBg: 'hsl(var(--baby-paper))',
      ink: 'hsl(var(--baby-ink))',
      inkSoft: 'hsl(var(--muted-foreground))',
      accent: 'hsl(var(--stationery-gold))',
      accentSoft: 'hsl(var(--brand-cream-deep))',
      tagBg: 'hsl(var(--brand-cream-deep))',
      tagColor: 'hsl(var(--brand-dark))',
      donationBg: '#eef2e8',
      donationColor: '#3d5a3a',
      headerStyle: 'babyRainbow',
      headlineText: 'Hello, Little Wonder',
      font: 'serifClassic',
      greeting: 'Dear Friends,',
      body: "Thank you for showering our little one with love. We can't wait for you to meet our baby soon.",
      donation: '$3 to UNICEF',
      fontChoice: 'playfair',
    },
  ],
  graduation: [
    {
      id: 'grad-golden-cap',
      occasion: 'graduation',
      name: "Gold Class",
      tag: "Navy & Gold",
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
      headlineText: "With Gratitude",
      font: 'serifItalic',
      greeting: "Dear Aunt Lisa,",
      body: "Thank you so much for the generous graduation gift and for cheering me on all these years. Your support means more than I can say.",
      donation: '$4 to Scholarship America',
      fontChoice: 'playfair',
    },
    {
      id: 'grad-classic-scholar',
      occasion: 'graduation',
      name: "Cap & Tassel",
      tag: "Watercolor",
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
      headlineText: "Thank You",
      font: 'serifClassic',
      greeting: "Dear Grandma,",
      body: "Thank you for the thoughtful gift and for always believing in me. I couldn't have reached graduation without your love and encouragement.",
      donation: '$4 to DonorsChoose',
      fontChoice: 'playfair',
    },
    {
      id: 'grad-celebration',
      occasion: 'graduation',
      name: "Bold Type",
      tag: "Color Block",
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
      headlineText: "Thank You",
      font: 'serifScript',
      greeting: "Dear Mr. & Mrs. Patel,",
      body: "Thank you for celebrating my graduation with me and for the generous gift. It's going straight toward my next chapter.",
      donation: '$4 to Khan Academy',
      fontChoice: 'playfair',
    },
    {
      id: 'grad-modern',
      occasion: 'graduation',
      name: "Laurel Crest",
      tag: "Cream & Gold",
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
      headlineText: "With Thanks",
      font: 'sansCaps',
      greeting: "Dear Coach Rivera,",
      body: "Thank you for your kind gift and for all the support along the way. I'm so grateful you were part of this journey.",
      donation: '$4 to Teach For America',
      fontChoice: 'inter',
    },
  ],
  birthday: [
    {
      id: 'bday-confetti-joy',
      occasion: 'birthday',
      name: "Golden Number",
      tag: "Cream & Gold",
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
      headlineText: "Thank You",
      font: 'serifScript',
      greeting: "Dear Olivia,",
      body: "Thank you for coming to my birthday party and for the wonderful present! I had so much fun celebrating with you.",
      donation: '$3 to Make-A-Wish',
      fontChoice: 'playfair',
    },
    {
      id: 'bday-golden',
      occasion: 'birthday',
      name: "Watercolor Balloons",
      tag: "Watercolor",
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
      headlineText: "Thanks for Celebrating",
      font: 'serifItalic',
      greeting: "Dear Sam,",
      body: "Thank you for coming to my party and for the thoughtful gift. It made my birthday extra special.",
      donation: '$3 to UNICEF',
      fontChoice: 'playfair',
    },
    {
      id: 'bday-floral',
      occasion: 'birthday',
      name: "Champagne Toast",
      tag: "Plum & Gold",
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
      headlineText: "Cheers & Thank You",
      font: 'serifScript',
      greeting: "Dear Rachel,",
      body: "Thank you for raising a glass with me and for the lovely gift. Celebrating with you made the evening unforgettable.",
      donation: '$3 to Rainforest Alliance',
      fontChoice: 'playfair',
    },
    {
      id: 'bday-bold-fun',
      occasion: 'birthday',
      name: "Color Block Pop",
      tag: "Paper Cut",
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
      headlineText: "Thank You",
      font: 'sansCaps',
      greeting: "Dear Ben,",
      body: "Thank you so much for coming to the party and for the awesome present. We loved celebrating together!",
      donation: '$3 to Boys & Girls Clubs',
      fontChoice: 'inter',
    },
  ],
  mitzvah: [
    {
      id: 'mitzvah-midnight-gala',
      occasion: 'mitzvah',
      name: "Bold Star",
      tag: "Navy",
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
      headlineText: "Thank You",
      font: 'serifItalic',
      greeting: "Dear Uncle David,",
      body: "Thank you for sharing my special day with me and for your generous gift. Having you there meant so much to me and my family.",
      donation: '$5 to Jewish Federation',
      fontChoice: 'playfair',
    },
    {
      id: 'mitzvah-star-of-david',
      occasion: 'mitzvah',
      name: "Tallit Stripes",
      tag: "White & Blue",
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
      headlineText: "With Thanks",
      font: 'serifClassic',
      greeting: "Dear Mrs. Levine,",
      body: "Thank you for celebrating this milestone with me and for your thoughtful gift. I'm so grateful you were there.",
      donation: '$5 to PJ Library',
      fontChoice: 'playfair',
    },
    {
      id: 'mitzvah-garden-blessing',
      occasion: 'mitzvah',
      name: "Mosaic Torah",
      tag: "Jewel Tones",
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
      headlineText: "Thank You",
      font: 'serifScript',
      greeting: "Dear Cousin Ari,",
      body: "Thank you for being part of my day and for the wonderful gift. Sharing it with you made it even more meaningful.",
      donation: '$5 to Hazon (Jewish Environmental)',
      fontChoice: 'playfair',
    },
    {
      id: 'mitzvah-regal-gold',
      occasion: 'mitzvah',
      name: "Watercolor Bloom",
      tag: "Watercolor & Gold",
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
      headlineText: "With Heartfelt Thanks",
      font: 'serifItalic',
      greeting: "Dear Grandma & Grandpa,",
      body: "Thank you for sharing my special day and for your loving gift. I'll always remember celebrating with you.",
      donation: '$5 to Jewish Family Services',
      fontChoice: 'playfair',
    },
  ],
  corporate: [
    {
      id: 'corp-gilded-note',
      occasion: 'corporate',
      name: "Clean Executive",
      tag: "White & Navy",
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
      headlineText: "Thank You",
      font: 'sansCaps',
      greeting: "Dear Jordan,",
      body: "Thank you for your partnership this year. Your trust and collaboration mean a great deal to our whole team.",
      donation: '$3 to local food bank',
      fontChoice: 'inter',
    },
    {
      id: 'corp-clean-modern',
      occasion: 'corporate',
      name: "Bold Geometric",
      tag: "Navy, Teal & Gold",
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
      headlineText: "With Appreciation",
      font: 'sansCaps',
      greeting: "Dear Team,",
      body: "Thank you for the dedication and care you bring every day. What we've built together this year is something to be proud of.",
      donation: '$3 to United Way',
      fontChoice: 'inter',
    },
    {
      id: 'corp-forest-pro',
      occasion: 'corporate',
      name: "Night Sky",
      tag: "Navy & Gold",
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
      headlineText: "Thank You",
      font: 'serifClassic',
      greeting: "Dear Ms. Chen,",
      body: "Thank you for choosing to work with us. It has been a genuine pleasure, and we look forward to everything ahead.",
      donation: '$3 to The Nature Conservancy',
      fontChoice: 'playfair',
    },
    {
      id: 'corp-navy-exec',
      occasion: 'corporate',
      name: "Sketchbook",
      tag: "Kraft",
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
      headlineText: "Thanks a Million",
      font: 'sansCaps',
      greeting: "Dear Friends at Brightline,",
      body: "Thank you for being such a wonderful client. Your ideas and good humor make every project better.",
      donation: '$3 to American Red Cross',
      fontChoice: 'inter',
    },
  ],
  general: [
    {
      id: 'gen-classic-rose',
      occasion: 'general',
      name: "Big Type",
      tag: "Cream",
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
      headlineText: "Thank You",
      font: 'serifScript',
      greeting: "Dear Maria,",
      body: "Thank you so much for the beautiful gift. It was so thoughtful of you, and it truly made my week.",
      donation: '$3 to local charity',
      fontChoice: 'playfair',
    },
    {
      id: 'gen-elegant-cream',
      occasion: 'general',
      name: "Gilded Stripes",
      tag: "Blue & Gold",
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
      headlineText: "Thank You",
      font: 'serifItalic',
      greeting: "Dear Tom,",
      body: "Thank you for all your help with the move. I couldn't have done it without you, and I'm so grateful.",
      donation: '$3 to UNICEF',
      fontChoice: 'playfair',
    },
    {
      id: 'gen-modern-minimal',
      occasion: 'general',
      name: "Pressed Botanicals",
      tag: "Watercolor",
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
      headlineText: "With Thanks",
      font: 'sansCaps',
      greeting: "Dear Nina,",
      body: "Thank you for your kindness these past few weeks. Your thoughtfulness meant more than you know.",
      donation: '$3 to Doctors Without Borders',
      fontChoice: 'inter',
    },
    {
      id: 'gen-nature-thanks',
      occasion: 'general',
      name: "Doodle Thanks",
      tag: "Playful",
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
      headlineText: "Thanks So Much!",
      font: 'serifScript',
      greeting: "Dear Jess,",
      body: "Thank you for the sweet surprise! You always know how to brighten my day.",
      donation: '$3 to The Nature Conservancy',
      fontChoice: 'playfair',
    },
  ],
  memorial: [
    {
      id: 'mem-peaceful-white',
      occasion: 'memorial',
      name: "Quiet Cream",
      tag: "Cream",
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
      headlineText: "With Gratitude",
      font: 'serifClassic',
      greeting: "Dear friends,",
      body: "Thank you for your kindness and support during this difficult time. Your presence and kind words have meant so much to our family.",
      donation: '$4 to Hospice Foundation',
      fontChoice: 'playfair',
    },
    {
      id: 'mem-soft-memorial',
      occasion: 'memorial',
      name: "Evening Candle",
      tag: "Slate & Gold",
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
      headlineText: "With Heartfelt Thanks",
      font: 'serifItalic',
      greeting: "Dear Sarah,",
      body: "Thank you for holding us in your thoughts. Your support has been a quiet comfort to our family.",
      donation: '$4 to American Cancer Society',
      fontChoice: 'playfair',
    },
    {
      id: 'mem-golden-memory',
      occasion: 'memorial',
      name: "Olive Branch",
      tag: "Soft Grey",
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
      headlineText: "Thank You",
      font: 'serifItalic',
      greeting: "Dear Neighbors,",
      body: "Thank you for the meals, the cards, and the kindness you have shown us. We are deeply grateful.",
      donation: '$4 to Alzheimer\'s Association',
      fontChoice: 'playfair',
    },
    {
      id: 'mem-natures-rest',
      occasion: 'memorial',
      name: "Portrait Arch",
      tag: "Photo",
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
      headlineText: "Thank You",
      font: 'serifScript',
      greeting: "Dear Rabbi Stein,",
      body: "Thank you for helping us honor a life so dearly loved. Your care and support brought us real comfort.",
      donation: '$4 to The Nature Conservancy',
      fontChoice: 'playfair',
    },
  ],
  charity: [
    {
      id: 'charity-hope-green',
      occasion: 'charity',
      name: "Mission Minimal",
      tag: "White",
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
      headlineText: "Thank You",
      font: 'serifScript',
      greeting: "Dear Emily,",
      body: "Thank you for your generous gift. It will provide warm meals for families in our community this winter.",
      donation: '$3 to chosen cause',
      fontChoice: 'playfair',
    },
    {
      id: 'charity-giving-heart',
      occasion: 'charity',
      name: "Seedling Watercolor",
      tag: "Watercolor",
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
      headlineText: "Thank You for Growing Hope",
      font: 'serifItalic',
      greeting: "Dear Mark,",
      body: "Thank you for your donation. Your gift will help plant community gardens that feed neighbors for years to come.",
      donation: '$3 to chosen cause',
      fontChoice: 'playfair',
    },
    {
      id: 'charity-community-blue',
      occasion: 'charity',
      name: "Circle of Hands",
      tag: "Teal & Gold",
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
      headlineText: "Together, Thank You",
      font: 'sansCaps',
      greeting: "Dear Priya,",
      body: "Thank you for standing with us. Your gift brings tutoring and mentorship to young people who need it most.",
      donation: '$3 to chosen cause',
      fontChoice: 'inter',
    },
    {
      id: 'charity-grateful-gold',
      occasion: 'charity',
      name: "New Day",
      tag: "Watercolor",
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
      headlineText: "Thank You",
      font: 'serifClassic',
      greeting: "Dear David,",
      body: "Thank you for your generosity. Your gift will help families find safe housing and a fresh start.",
      donation: '$3 to chosen cause',
      fontChoice: 'playfair',
    },
  ],
};

/* HeaderArt is imported from shared module — see components/CardDesigner/HeaderArt.tsx */

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

  // Large live preview follows the selected design (first design until one is picked)
  const previewDesign = designs.find((d) => d.id === (previewId || selectedId)) || designs[0];
  const previewFonts =
    previewDesign?.fontChoice === 'dancing'
      ? { heading: "'Dancing Script', cursive", body: "'Inter', sans-serif" }
      : previewDesign?.fontChoice === 'inter'
        ? { heading: "'Inter', sans-serif", body: "'Inter', sans-serif" }
        : { heading: "'Playfair Display', Georgia, serif", body: "'Inter', sans-serif" };

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
      <ProgressBar currentStep={2} />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8 pb-32">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1
            className="text-4xl md:text-5xl mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2a2622' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
Pick Your Style
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

        <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-12 items-start">
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
                className="card-stationery group relative text-left rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: design.bg,
                  border: isSelected ? '2px solid #c17b8a' : '1px solid #ede8e3',
                  boxShadow: isSelected
                    ? '0 16px 44px rgba(193, 123, 138, 0.22)'
                    : '0 1px 2px rgba(45, 36, 32, 0.05), 0 10px 24px -16px rgba(45, 36, 32, 0.16)',
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

                <HeaderArt
                  design={design}
                  subtext={
                    design.occasion === 'wedding'
                      ? `${cardData.coupleNames?.trim() || 'Emma & James'} · ${cardData.weddingDate?.trim() || 'June 14, 2027'}`
                      : design.occasion === 'baby' ? resolveBabyDetails(cardData).titleLine : undefined
                  }
                  initials={design.occasion === 'wedding' ? coupleInitials(cardData.coupleNames) : undefined}
                />
                {design.occasion === 'wedding' && (
                  <div
                    className="absolute pointer-events-none z-[7]"
                    style={{ inset: '13px', border: '0.5px solid hsl(40 45% 62% / 0.5)', borderRadius: '6px' }}
                    aria-hidden="true"
                  />
                )}

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
                      <Heart className="inline h-3 w-3 mr-1" strokeWidth={1.5} />A gift in your name
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
                  {design.occasion === 'baby' && (
                    <p className="mt-3 text-sm text-foreground font-serif">With love,<br />{resolveBabyDetails(cardData).signOff}</p>
                  )}
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
                      {isSelected ? 'Selected' : 'Select'}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Large live preview — sticky on desktop, stacked below on phones */}
        {previewDesign && (
          <div className="mt-12 lg:mt-0 lg:sticky lg:top-24">
            <p
              className="text-xs uppercase tracking-[0.2em] text-center mb-4"
              style={{ color: '#8a9a82' }}
            >
              Your card, live
            </p>
            <LiveCardPreview
              palette={{
                primary: previewDesign.headerBg,
                secondary: previewDesign.bg,
                accent: previewDesign.accent,
                text: previewDesign.ink,
              }}
              fonts={previewFonts}
              designId={previewDesign.id}
              bg={previewDesign.bg}
              headerBg={previewDesign.headerBg}
              ink={previewDesign.ink}
              inkSoft={previewDesign.inkSoft}
              headerStyle={previewDesign.headerStyle}
              headlineText={previewDesign.headlineText}
              font={previewDesign.font}
              donationBg={previewDesign.donationBg}
              donationColor={previewDesign.donationColor}
              messageBody={previewDesign.body}
              charityName={previewDesign.donation}
              {...(previewDesign.occasion === 'wedding'
                ? { coupleNames: cardData.coupleNames, weddingDate: cardData.weddingDate }
                : {})}
              {...(previewDesign.occasion === 'baby'
                ? { babyName: cardData.babyName, babyDate: cardData.babyDate, parentsNames: cardData.parentsNames }
                : {})}
            />
            <p
              className="text-center text-sm mt-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#6b6259' }}
            >
              {previewDesign.name}
            </p>
          </div>
        )}
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
                className="card-stationery relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl"
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
                <HeaderArt
                  design={design}
                  subtext={
                    design.occasion === 'wedding'
                      ? `${cardData.coupleNames?.trim() || 'Emma & James'} · ${cardData.weddingDate?.trim() || 'June 14, 2027'}`
                      : design.occasion === 'baby' ? resolveBabyDetails(cardData).titleLine : undefined
                  }
                  initials={design.occasion === 'wedding' ? coupleInitials(cardData.coupleNames) : undefined}
                />

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
                      <Heart className="inline h-3 w-3 mr-1" strokeWidth={1.5} />A gift in your name
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
                    {design.body}
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
                  {design.occasion === 'baby' && (
                    <p className="mt-1 text-base text-foreground font-serif">{resolveBabyDetails(cardData).signOff}</p>
                  )}

                  {/* Charity donation badge */}
                  <div
                    className="mt-7 rounded-2xl p-5 text-center"
                    style={{ backgroundColor: design.donationBg, color: design.donationColor }}
                  >
                    <p className="text-xs uppercase tracking-wider mb-1 opacity-80">
                      A gift in your name
                    </p>
                    <p className="text-base font-medium">
                      <Heart className="inline h-3 w-3 mr-1" strokeWidth={1.5} />{design.donation}
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
