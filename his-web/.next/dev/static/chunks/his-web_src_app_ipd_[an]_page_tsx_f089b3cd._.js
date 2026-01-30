(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/his-web/src/app/ipd/[an]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IPDDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/clipboard-list.js [app-client] (ecmascript) <export default as ClipboardList>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/pill.js [app-client] (ecmascript) <export default as Pill>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$test$2d$tube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TestTube$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/test-tube.js [app-client] (ecmascript) <export default as TestTube>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/scale.js [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$components$2f$layout$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/his-web/src/components/layout/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$components$2f$layout$2f$AdminLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/components/layout/AdminLayout.tsx [app-client] (ecmascript)");
// Components
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$PatientHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/PatientHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$CompactStickyHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/CompactStickyHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$OverviewTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/OverviewTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$XrayTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/XrayTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$LabTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/LabTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$MedicationsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/MedicationsTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$NursingTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/NursingTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$AssessmentsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$TPRChartTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx [app-client] (ecmascript)");
// OrderSheet from separated structure
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$OrderSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
// ============================================
// Global Styles (simplified)
// ============================================
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
  
  .ipd-detail * { font-family: 'Kanit', sans-serif; }
  .ipd-detail .font-mono { font-family: 'JetBrains Mono', monospace; }
  
  .scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
  .scrollbar-thin::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
  .scrollbar-thin::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
  .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
`;
// ============================================
// Mock Data - Multiple Patients (lookup by AN)
// ============================================
const mockPatients = {
    '670001234': {
        an: '670001234',
        hn: '6712345',
        cid: '1234567890123',
        name: 'นายสมชาย ใจดี',
        age: 58,
        sex: 'M',
        bloodType: 'O+',
        allergies: [
            'Penicillin',
            'Aspirin'
        ],
        underlyingDiseases: [
            'HT',
            'DM',
            'DLP'
        ],
        regdate: '15/01/67',
        regtime: '14:30',
        ward: 'อายุรกรรม ชาย 1',
        wardCode: 'W01',
        room: '301',
        bed: 'A',
        diagnosis: 'Acute myocardial infarction',
        pttype: 'UCS',
        pttypeName: 'บัตรทอง',
        admDoctor: 'นพ.วิชัย หัวใจดี',
        inchargeDoctor: 'นพ.สุรชัย รักษาดี',
        spclty: 'อายุรกรรม',
        isCritical: true,
        los: 5,
        drg: '12001',
        rw: 2.5,
        emergencyContact: '081-234-5678'
    },
    '670001235': {
        an: '670001235',
        hn: '6723456',
        cid: '2345678901234',
        name: 'นางสมหญิง รักสุข',
        age: 45,
        sex: 'F',
        bloodType: 'A+',
        allergies: [
            'Sulfa'
        ],
        underlyingDiseases: [
            'DM',
            'Obesity'
        ],
        regdate: '16/01/67',
        regtime: '09:15',
        ward: 'อายุรกรรม หญิง 1',
        wardCode: 'W02',
        room: '402',
        bed: 'B',
        diagnosis: 'Type 2 DM with complication',
        pttype: 'SSS',
        pttypeName: 'ประกันสังคม',
        admDoctor: 'พญ.สุดา เยียวยา',
        inchargeDoctor: 'พญ.สุดา เยียวยา',
        spclty: 'อายุรกรรม',
        isCritical: false,
        los: 3,
        drg: '13502',
        rw: 1.2,
        emergencyContact: '089-876-5432'
    },
    '670001236': {
        an: '670001236',
        hn: '6734567',
        cid: '3456789012345',
        name: 'นายประเสริฐ มั่นคง',
        age: 62,
        sex: 'M',
        bloodType: 'B+',
        allergies: [],
        underlyingDiseases: [
            'HT',
            'CKD Stage 3'
        ],
        regdate: '14/01/67',
        regtime: '22:45',
        ward: 'ICU',
        wardCode: 'ICU',
        room: 'ICU',
        bed: '3',
        diagnosis: 'Severe sepsis, Pneumonia',
        pttype: 'OFC',
        pttypeName: 'ข้าราชการ',
        admDoctor: 'นพ.เกรียงไกร ฉุกเฉิน',
        inchargeDoctor: 'นพ.เกรียงไกร ฉุกเฉิน',
        spclty: 'อายุรกรรม',
        isCritical: true,
        los: 6,
        drg: '17201',
        rw: 8.5,
        emergencyContact: '082-345-6789'
    },
    '670001237': {
        an: '670001237',
        hn: '6745678',
        cid: '4567890123456',
        name: 'ด.ช.ภูมิ เติบโต',
        age: 8,
        sex: 'M',
        bloodType: 'AB+',
        allergies: [
            'Ibuprofen'
        ],
        underlyingDiseases: [],
        regdate: '17/01/67',
        regtime: '11:00',
        ward: 'กุมารเวชกรรม',
        wardCode: 'W05',
        room: '501',
        bed: 'C',
        diagnosis: 'Acute appendicitis',
        pttype: 'UCS',
        pttypeName: 'บัตรทอง',
        admDoctor: 'พญ.นิดา เด็กดี',
        inchargeDoctor: 'นพ.สุรชัย มีดคม',
        spclty: 'ศัลยกรรม',
        isCritical: false,
        los: 2,
        drg: '06801',
        rw: 1.8,
        emergencyContact: '083-456-7890'
    },
    '670001238': {
        an: '670001238',
        hn: '6756789',
        cid: '5678901234567',
        name: 'นางมาลี ครรภ์แก้ว',
        age: 28,
        sex: 'F',
        bloodType: 'O-',
        allergies: [],
        underlyingDiseases: [],
        regdate: '17/01/67',
        regtime: '03:30',
        ward: 'สูติ-นรีเวช',
        wardCode: 'W04',
        room: 'LR',
        bed: '2',
        diagnosis: 'Full term pregnancy, labor',
        pttype: 'SSS',
        pttypeName: 'ประกันสังคม',
        admDoctor: 'พญ.วิไล คลอดง่าย',
        inchargeDoctor: 'พญ.วิไล คลอดง่าย',
        spclty: 'สูติ-นรีเวชกรรม',
        isCritical: false,
        los: 1,
        drg: '14001',
        rw: 0.8,
        emergencyContact: '084-567-8901'
    }
};
// Default patient if AN not found
const defaultPatient = {
    an: 'N/A',
    hn: 'N/A',
    cid: 'N/A',
    name: 'ไม่พบข้อมูลผู้ป่วย',
    age: 0,
    sex: 'M',
    bloodType: 'N/A',
    allergies: [],
    underlyingDiseases: [],
    regdate: '-',
    regtime: '-',
    ward: '-',
    wardCode: '-',
    room: '-',
    bed: '-',
    diagnosis: '-',
    pttype: '-',
    pttypeName: '-',
    admDoctor: '-',
    inchargeDoctor: '-',
    spclty: '-',
    isCritical: false,
    los: 0,
    drg: '-',
    rw: 0,
    emergencyContact: '-'
};
// Helper function to get patient by AN
const getPatientByAN = (an)=>{
    return mockPatients[an] || defaultPatient;
};
const mockOrders = [
    {
        id: 1,
        type: 'lab',
        name: 'CBC',
        orderType: 'oneday',
        startDate: '20/01/67',
        time: '06:00',
        prescriber: 'นพ.วิชัย',
        status: 'completed',
        isStat: true,
        isDiscontinued: false
    },
    {
        id: 2,
        type: 'lab',
        name: 'Cardiac Enzyme (Troponin-T)',
        orderType: 'oneday',
        startDate: '20/01/67',
        time: '06:00',
        prescriber: 'นพ.วิชัย',
        status: 'pending',
        isStat: true,
        isDiscontinued: false
    },
    {
        id: 3,
        type: 'lab',
        name: 'Electrolyte',
        orderType: 'oneday',
        startDate: '20/01/67',
        time: '06:00',
        prescriber: 'นพ.วิชัย',
        status: 'pending',
        isStat: false,
        isDiscontinued: false
    },
    {
        id: 4,
        type: 'medication',
        name: 'Aspirin 81mg',
        dose: '1 tab',
        frequency: 'OD PC',
        route: 'PO',
        instruction: 'รับประทานหลังอาหารเช้า',
        orderType: 'continue',
        startDate: '18/01/67',
        time: '14:30',
        prescriber: 'นพ.วิชัย',
        status: 'active',
        isStat: false,
        isDiscontinued: false
    },
    {
        id: 5,
        type: 'medication',
        name: 'Clopidogrel 75mg',
        dose: '1 tab',
        frequency: 'OD PC',
        route: 'PO',
        instruction: 'รับประทานหลังอาหารเช้า',
        orderType: 'continue',
        startDate: '18/01/67',
        time: '14:30',
        prescriber: 'นพ.วิชัย',
        status: 'active',
        isStat: false,
        isDiscontinued: false
    },
    {
        id: 6,
        type: 'medication',
        name: 'Atorvastatin 40mg',
        dose: '1 tab',
        frequency: 'OD HS',
        route: 'PO',
        instruction: 'รับประทานก่อนนอน',
        orderType: 'continue',
        startDate: '18/01/67',
        time: '14:30',
        prescriber: 'นพ.วิชัย',
        status: 'active',
        isStat: false,
        isDiscontinued: false
    },
    {
        id: 7,
        type: 'medication',
        name: 'Enoxaparin 60mg',
        dose: '1 prefilled',
        frequency: 'BID',
        route: 'SC',
        instruction: 'ฉีดเข้าใต้ผิวหนังบริเวณหน้าท้อง',
        orderType: 'continue',
        startDate: '18/01/67',
        time: '14:30',
        prescriber: 'นพ.วิชัย',
        status: 'active',
        isStat: false,
        isDiscontinued: false
    },
    {
        id: 8,
        type: 'medication',
        name: 'Omeprazole 40mg',
        dose: '1 vial',
        frequency: 'OD',
        route: 'IV',
        orderType: 'continue',
        startDate: '18/01/67',
        time: '14:30',
        prescriber: 'นพ.วิชัย',
        status: 'active',
        isStat: false,
        isDiscontinued: false
    },
    {
        id: 9,
        type: 'treatment',
        name: 'O2 Cannula 3 L/min',
        dose: 'Keep O2 sat ≥ 95%',
        orderType: 'continue',
        startDate: '18/01/67',
        time: '14:30',
        prescriber: 'นพ.วิชัย',
        status: 'active',
        isStat: false,
        isDiscontinued: false
    },
    {
        id: 10,
        type: 'treatment',
        name: 'EKG Monitor',
        dose: 'Continuous',
        orderType: 'continue',
        startDate: '18/01/67',
        time: '14:30',
        prescriber: 'นพ.วิชัย',
        status: 'active',
        isStat: false,
        isDiscontinued: false
    },
    {
        id: 11,
        type: 'medication',
        name: 'Morphine 10mg IV',
        dose: '0.5 amp',
        frequency: 'Q4H PRN',
        route: 'IV',
        instruction: 'เมื่อปวดมาก',
        orderType: 'continue',
        startDate: '18/01/67',
        time: '14:30',
        prescriber: 'นพ.วิชัย',
        status: 'active',
        isStat: false,
        isDiscontinued: false
    },
    {
        id: 100,
        type: 'medication',
        name: 'Metformin 500mg',
        dose: '1 tab',
        frequency: 'TID PC',
        route: 'PO',
        orderType: 'continue',
        startDate: '18/01/67',
        time: '14:30',
        prescriber: 'นพ.วิชัย',
        status: 'discontinued',
        isStat: false,
        isDiscontinued: true,
        endDate: '19/01/67',
        endTime: '10:00',
        dcBy: 'นพ.วิชัย',
        dcReason: 'Hold ยาก่อน CAG'
    }
];
const mockProgressNotes = [
    {
        id: 1,
        date: '20/01/67',
        time: '08:00',
        author: 'นพ.วิชัย หัวใจดี',
        subjective: 'เจ็บหน้าอกน้อยลง ยังมี chest discomfort เล็กน้อย',
        objective: 'V/S stable, BP 125/78, HR 72, no dyspnea\nHeart: regular rhythm, no murmur\nLung: clear both sides',
        assessment: '1. NSTEMI - improving\n2. HT - controlled\n3. DM - hold Metformin',
        plan: '1. Continue DAPT, anticoagulation\n2. Plan CAG tomorrow\n3. Keep NPO after MN',
        vitalSigns: {
            bp: '125/78',
            hr: 72,
            rr: 18,
            temp: 36.8,
            o2sat: 98
        }
    },
    {
        id: 2,
        date: '19/01/67',
        time: '20:00',
        author: 'นพ.สุรชัย รักษาดี',
        subjective: 'เจ็บหน้าอก แน่นๆ ร้าวไปแขนซ้าย มา 2 ชม.ก่อนมา',
        objective: 'V/S: BP 145/92, HR 88, RR 20, T 37.0, O2sat 96%\nGA: anxious, diaphoresis\nHeart: regular rhythm, S3 gallop',
        assessment: '1. NSTEMI high risk\n2. HT emergency\n3. Underlying DM, DLP',
        plan: '1. Start DAPT + anticoagulation\n2. Serial cardiac enzyme\n3. Plan CAG',
        vitalSigns: {
            bp: '145/92',
            hr: 88,
            rr: 20,
            temp: 37.0,
            o2sat: 96
        }
    }
];
const mockVitalSigns = [
    {
        datetime: '20/01/67 08:00',
        temp: 36.8,
        pulse: 72,
        rr: 18,
        bp_sys: 125,
        bp_dia: 78,
        o2sat: 98,
        pain: 2,
        recorded_by: 'พยาบาลสมหญิง'
    },
    {
        datetime: '20/01/67 04:00',
        temp: 36.6,
        pulse: 68,
        rr: 16,
        bp_sys: 118,
        bp_dia: 72,
        o2sat: 99,
        pain: 1,
        recorded_by: 'พยาบาลสมชาย'
    },
    {
        datetime: '19/01/67 20:00',
        temp: 37.0,
        pulse: 88,
        rr: 20,
        bp_sys: 145,
        bp_dia: 92,
        o2sat: 96,
        pain: 6,
        recorded_by: 'พยาบาลวิไล'
    },
    {
        datetime: '19/01/67 16:00',
        temp: 37.2,
        pulse: 92,
        rr: 22,
        bp_sys: 152,
        bp_dia: 95,
        o2sat: 95,
        pain: 7,
        recorded_by: 'พยาบาลสมศรี'
    }
];
// ============================================
// Tab Configuration
// ============================================
const tabs = [
    {
        id: 'overview',
        label: 'Overview',
        shortLabel: 'ภาพรวม',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"],
        color: 'slate'
    },
    {
        id: 'orders',
        label: 'Order Sheet',
        shortLabel: 'Orders',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"],
        color: 'blue'
    },
    {
        id: 'medications',
        label: 'MAR',
        shortLabel: 'MAR',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__["Pill"],
        color: 'purple'
    },
    {
        id: 'lab',
        label: 'Lab',
        shortLabel: 'Lab',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$test$2d$tube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TestTube$3e$__["TestTube"],
        color: 'pink'
    },
    {
        id: 'xray',
        label: 'X-Ray/Imaging',
        shortLabel: 'X-Ray',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"],
        color: 'cyan'
    },
    {
        id: 'vitals',
        label: 'Vital Signs',
        shortLabel: 'V/S',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"],
        color: 'red'
    },
    {
        id: 'nursing',
        label: 'Nursing',
        shortLabel: 'Nursing',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        color: 'teal'
    },
    {
        id: 'assessments',
        label: 'Assessments',
        shortLabel: 'Assess',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
        color: 'amber'
    },
    {
        id: 'records',
        label: 'Records',
        shortLabel: 'Records',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"],
        color: 'indigo'
    },
    {
        id: 'finance',
        label: 'Finance',
        shortLabel: 'Finance',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"],
        color: 'emerald'
    }
];
function IPDDetailPage({ params }) {
    _s();
    // Unwrap params Promise (Next.js 15+)
    const { an } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(params);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('orders');
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(mockOrders);
    const [progressNotes, setProgressNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(mockProgressNotes);
    const [vitalSigns, setVitalSigns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(mockVitalSigns);
    // Track scroll to show/hide compact header
    const [showCompactHeader, setShowCompactHeader] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IPDDetailPage.useEffect": ()=>{
            const handleScroll = {
                "IPDDetailPage.useEffect.handleScroll": ()=>{
                    // Show compact header when scrolled past 150px (approx height of full header)
                    setShowCompactHeader(window.scrollY > 150);
                }
            }["IPDDetailPage.useEffect.handleScroll"];
            window.addEventListener('scroll', handleScroll, {
                passive: true
            });
            return ({
                "IPDDetailPage.useEffect": ()=>window.removeEventListener('scroll', handleScroll)
            })["IPDDetailPage.useEffect"];
        }
    }["IPDDetailPage.useEffect"], []);
    // Get patient by AN from URL params
    const patient = getPatientByAN(an);
    const activeOrders = orders.filter((o)=>!o.isDiscontinued);
    // Get badge counts
    const getBadge = (tabId)=>{
        switch(tabId){
            case 'orders':
                return activeOrders.length;
            case 'medications':
                return activeOrders.filter((o)=>o.type === 'medication').length;
            case 'lab':
                return activeOrders.filter((o)=>o.type === 'lab').length;
            default:
                return undefined;
        }
    };
    // Render tab content
    const renderTabContent = ()=>{
        switch(activeTab){
            case 'overview':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$OverviewTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OverviewTab"], {
                    patient: patient,
                    orders: orders,
                    vitalSigns: vitalSigns
                }, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                    lineNumber: 335,
                    columnNumber: 16
                }, this);
            case 'orders':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$OrderSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrderSheet"], {
                    orders: orders,
                    setOrders: setOrders,
                    progressNotes: progressNotes,
                    setProgressNotes: setProgressNotes
                }, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                    lineNumber: 337,
                    columnNumber: 16
                }, this);
            case 'vitals':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$TPRChartTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPRChartTab"], {}, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                    lineNumber: 339,
                    columnNumber: 16
                }, this);
            case 'xray':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$XrayTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XrayTab"], {}, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                    lineNumber: 341,
                    columnNumber: 16
                }, this);
            case 'lab':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$LabTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabTab"], {}, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                    lineNumber: 343,
                    columnNumber: 16
                }, this);
            case 'medications':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$MedicationsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MedicationsTab"], {}, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                    lineNumber: 345,
                    columnNumber: 16
                }, this);
            case 'nursing':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$NursingTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NursingTab"], {}, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                    lineNumber: 347,
                    columnNumber: 16
                }, this);
            case 'assessments':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$AssessmentsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssessmentsTab"], {}, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                    lineNumber: 349,
                    columnNumber: 16
                }, this);
            case 'records':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-12 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center mx-auto mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                className: "w-8 h-8 text-indigo-600 dark:text-indigo-400"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                lineNumber: 354,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                            lineNumber: 353,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-700 dark:text-slate-300 font-semibold",
                            children: "Medical Records"
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                            lineNumber: 356,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-400 text-sm mt-1",
                            children: "กำลังพัฒนา..."
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                            lineNumber: 357,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                    lineNumber: 352,
                    columnNumber: 11
                }, this);
            case 'finance':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-12 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
                                className: "w-8 h-8 text-emerald-600 dark:text-emerald-400"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                lineNumber: 364,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                            lineNumber: 363,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-700 dark:text-slate-300 font-semibold",
                            children: "Finance & Billing"
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                            lineNumber: 366,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-400 text-sm mt-1",
                            children: "กำลังพัฒนา..."
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                            lineNumber: 367,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                    lineNumber: 362,
                    columnNumber: 11
                }, this);
            default:
                return null;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$components$2f$layout$2f$AdminLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminLayout"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: globalStyles
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                lineNumber: 377,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ipd-detail min-h-screen",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"], {
                                                className: "w-5 h-5 text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                lineNumber: 386,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                            lineNumber: 385,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-lg font-bold text-slate-800 dark:text-white",
                                                    children: "IPD Chart"
                                                }, void 0, false, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                    lineNumber: 389,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-500",
                                                    children: [
                                                        "AN: ",
                                                        patient.an
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                    lineNumber: 390,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                            lineNumber: 388,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                    lineNumber: 384,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 px-3 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                            className: "w-3.5 h-3.5 text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                            lineNumber: 394,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-600 dark:text-slate-300",
                                            children: "20/01/2567"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                            lineNumber: 395,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-300 dark:text-slate-600",
                                            children: "|"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                            lineNumber: 396,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                            className: "w-3.5 h-3.5 text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                            lineNumber: 397,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-600 dark:text-slate-300",
                                            children: "15:30"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                            lineNumber: 398,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                    lineNumber: 393,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                            lineNumber: 383,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$PatientHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PatientHeader"], {
                                patient: patient
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                lineNumber: 404,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                            lineNumber: 403,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sticky top-0 z-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `overflow-hidden transition-all duration-300 ease-in-out ${showCompactHeader ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$CompactStickyHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompactStickyHeader"], {
                                                patient: patient
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                lineNumber: 415,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-t border-slate-200/80 dark:border-slate-700/80"
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                lineNumber: 417,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                        lineNumber: 412,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-1.5 bg-slate-50/80 dark:bg-slate-900/50",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "overflow-x-auto scrollbar-hide",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1 min-w-max",
                                                children: tabs.map((tab)=>{
                                                    const badge = getBadge(tab.id);
                                                    const isActive = activeTab === tab.id;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setActiveTab(tab.id),
                                                        className: `flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 ${isActive ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25' : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700/50'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(tab.icon, {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                                lineNumber: 437,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "hidden sm:inline",
                                                                children: tab.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                                lineNumber: 438,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "sm:hidden",
                                                                children: tab.shortLabel
                                                            }, void 0, false, {
                                                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                                lineNumber: 439,
                                                                columnNumber: 27
                                                            }, this),
                                                            badge !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `px-1.5 py-0.5 rounded text-[10px] font-bold ${isActive ? 'bg-white/20' : 'bg-slate-200/80 dark:bg-slate-600/80 text-slate-600 dark:text-slate-300'}`,
                                                                children: badge
                                                            }, void 0, false, {
                                                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                                lineNumber: 441,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, tab.id, true, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                        lineNumber: 428,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                lineNumber: 423,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                            lineNumber: 422,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                        lineNumber: 421,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                lineNumber: 409,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                            lineNumber: 408,
                            columnNumber: 11
                        }, this),
                        renderTabContent(),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 px-4 py-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-between gap-4 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2 h-2 rounded-full bg-emerald-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                        lineNumber: 466,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-500",
                                                        children: "Continue:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                        lineNumber: 467,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-slate-700 dark:text-slate-300",
                                                        children: activeOrders.filter((o)=>o.orderType === 'continue').length
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                        lineNumber: 468,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                lineNumber: 465,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2 h-2 rounded-full bg-orange-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-500",
                                                        children: "One Day:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                        lineNumber: 472,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-slate-700 dark:text-slate-300",
                                                        children: activeOrders.filter((o)=>o.orderType === 'oneday').length
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                        lineNumber: 473,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                lineNumber: 470,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2 h-2 rounded-full bg-red-500 animate-pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                        lineNumber: 476,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-500",
                                                        children: "STAT:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                        lineNumber: 477,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-slate-700 dark:text-slate-300",
                                                        children: activeOrders.filter((o)=>o.isStat).length
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                        lineNumber: 478,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                lineNumber: 475,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                        lineNumber: 464,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-500",
                                                children: "Total Active:"
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                lineNumber: 482,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-2 py-0.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold shadow-sm",
                                                children: activeOrders.length
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                                lineNumber: 483,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                        lineNumber: 481,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                                lineNumber: 463,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                            lineNumber: 462,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                    lineNumber: 381,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
                lineNumber: 380,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/page.tsx",
        lineNumber: 376,
        columnNumber: 5
    }, this);
}
_s(IPDDetailPage, "emMjFFsDNAKV/dQLQdn13Hjs9IA=");
_c = IPDDetailPage;
var _c;
__turbopack_context__.k.register(_c, "IPDDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=his-web_src_app_ipd_%5Ban%5D_page_tsx_f089b3cd._.js.map