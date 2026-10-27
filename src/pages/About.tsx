import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';

const Section: React.FC<{ heading: string; children: React.ReactNode }> = ({ heading, children }) => (
  <section>
    <h2 className="text-2xl text-foreground mb-3">{heading}</h2>
    <div className="space-y-4">{children}</div>
  </section>
);

const About = () => (
  <PageLayout
    title="About"
    subtitle="Why we built a kinder way to say thank you."
  >
    <Section heading="Our story">
      <p>
        Thank You for Thank You started with a simple observation: the moments that matter most —
        weddings, new babies, graduations, milestones — end with a pile of gifts and a long list of
        people to thank. The gratitude is real, but the process is overwhelming.
      </p>
      <p>
        We wanted to make that last step feel as warm as the occasion itself. So we built a way to
        design one beautiful card, write one heartfelt message, and send it to everyone who
        mattered — without losing the personal touch.
      </p>
    </Section>

    <Section heading="What we do">
      <p>
        Our card builder walks you through six gentle steps: choose your occasion, pick a design,
        customize the details, add your guest list, choose a cause, and review. One card design
        sends to everyone on your list, each addressed personally.
      </p>
      <p>
        Every card can also carry a small donation to a charity you choose, so your gratitude
        ripples a little further.
      </p>
    </Section>

    <Section heading="What we believe">
      <p>
        Gratitude shouldn't be a chore. Good design should feel calm, not loud. And saying thank
        you should take minutes, not weekends.
      </p>
      <p>
        We're just getting started, and we're glad you're here.
      </p>
    </Section>

    <div className="pt-4">
      <Link
        to="/create-card/step1"
        className="inline-flex items-center text-primary hover:underline font-medium"
      >
        Start your first card →
      </Link>
    </div>
  </PageLayout>
);

export default About;
