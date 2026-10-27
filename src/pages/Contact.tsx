import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Heart, ArrowRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const Contact = () => (
  <PageLayout
    title="Contact"
    subtitle="We read every message ourselves."
  >
    <section className="rounded-2xl border border-border/60 bg-card p-8 sm:p-10 shadow-soft">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-primary/10 p-3 shrink-0">
          <MessageSquare className="h-6 w-6 text-primary" strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="text-2xl text-foreground mb-3">Send us a message</h2>
          <p className="mb-4">
            The fastest way to reach us is the message form on our help page. Tell us what's on
            your mind — a question, a problem, an idea — and we'll get back to you.
          </p>
          <Link
            to="/help"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft hover:opacity-90 transition-opacity"
          >
            Go to the message form
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl text-foreground mb-3">Before you write</h2>
      <p>
        Many common questions — how campaigns work, guest lists, delivery timing, donations — are
        answered in the frequently asked questions on the{' '}
        <Link to="/help" className="text-primary hover:underline">help page</Link>. It might save
        you a wait.
      </p>
    </section>

    <section>
      <h2 className="text-2xl text-foreground mb-3">What to include</h2>
      <p>A few things that help us help you faster:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>The email address on your account, if you have one.</li>
        <li>What you were trying to do, and what happened instead.</li>
        <li>Which step of the card builder you were on, if relevant.</li>
      </ul>
    </section>

    <section className="flex items-center gap-3 text-muted-foreground">
      <Heart className="h-4 w-4 text-primary" strokeWidth={1.5} />
      <p className="text-sm">Thank you for taking the time to write — it genuinely helps us improve.</p>
    </section>
  </PageLayout>
);

export default Contact;
