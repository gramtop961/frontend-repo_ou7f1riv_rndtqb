import { useState } from 'react';
import Hero from './components/Hero';
import GeneratorForm from './components/GeneratorForm';
import PromptCard from './components/PromptCard';
import SavedList from './components/SavedList';

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
  const [result, setResult] = useState(null);

  const handleGenerated = (data) => setResult(data);

  const handleSave = async (payload) => {
    const res = await fetch(`${baseUrl}/api/prompts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to save');
    return await res.json();
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />

      <div className="relative z-10 container mx-auto px-6 -mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur">
            <h2 className="text-white text-xl font-semibold mb-4">Generate</h2>
            <GeneratorForm onGenerated={handleGenerated} />
            {result && (
              <div className="mt-6">
                <PromptCard data={result} onSave={handleSave} />
              </div>
            )}
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur">
            <h2 className="text-white text-xl font-semibold mb-4">Saved</h2>
            <SavedList />
          </div>
        </div>
      </div>

      <footer className="relative z-10 container mx-auto px-6 py-10 text-center text-white/50">
        Built with a playful, modern vibe
      </footer>
    </div>
  );
}

export default App
