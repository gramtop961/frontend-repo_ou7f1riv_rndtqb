import { useEffect, useState } from 'react';

export default function SavedList() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${baseUrl}/api/prompts`);
        const data = await res.json();
        setItems(data);
      } catch (e) {
        // ignore for now, empty state will show
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="text-white/70">Loading saved prompts...</div>;
  if (items.length === 0) return <div className="text-white/50">No saved prompts yet</div>;

  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it.id} className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white/90">
          <div className="font-semibold">{it.title}</div>
          <div className="text-xs text-white/60">{(it.tags || []).map((t) => `#${t}`).join(' ')}</div>
        </li>
      ))}
    </ul>
  );
}
