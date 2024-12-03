import { BreakoutFeature } from '../components/BreakoutFeature';
import { WaitlistForm } from '../components/WaitlistForm';

const features = [
  {
    title: 'AI-POWERED FUNDING INSIGHTS',
    description: 'Get real-time insights into recently funded companies with our advanced AI analysis of funding rounds, market trends, and growth indicators.'
  },
  {
    title: 'BREAKOUT DETECTION',
    description: 'Our AI algorithms continuously monitor companies for signs of exponential growth and market disruption potential.'
  },
  {
    title: 'IMPACT ASSESSMENT',
    description: 'Advanced analysis of company influence and potential market impact using multi-dimensional AI evaluation.'
  }
];

export function Breakout() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-silkscreen bg-gradient-to-r from-amber-400 to-amber-500 text-transparent bg-clip-text">
          BREAKOUT AI
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Leverage advanced AI algorithms to discover the next breakout companies before they gain traction. 
          Our machine learning models analyze thousands of data points to identify high-potential opportunities.
        </p>
      </div>

      <WaitlistForm />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <BreakoutFeature
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </main>
  );
}