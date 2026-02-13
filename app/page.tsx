import { type Metadata } from 'next';
import { Hero, Pricing, Gallery, Faq, Contact } from '@/components/sections';
import Chatbot from '@/components/chatbot/chatbot';

export const metadata: Metadata = {
  title: 'Paul & Tev Shine Time',
  description:
    'All-purpose mobile cleaning service specializing in quality interior and exterior car detailing in the West Michigan area. Family-owned business in memory of Paul Williams.',
  keywords: [
    'car wash',
    'car detailing',
    'auto detailing',
    'mobile detailing',
    'interior detail',
    'exterior detail',
    'full detail',
    'vehicle cleaning',
    'ptshinetime',
    'paul & tev shine time',
  ],
  authors: [
    { name: 'Tevin Williams' },
    { name: 'Marques Smalley', url: 'https://marquessmalley.netlify.app/' },
  ],
  creator: 'Marques Smalley',
  publisher: 'Tevin Williams',
};

export default function Page() {
  return (
    <div className="">
      <Hero />
      <Pricing />
      <Gallery />
      <Faq />
      <Contact />
      <Chatbot />
    </div>
  );
}
