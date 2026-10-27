import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';

const Section: React.FC<{ heading: string; children: React.ReactNode }> = ({ heading, children }) => (
  <section>
    <h2 className="text-2xl text-foreground mb-3">{heading}</h2>
    <div className="space-y-4">{children}</div>
  </section>
);

const Privacy = () => (
  <PageLayout
    title="Privacy Policy"
    subtitle="The short, plain-language version of how we handle your information."
  >
    <Section heading="What we collect">
      <p>
        When you use Thank You for Thank You, we collect the information you give us directly:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Your account details, like your name and email address.</li>
        <li>The card content you create — messages, photos, and design choices.</li>
        <li>Your guest list, including names and contact details of the people you send cards to.</li>
        <li>Messages you send us through our help form.</li>
      </ul>
    </Section>

    <Section heading="How we use it">
      <p>We use your information only to run the service:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>To create, save, and send your cards.</li>
        <li>To process donations to the charities you choose.</li>
        <li>To respond when you ask us for help.</li>
        <li>To keep your account secure.</li>
      </ul>
      <p>
        We do not sell your personal information, and we do not use your guest list for anything
        other than sending your cards.
      </p>
    </Section>

    <Section heading="Who we share it with">
      <p>
        We share information only with the service providers that help us operate — for example,
        our hosting and storage providers — and only as much as they need to do their job. We may
        also share information if the law requires it.
      </p>
    </Section>

    <Section heading="Your choices">
      <p>
        You can update your account details at any time from your settings page. If you'd like to
        delete your account or ask a question about your data, reach out through our{' '}
        <Link to="/help" className="text-primary hover:underline">help page</Link> and we'll take
        care of it.
      </p>
    </Section>

    <Section heading="Changes to this policy">
      <p>
        If we change this policy in a way that matters, we'll let you know before the change takes
        effect. The current version is always on this page.
      </p>
    </Section>
  </PageLayout>
);

export default Privacy;
