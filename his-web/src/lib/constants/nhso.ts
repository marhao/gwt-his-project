/**
 * ==========================================
 * This mapping depends on your hospital's pttype configuration
 * ==========================================
 */
export const NHSO_TO_PTTYPE_MAPPING: Record<string, string> = {
    'UCS': 'T1',    // บัตรทอง
    'OFC': 'A7',    // ข้าราชการ  
    'SSS': 'B1',    // ประกันสังคม
    'LGO': 'A1',    // อปท.
    // Add more mappings as needed
};