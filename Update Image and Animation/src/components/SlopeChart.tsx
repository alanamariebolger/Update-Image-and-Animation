import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const data = [
  { offset: 0, left: 0.2, right: 0.1 },
  { offset: 1, left: 0.6, right: 0.5 },
  { offset: 2, left: 0.9, right: 0.85 },
  { offset: 3, left: 0.7, right: 0.8 },
  { offset: 4, left: 0.3, right: 0.4 },
  { offset: 5, left: 0.1, right: 0.2 },
];

export function SlopeChart() {
  return (
    <div className="space-y-3">
      <h4 className="text-center text-gray-700">Slope Chart</h4>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <XAxis 
            dataKey="offset" 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <Line 
            type="monotone" 
            dataKey="left" 
            stroke="#3b82f6" 
            strokeWidth={2.5}
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="right" 
            stroke="#f97316" 
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
