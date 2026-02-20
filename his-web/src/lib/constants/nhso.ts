/**
 * ==========================================
 * This mapping depends on your hospital's pttype configuration
 * ==========================================
 */
export const NHSO_TO_PTTYPE_MAPPING: Record<string, string> = {
    'UCS': '30',    // บัตรทอง
    'OFC': 'A7',    // ข้าราชการ  
    'SSS': '34',    // ประกันสังคม
    'LGO': 'A1',    // อปท.
    'WEL': '90',
    // Add more mappings as needed
};