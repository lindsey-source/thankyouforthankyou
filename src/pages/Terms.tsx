import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';

const Section: React.FC<{ heading: string; children: React.ReactNode }> = ({ heading, children }) => (
  <section>
    <h2 className="text-2xl text-foreground mb-3">{heading}</h2>
    <div className="space-y-4">{children}</div>
  </section>
);

const Terms = () => (
  <PageLayout
    title="Terms of Service"
    subtitle="The ground rules for using Thank You for Thank You, in plain language."
  >
    <Section heading="The basics">
      <p>
        By using Thank You for Thank You, you agree to these terms. If you don't agree, please
        don't use the service. We've kept this short and readable on purpose — if anything is
        unclear, ask us before continuing.
      </p>
    </Section>

    <Section heading="Your account">
      <p>
        You're responsible for keeping your sign-in details private and for everything that
        happens under your account. Please give us accurate information when you sign up.
      </p>
    </Section>

    <Section heading="Your content">
      <p>
        The messages, photos, and guest lists you upload belong to you. By using the service, you
        give us permission to store and use that content only as needed to create and send your
        cards.
      </p>
      <p>
        You promise that you have the right to use what you upload — for example, that photos are
        yours or that you have permission to use them — and that your guest list is made up of
        people who would reasonably expect to hear from you.
      </p>
    </Section>

    <Section heading="Using the service fairly">
      <p>Please don't:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Send spam, harassment, or anything unlawful through our cards.</li>
        <li>Upload content that infringes someone else's rights.</li>
        <li>Try to break, probe, or misuse the service or its security.</li>
        <li>Use the service to collect information about other people without their knowledge.</li>
      </ul>
      <p>We may suspend accounts that break these rules.</p>
    </Section>

    <Section heading="Donations">
      <p>
        When you choose to add a donation to your cards, we pass it to the charity you selected.
        Donations are final once processed. We don't make any promises about how a charity uses
        funds — we encourage you to choose causes you know and trust.
      </p>
    </Section>

    <Section heading="The fine print, plainly">
      <p>
        We work hard to keep the service available and reliable, but we can't promise it will
        always be perfect or uninterrupted. To the extent the law allows, the service is provided
        "as is," and we're not liable for indirect losses that come from using it.
      </p>
      <p>
        We may update these terms from time to time. If the change is significant, we'll let you
        know. Continuing to use the service after a change means you accept the new terms.
      </p>
    </Section>

    <Section heading="Questions">
      <p>
        Anything unclear? Send us a note through our{' '}
        <Link to="/help" className="text-primary hover:underline">help page</Link> and a real
        person will read it.
      </p>
    </Section>
  </PageLayout>
);

export default Terms;
