// src/lib/api/patient.ts

import { api } from './client';
import { ApiResponse } from '../types';
import { VisitFormData } from '../types/visit';

// ============================================
// Visit API
// ============================================
export const visitApi = {
    // Create new visit
    create: async (data: VisitFormData): Promise<ApiResponse<{ vn: string }>> => {
        return api.post<ApiResponse<{ vn: string }>>('/opd', {
            hn: data.hn,
            /** visit data */
            vstdate: data.visitDate,
            vsttime: data.visitTime,
            ovstist: data.visitType, // ประเภทการมา 01 มาเอง (ห้องบัตร) | 02 นัดมา | 03 รับต่อจากห้องตรวจโรค | 04 รับต่อจากสถานพยาบาลอื่น | 05 รับต่อจาก Emergency Room | 06 รับต่อจาก ห้องคลอด | 07 นัดมาทำแผล
            ovstost: '00',  // สถานะการตรวจ 00 รอผลตรวจ | 01 - 0... Admit แผนก... | 52 ตายที่แผนกผู้ป่วยนอก | 54 ส่งต่อสถานพยาบาลอื่น | 62 ตรวจรักษาที่แผนก | 63 ตรวจรักษาที่ห้อง ER | 98 รอรับยา | 99 ตรวจแล้ว
            pt_priority: data.urgency, // ความเร่งด่วน 0 ปกติ | 1 มาก | 2 มากที่สุด
            pt_subtype: data.patientType, // ประเภทผู้ป่วย 0 ทั่วไป | 1 pcu | 2 ออกหน่วย
            pt_walk: data.patientStatus, // สภาพผู้ป่วย 1 เดินมา | 2 อุ้มมา | 3 รถเข็น | 4 รถนอน
            visit_type: data.timeType, // ประเภทเวลา I ในเวลา | O นอกเวลา
            /** สิทธิ์ */
            pttype: data.ptRight?.pttype,
            pttypeno: data.ptRight?.pttypeNo,
            hospmain: data.ptRight?.hospmain,
            hospsub: data.ptRight?.hospsub,
            has_insurance: 'N', // มีประกันฯ Y ใช่ | N ไม่
            /** จุดตรวจ */
            spclty: data.spclty,
            cur_dep: data.department,
            main_dep: data.department,
            at_hospital: 'Y', // ตรวจที่ รพ Y ใช่ | N ไม่
            // cur_dep_time: '', // เวลาแผนกปัจจุบัน
            // cur_dep_busy: '', // แผนกปัจจุบันกำลังยุ่ง Y ใช่ | N ไม่
            /** Refer */
            refer_type: data.refer?.refer_type, // ประเภทการส่งต่อ 0 รับส่งจาก CUPs | 1 รับส่งภายในจังหวัด | 2 รับส่งนอกจังหวัด
            // i_refer_number: data.refer?.i_refer_number,  // เลขที่ที่ใบรับส่งต่อ
            // o_refer_number: data.refer?.o_refer_number,  // เลขที่ที่ใบส่งต่อ
            // o_refer_dep: data.refer?.o_refer_dep,        // แผนกที่ส่งต่อ
            /** คิว */
            oqueue: '',
            rxqueue: '',
            main_dep_queue: '',
            waiting: 'Y', // กำลังรอ Y ใช่ | N ไม่
            /** การเงิน */
            rcpt_disease: '',
            finance_summary_date: '',
            finance_lock: '',
            /** ผู้ใช้ */
            staff: '',
        });
    },

    // Update visit
    update: async (vn: string, data: Partial<VisitFormData>): Promise<ApiResponse<void>> => {
        const payload: Record<string, unknown> = {};

        // if (data.hn !== undefined) payload.hn = data.hn;
        // if (data.vstdate !== undefined) payload.vstdate = data.vstdate;
        // if (data.vsttime !== undefined) payload.vsttime = data.vsttime;
        // if (data.ovstist !== undefined) payload.ovstist = data.ovstist;
        // if (data.ovstost !== undefined) payload.ovstost = data.ovstost;
        // if (data.pt_priority !== undefined) payload.pt_priority = data.pt_priority;
        // if (data.pt_subtype !== undefined) payload.pt_subtype = data.pt_subtype;
        // if (data.pt_walk !== undefined) payload.pt_walk = data.pt_walk;
        // if (data.visit_type !== undefined) payload.visit_type = data.visit_type;
        /** สิทธิ์ */
        // if (data.pttype !== undefined) payload.pttype = data.pttype;
        // if (data.pttypeno !== undefined) payload.pttypeno = data.pttypeno;
        // if (data.hospmain !== undefined) payload.hospmain = data.hospmain;
        // if (data.hospsub !== undefined) payload.hospsub = data.hospsub;
        // if (data.has_insurance !== undefined) payload.has_insurance = data.has_insurance;
        /** จุดตรวจ */
        // if (data.spclty !== undefined) payload.spclty = data.spclty;
        // if (data.cur_dep !== undefined) payload.cur_dep = data.cur_dep;
        // if (data.main_dep !== undefined) payload.main_dep = data.main_dep;
        // if (data.at_hospital !== undefined) payload.at_hospital = data.at_hospital;
        /** Refer */
        // if (data.refer_type !== undefined) payload.refer_type = data.refer_type;
        /** คิว */
        // if (data.oqueue !== undefined) payload.oqueue = data.oqueue;
        // if (data.rxqueue !== undefined) payload.rxqueue = data.rxqueue;
        // if (data.main_dep_queue !== undefined) payload.main_dep_queue = data.main_dep_queue;
        // if (data.waiting !== undefined) payload.waiting = data.waiting;
        /** การเงิน */
        // if (data.rcpt_disease !== undefined) payload.rcpt_disease = data.rcpt_disease;
        // if (data.finance_summary_date !== undefined) payload.finance_summary_date = data.finance_summary_date;
        // if (data.finance_lock !== undefined) payload.finance_lock = data.finance_lock;
        /** ผู้ใช้ */


        return api.put<ApiResponse<void>>(`/opd/${vn}`, payload);
    },

    // Delete visit
    delete: async (vn: string): Promise<ApiResponse<void>> => {
        return api.delete<ApiResponse<void>>(`/opd/${vn}`);
    },

};