import type { BedStatus } from '../types/hospital';

type BedTileProps = {
  numero: string;
  status: BedStatus;
  ala: string;
  onClick?: () => void;
};

const bedStyles: Record<BedStatus, { background: string; border: string; text: string }> = {
  livre: { background: '#ecfdf5', border: '#86efac', text: '#166534' },
  ocupado: { background: '#fef2f2', border: '#fca5a5', text: '#991b1b' },
  limpeza: { background: '#f3f4f6', border: '#d1d5db', text: '#374151' },
  bloqueado: { background: '#f5f3ff', border: '#c4b5fd', text: '#5b21b6' },
};

export function BedTile({ numero, status, ala, onClick }: BedTileProps) {
  const style = bedStyles[status];

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: `1px solid ${style.border}`,
        background: style.background,
        color: style.text,
        borderRadius: 14,
        padding: '0.9rem 0.75rem',
        textAlign: 'left',
        cursor: 'pointer',
        minWidth: 120,
      }}
    >
      <div style={{ fontWeight: 800, marginBottom: 6 }}>Leito {numero}</div>
      <div style={{ fontSize: '0.74rem', opacity: 0.8 }}>{ala}</div>
      <div style={{ marginTop: 8, fontSize: '0.72rem', fontWeight: 700, textTransform: 'capitalize' }}>{status}</div>
    </button>
  );
}
