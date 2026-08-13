import React, { Suspense } from 'react';
import Hero from '../components/Hero';

const About = React.lazy(() => import('../components/About'));
const Projects = React.lazy(() => import('../components/Projects'));
const Skills = React.lazy(() => import('../components/Skills'));
const Achievements = React.lazy(() => import('../components/Achievements'));
const ResumeView = React.lazy(() => import('../components/ResumeView'));
const Contact = React.lazy(() => import('../components/Contact'));

const Loader: React.FC<{ text: string }> = ({ text }) => (
  <div className="py-12 text-center text-xs font-mono text-brand-text-muted">
    {text}
  </div>
);

export const Home: React.FC = () => {
  return (
    <div className="flex-1 w-full overflow-x-hidden">
      <Hero />

      <Suspense fallback={<Loader text="Loading About..." />}>
        <About />
      </Suspense>

      <Suspense fallback={<Loader text="Loading Projects..." />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<Loader text="Loading Skills..." />}>
        <Skills />
      </Suspense>

      <Suspense fallback={<Loader text="Loading Achievements..." />}>
        <Achievements />
      </Suspense>

      <Suspense fallback={<Loader text="Loading Resume..." />}>
        <ResumeView />
      </Suspense>

      <Suspense fallback={<Loader text="Loading Contact..." />}>
        <Contact />
      </Suspense>
    </div>
  );
};

export default Home;
