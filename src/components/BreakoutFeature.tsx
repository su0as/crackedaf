interface BreakoutFeatureProps {
    title: string;
    description: string;
  }
  
  export function BreakoutFeature({ title, description }: BreakoutFeatureProps) {
    return (
      <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
        <h3 className="text-lg font-silkscreen mb-2 text-amber-400">{title}</h3>
        <p className="text-zinc-400">{description}</p>
      </div>
    );
  }