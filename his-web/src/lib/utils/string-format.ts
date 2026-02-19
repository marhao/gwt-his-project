// ============================================
// String Utility Functions
// ============================================

// Format CID for display
export function formatCid(cid: string): string {
    if (!cid || cid.length !== 13) return cid;

    return `${cid.slice(0, 1)}-${cid.slice(1, 5)}-${cid.slice(5, 10)}-${cid.slice(10, 12)}-${cid.slice(12)}`;
}