// ============================================
// String Utility Functions
// ============================================

import { LookupItem, SubdistrictLookup } from "../api";

// Format CID for display
export function formatCid(cid: string): string {
    if (!cid || cid.length !== 13) return cid;

    return `${cid.slice(0, 1)}-${cid.slice(1, 5)}-${cid.slice(5, 10)}-${cid.slice(10, 12)}-${cid.slice(12)}`;
}

export function extractAddressFromSmartCard(
    addrStr: string
): {addrPart: string, mooPart: string, tmbPart: string, ampPart: string, chwPart: string} | null {
    if (addrStr === '') return null;

    /** ตัดเลขที่/หมู่ กับ ตำบล/อำเภอ/จังหวัด */
    const [address, subDistrict] = addrStr.split('####');
    const [addressNo, moo] = address.split('#');
    const [tmbName, ampName, chwName] = subDistrict.split('#');

    return {
        addrPart: addressNo,
        mooPart: moo.replace('หมู่ที่ ', ''),
        tmbPart: tmbName.replace('ตำบล', ''),
        ampPart: ampName.replace('อำเภอ', ''),
        chwPart: chwName.replace('จังหวัด', ''),
    }
}