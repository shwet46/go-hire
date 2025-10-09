'use client';

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-r-lg transition-colors"
    >
      Copy
    </button>
  );
}
