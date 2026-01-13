import { Loader2, Download } from 'lucide-react';

interface ResponsePanelProps {
  title: string;
  content: string;
  isLoading?: boolean;
  height?: 'small' | 'large';
  showDownload?: boolean;
}

export function ResponsePanel({ title, content, isLoading = false, height = 'large', showDownload = false }: ResponsePanelProps) {
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={`h-full border border-purple-200 rounded-xl bg-white shadow-sm flex flex-col overflow-hidden`}>
      <div className="px-4 py-3 border-b border-purple-100 bg-gradient-to-r from-cyan-50 to-purple-50 flex items-center justify-between">
        <h3 className="text-sm text-gray-700">{title}</h3>
        {showDownload && content && (
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-400 to-purple-400 text-white rounded-lg hover:from-cyan-500 hover:to-purple-500 transition-all text-xs font-medium"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        )}
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
          </div>
        ) : content ? (
          <div className="text-sm text-gray-800 whitespace-pre-wrap">{content}</div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-sm">Waiting for response...</p>
          </div>
        )}
      </div>
    </div>
  );
}
