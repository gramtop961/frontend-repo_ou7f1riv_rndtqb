import { useState } from 'react';
import { Bookmark, Copy, Save } from 'lucide-react';

export default function PromptCard({ data, onSave }) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(data.prompt || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const save = async () => {
    setSaving(true);
    await onSave({ title: data.title, prompt: data.prompt, tags: data.tags || [] });
    setSaving(false);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{data.title || 'Untitled prompt'}</h3>
        <div className="flex gap-2">
          <button onClick={copy} className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-sm">
            <Copy className="inline h-4 w-4 mr-1" /> {copied ? 'Copied' : 'Copy'}
          </button>
          <button onClick={save} className="px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-sm">
            <Save className="inline h-4 w-4 mr-1" /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      <pre className="mt-3 whitespace-pre-wrap text-blue-100/90 text-sm leading-6">{data.prompt}</pre>
      {data.tags && data.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {data.tags.map((t) => (
            <span key={t} className="text-xs bg-blue-500/20 border border-blue-500/30 rounded px-2 py-0.5">#{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}
