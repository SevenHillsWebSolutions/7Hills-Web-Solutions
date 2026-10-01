export default function StatusBadge({ status, type = 'default' }) {
  if (!status) return null;

  const getStyle = () => {
    switch (status.toLowerCase()) {
      case 'new':
      case 'unread':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'contacted':
      case 'in progress':
      case 'planning':
      case 'design':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'development':
      case 'requirement received':
      case 'proposal sent':
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
      case 'testing':
      case 'client review':
      case 'revision':
      case 'review':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'deployment':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      case 'completed':
      case 'done':
      case 'approved':
      case 'converted':
      case 'published':
      case 'replied':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'rejected':
      case 'closed':
      case 'archived':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-white/10';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStyle()}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {status}
    </span>
  );
}
