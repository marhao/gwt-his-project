import { PatientNewVisit as Patient } from "./patient";

export type ReferIn = {
    hos_guid: string;
    vn: string;
    hn: string;
    refer_date: Date;   // วันที่ส่งต่อ
    date_in: Date;      // วันที่เข้ารับบริการ
    refer_type: string; // ประเภทการส่งต่อ 0 รับส่งจาก CUPs | 1 รับส่งภายในจังหวัด | 2 รับส่งนอกจังหวัด
    docno?: string;     // เลขที่ที่ใบส่งต่อ OPD
    depcode?: string | null; // แผนกที่ส่งต่อ
    icd10?: string | null;
    hospcode: string;   // หน่วยบริการ
    clinic?: string;    // คลินิกที่ส่งต่อ
    has_expire_date: boolean;
    expire_date?: Date;
    patient: Patient
}

export type ReferOut = {
    hos_guid: string;
    id: number;
    vn: string;
    hn: string;
    refer_date: Date;   // วันที่ส่งต่อ
    refer_type: string; // ประเภทการส่งต่อ 0 รับส่งจาก CUPs | 1 รับส่งภายในจังหวัด | 2 รับส่งนอกจังหวัด
    refer_number?: string;     // เลขที่ที่ใบส่งต่อ OPD
    depcode?: string | null; // แผนกที่ส่งต่อ
    icd10?: string | null;
    hospcode: string;   // หน่วยบริการ
    clinic?: string;    // คลินิกที่ส่งต่อ
    has_expire_date: boolean;
    expire_date?: Date;
    patient: Patient;
    // docker?: Doctor;
}