
import { PatientNewVisit as Patient } from '../types/patient';
import { ReferIn } from '../types/refer';

export interface VisitFormData {
    /** Visit */
    vn?: string;
    hn: string;
    cid?: string;
    visitDate: string;
    visitTime: string;
    visitType: string; // ประเภทการมา 01 มาเอง (ห้องบัตร) | 02 นัดมา | 03 รับต่อจากห้องตรวจโรค | 04 รับต่อจากสถานพยาบาลอื่น | 05 รับต่อจาก Emergency Room | 06 รับต่อจาก ห้องคลอด | 07 นัดมาทำแผล
    timeType: string; // ประเภทเวลา I ในเวลา | O นอกเวลา
    chiefComplaint: string; // cc
    urgency: string; // ความเร่งด่วน 0 ปกติ | 1 มาก | 2 มากที่สุด
    patientType: string; // ประเภทผู้ป่วย 0 ทั่วไป | 1 pcu | 2 ออกหน่วย
    patientStatus: string; // สภาพผู้ป่วย 1 เดินมา | 2 อุ้มมา | 3 รถเข็น | 4 รถนอน
    /** จุดตรวจ */
    spclty: string;
    department: string;
    /** Patient */
    patient?: Patient
    /** สิทธิ์ */
    pttype: string;
    pttypeName: string;
    ptRight?: PatientRight;
    /** Refer */
    refer?: ReferIn | null; 
}

export type PatientRight = {
    hn: string;
    pttype: string;
    pttypeName: string;
    pttypeNo?: string | null;
    beginDate?: Date | null;
    expireDate?: Date | null;
    hospmain?: string | null;
    hospsub?: string | null;
    has_insurance?: string | null; // มีประกันฯ Y ใช่ | N ไม่
}