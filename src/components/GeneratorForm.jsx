import { useState } from 'react';

export default function GeneratorForm({ onGenerated }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
  const [form, setForm] = useState({
    title: '',
    goal: '',
    context: '',
    audience: '',
    tone: 'Professional',
    style: 'Step-by-step',
    format: 'Markdown',
    language: 'English',
    length: 'Medium',
    include_examples: true,
    variables: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const toArray = (value) => value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

  const generate = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        title: form.title || undefined,
        goal: form.goal,
        context: form.context || undefined,
        audience: form.audience || undefined,
        tone: form.tone || undefined,
        style: form.style || undefined,
        format: form.format || undefined,
        language: form.language || 'English',
        length: form.length || undefined,
        include_examples: form.include_examples,
        variables: toArray(form.variables),
        tags: toArray(form.tags),
      };
      const res = await fetch(`${baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to generate');
      const data = await res.json();
      onGenerated(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={generate} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
      {error && (
        <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 text-red-200 px-3 py-2 rounded">
          {error}
        </div>
      )}
      <input name="title" placeholder="Title (optional)" value={form.title} onChange={handleChange}
             className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/50" />
      <input required name="goal" placeholder="Goal (what do you want?)" value={form.goal} onChange={handleChange}
             className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/50" />
      <input name="context" placeholder="Context" value={form.context} onChange={handleChange}
             className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/50" />
      <input name="audience" placeholder="Audience" value={form.audience} onChange={handleChange}
             className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/50" />

      <div className="grid grid-cols-2 gap-3 md:col-span-2">
        <input name="tone" placeholder="Tone" value={form.tone} onChange={handleChange}
               className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/50" />
        <input name="style" placeholder="Style" value={form.style} onChange={handleChange}
               className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/50" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:col-span-2">
        <input name="format" placeholder="Output format" value={form.format} onChange={handleChange}
               className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/50" />
        <input name="language" placeholder="Language" value={form.language} onChange={handleChange}
               className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/50" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:col-span-2">
        <input name="length" placeholder="Length" value={form.length} onChange={handleChange}
               className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/50" />
        <input name="variables" placeholder="Variables (comma separated)" value={form.variables} onChange={handleChange}
               className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/50" />
      </div>

      <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange}
             className="md:col-span-2 bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/50" />

      <div className="md:col-span-2 flex gap-3">
        <button disabled={loading} type="submit" className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition disabled:opacity-60">
          {loading ? 'Generating...' : 'Generate' }
        </button>
      </div>
    </form>
  );
}
