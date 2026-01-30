(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TPRChartTab",
    ()=>TPRChartTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thermometer$2d$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThermometerSun$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/thermometer-sun.js [app-client] (ecmascript) <export default as ThermometerSun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/droplets.js [app-client] (ecmascript) <export default as Droplets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-client] (ecmascript) <export default as ZoomIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/zoom-out.js [app-client] (ecmascript) <export default as ZoomOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/printer.js [app-client] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/pill.js [app-client] (ecmascript) <export default as Pill>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$beaker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Beaker$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/beaker.js [app-client] (ecmascript) <export default as Beaker>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/scale.js [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Utensils$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/utensils.js [app-client] (ecmascript) <export default as Utensils>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
// ============================================
// Constants
// ============================================
const TIME_SLOTS = [
    '02:00',
    '06:00',
    '10:00',
    '14:00',
    '18:00',
    '22:00'
];
const TIME_LABELS = [
    '2',
    '6',
    '10',
    '14',
    '18',
    '22'
];
const SHIFTS = [
    {
        key: 'night',
        labelTh: 'ดึก',
        timeRange: '22-06'
    },
    {
        key: 'morning',
        labelTh: 'เช้า',
        timeRange: '06-14'
    },
    {
        key: 'afternoon',
        labelTh: 'บ่าย',
        timeRange: '14-22'
    }
];
const TEMP_MIN = 35;
const TEMP_MAX = 41;
const PULSE_MIN = 40;
const PULSE_MAX = 140;
const ANNOTATION_COLORS = [
    {
        color: '#0d9488',
        name: 'Teal'
    },
    {
        color: '#0891b2',
        name: 'Cyan'
    },
    {
        color: '#3b82f6',
        name: 'Blue'
    },
    {
        color: '#6366f1',
        name: 'Indigo'
    },
    {
        color: '#8b5cf6',
        name: 'Violet'
    },
    {
        color: '#64748b',
        name: 'Slate'
    },
    {
        color: '#1e293b',
        name: 'Dark'
    }
];
const MAX_HISTORY = 50;
const DAY_RANGE_OPTIONS = [
    {
        value: 1,
        label: '1 วัน'
    },
    {
        value: 3,
        label: '3 วัน'
    },
    {
        value: 5,
        label: '5 วัน'
    },
    {
        value: 7,
        label: '7 วัน'
    }
];
const PATIENT_TYPES = {
    CI: {
        label: 'CI',
        fullLabel: 'ผู้ป่วยหนัก',
        bg: 'bg-red-600 dark:bg-red-500'
    },
    SI: {
        label: 'SI',
        fullLabel: 'ผู้ป่วยกึ่งหนัก',
        bg: 'bg-amber-600 dark:bg-amber-500'
    },
    MI: {
        label: 'MI',
        fullLabel: 'ผู้ป่วยระดับปานกลาง',
        bg: 'bg-sky-600 dark:bg-sky-500'
    },
    CL: {
        label: 'CL',
        fullLabel: 'ผู้ป่วยระยะพักฟื้น',
        bg: 'bg-emerald-600 dark:bg-emerald-500'
    }
};
const MEDICATION_CODES = [
    {
        code: 'Mi',
        name: 'MO-IR or MO syrup'
    },
    {
        code: 'Ms',
        name: 'MST'
    },
    {
        code: 'M',
        name: 'Morphine IV'
    },
    {
        code: 'P',
        name: 'Pethidine'
    },
    {
        code: 'T',
        name: 'Tramadol'
    },
    {
        code: 'F',
        name: 'Fentanyl'
    },
    {
        code: 'D',
        name: 'Diclofenac'
    }
];
// ============================================
// Mock Data Generator
// ============================================
const generateMockTPRRecords = ()=>{
    const records = [];
    const baseDate = new Date(2024, 0, 21);
    for(let i = 0; i < 10; i++){
        const date = new Date(baseDate);
        date.setDate(date.getDate() - i);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const isFebrile = i >= 7 && i <= 8;
        const isRecovering = i >= 3 && i <= 6;
        const isStable = i < 3;
        const vitals = TIME_SLOTS.map((time, idx)=>{
            let baseTemp = 37.0, basePulse = 75, basePain = 2;
            if (isFebrile) {
                baseTemp = 38.2 + Math.random() * 0.8;
                basePulse = 95 + Math.random() * 15;
                basePain = 5 + Math.floor(Math.random() * 3);
            } else if (isRecovering) {
                baseTemp = 37.2 + Math.random() * 0.5;
                basePulse = 78 + Math.random() * 12;
                basePain = 3 + Math.floor(Math.random() * 2);
            } else if (isStable) {
                baseTemp = 36.5 + Math.random() * 0.4;
                basePulse = 70 + Math.random() * 10;
                basePain = 1 + Math.floor(Math.random() * 2);
            }
            if (idx >= 2 && idx <= 4) {
                baseTemp += 0.2;
                basePulse += 5;
            }
            return {
                time,
                temperature: Math.round(baseTemp * 10) / 10,
                pulse: Math.round(basePulse),
                respiratoryRate: 16 + Math.floor(Math.random() * 6),
                bpSystolic: 115 + Math.floor(Math.random() * 25),
                bpDiastolic: 70 + Math.floor(Math.random() * 15),
                sosScore: isFebrile ? 3 : isRecovering ? 2 : 1,
                o2Saturation: 96 + Math.floor(Math.random() * 4),
                o2Therapy: isFebrile || isRecovering ? 'Cannula 3L' : undefined,
                painScore: basePain
            };
        });
        const fluids = SHIFTS.map((shift)=>{
            const oral = 200 + Math.floor(Math.random() * 300);
            const parenteral = 300 + Math.floor(Math.random() * 400);
            const urine = 400 + Math.floor(Math.random() * 400);
            const drainage = Math.floor(Math.random() * 100);
            return {
                shift: shift.key,
                oralFluid: oral,
                parenteral,
                totalIntake: oral + parenteral,
                urine,
                drainage,
                totalOutput: urine + drainage
            };
        });
        const medications = TIME_SLOTS.map((time)=>({
                time,
                continuousDose: i > 5 ? 'M 2mg' : undefined,
                prnDose: Math.random() > 0.7 ? 'T 50mg' : undefined
            }));
        records.push({
            id: i + 1,
            date: `${day}/${month}/2567`,
            dateShort: `${day}/${month}`,
            dayAdmission: 10 - i,
            dayAfterOperation: i <= 6 ? 7 - i : undefined,
            vitals,
            fluids,
            medications,
            weight: 65,
            height: 170,
            diet: i > 7 ? 'NPO' : i > 5 ? 'Clear liquid' : i > 3 ? 'Soft diet' : 'Regular',
            stool: Math.random() > 0.5 ? '1' : '-',
            patientType: i > 7 ? 'CI' : i > 5 ? 'SI' : i > 2 ? 'MI' : 'CL'
        });
    }
    return records;
};
const mockTPRRecords = generateMockTPRRecords();
// ============================================
// Helper Components
// ============================================
const PatientTypeBadge = ({ type, size = 'sm' })=>{
    if (!type) return null;
    const config = PATIENT_TYPES[type];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `${config.bg} text-white font-semibold rounded ${size === 'lg' ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[10px]'}`,
        title: config.fullLabel,
        children: config.label
    }, void 0, false, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
        lineNumber: 236,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = PatientTypeBadge;
// ============================================
// TPR Graph Component (Soft Colors)
// ============================================
const TPRGraph = ({ records, dayRange, width = 1000, height = 300 })=>{
    _s();
    const [hoveredPoint, setHoveredPoint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const padding = {
        top: 25,
        right: 45,
        bottom: 20,
        left: 50
    };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;
    const dayWidth = graphWidth / dayRange;
    const timeSlotWidth = dayWidth / 6;
    const tempToY = (temp)=>padding.top + graphHeight - (temp - TEMP_MIN) / (TEMP_MAX - TEMP_MIN) * graphHeight;
    const pulseToY = (pulse)=>padding.top + graphHeight - (pulse - PULSE_MIN) / (PULSE_MAX - PULSE_MIN) * graphHeight;
    const getX = (dayIndex, timeIndex)=>padding.left + dayIndex * dayWidth + timeIndex * timeSlotWidth + timeSlotWidth / 2;
    const displayRecords = records.slice(0, dayRange).reverse();
    const tempPoints = [];
    const pulsePoints = [];
    displayRecords.forEach((record, dayIndex)=>{
        record.vitals.forEach((vital, timeIndex)=>{
            const x = getX(dayIndex, timeIndex);
            if (vital.temperature) tempPoints.push({
                x,
                y: tempToY(vital.temperature),
                value: vital.temperature,
                record,
                vital
            });
            if (vital.pulse) pulsePoints.push({
                x,
                y: pulseToY(vital.pulse),
                value: vital.pulse,
                record,
                vital
            });
        });
    });
    const tempPath = tempPoints.length > 1 ? `M ${tempPoints.map((p)=>`${p.x},${p.y}`).join(' L ')}` : '';
    const pulsePath = pulsePoints.length > 1 ? `M ${pulsePoints.map((p)=>`${p.x},${p.y}`).join(' L ')}` : '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: width,
                height: height,
                className: "font-sans",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: padding.left,
                        y: padding.top,
                        width: graphWidth,
                        height: graphHeight,
                        className: "fill-slate-50 dark:fill-slate-800/50",
                        stroke: "currentColor",
                        strokeOpacity: 0.1
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    displayRecords.map((_, dayIndex)=>{
                        if (dayIndex === 0) return null;
                        const x = padding.left + dayIndex * dayWidth;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: x,
                            y1: padding.top,
                            x2: x,
                            y2: padding.top + graphHeight,
                            className: "stroke-teal-400 dark:stroke-teal-600",
                            strokeWidth: 1,
                            strokeDasharray: "4,4"
                        }, `day-sep-${dayIndex}`, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 283,
                            columnNumber: 18
                        }, ("TURBOPACK compile-time value", void 0));
                    }),
                    displayRecords.map((_, dayIndex)=>TIME_SLOTS.map((_, timeIndex)=>{
                            if (timeIndex === 0) return null;
                            const x = padding.left + dayIndex * dayWidth + timeIndex * timeSlotWidth;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: x,
                                y1: padding.top,
                                x2: x,
                                y2: padding.top + graphHeight,
                                className: "stroke-slate-200 dark:stroke-slate-700",
                                strokeWidth: 0.5
                            }, `time-${dayIndex}-${timeIndex}`, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 290,
                                columnNumber: 20
                            }, ("TURBOPACK compile-time value", void 0));
                        })),
                    [
                        35,
                        36,
                        37,
                        38,
                        39,
                        40,
                        41
                    ].map((temp)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: padding.left,
                                    y1: tempToY(temp),
                                    x2: padding.left + graphWidth,
                                    y2: tempToY(temp),
                                    className: temp === 37 ? 'stroke-emerald-400 dark:stroke-emerald-500' : 'stroke-slate-200 dark:stroke-slate-700',
                                    strokeWidth: temp === 37 ? 1.5 : 0.5,
                                    strokeDasharray: temp === 37 ? '0' : '2,2'
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 296,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: padding.left - 5,
                                    y: tempToY(temp) + 4,
                                    textAnchor: "end",
                                    fontSize: 9,
                                    className: "fill-slate-500 dark:fill-slate-400",
                                    children: temp
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 297,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, `temp-${temp}`, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 295,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))),
                    [
                        40,
                        60,
                        80,
                        100,
                        120,
                        140
                    ].map((pulse, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: padding.left - 28,
                            y: tempToY([
                                35,
                                36,
                                37,
                                38,
                                39,
                                40,
                                41
                            ][idx] || 35) + 4,
                            textAnchor: "end",
                            fontSize: 9,
                            className: "fill-rose-400 dark:fill-rose-300",
                            children: pulse
                        }, `pulse-${pulse}`, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 302,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: padding.left,
                        y1: tempToY(38),
                        x2: padding.left + graphWidth,
                        y2: tempToY(38),
                        className: "stroke-rose-300 dark:stroke-rose-400",
                        strokeWidth: 1,
                        strokeDasharray: "4,2"
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 305,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    tempPath && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: tempPath,
                        fill: "none",
                        className: "stroke-teal-500 dark:stroke-teal-400",
                        strokeWidth: 2,
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 307,
                        columnNumber: 22
                    }, ("TURBOPACK compile-time value", void 0)),
                    tempPoints.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: p.x,
                            cy: p.y,
                            r: dayRange <= 3 ? 5 : 3,
                            className: `cursor-pointer transition-transform hover:scale-125 ${p.value >= 38 ? 'fill-rose-500 dark:fill-rose-400' : 'fill-teal-500 dark:fill-teal-400'}`,
                            onMouseEnter: ()=>setHoveredPoint({
                                    x: p.x,
                                    y: p.y,
                                    data: {
                                        type: 'temp',
                                        ...p
                                    }
                                }),
                            onMouseLeave: ()=>setHoveredPoint(null)
                        }, `temp-pt-${i}`, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 310,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))),
                    pulsePath && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: pulsePath,
                        fill: "none",
                        className: "stroke-rose-400 dark:stroke-rose-300",
                        strokeWidth: 1.5,
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 313,
                        columnNumber: 23
                    }, ("TURBOPACK compile-time value", void 0)),
                    pulsePoints.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            className: "cursor-pointer",
                            onMouseEnter: ()=>setHoveredPoint({
                                    x: p.x,
                                    y: p.y,
                                    data: {
                                        type: 'pulse',
                                        ...p
                                    }
                                }),
                            onMouseLeave: ()=>setHoveredPoint(null),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: p.x - 3,
                                    y1: p.y - 3,
                                    x2: p.x + 3,
                                    y2: p.y + 3,
                                    className: "stroke-rose-400 dark:stroke-rose-300",
                                    strokeWidth: 2
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 317,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: p.x + 3,
                                    y1: p.y - 3,
                                    x2: p.x - 3,
                                    y2: p.y + 3,
                                    className: "stroke-rose-400 dark:stroke-rose-300",
                                    strokeWidth: 2
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 318,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, `pulse-pt-${i}`, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 316,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        transform: `translate(${padding.left + 5}, ${padding.top + 5})`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                x: 0,
                                y: 0,
                                width: 120,
                                height: 22,
                                rx: 4,
                                className: "fill-white/90 dark:fill-slate-800/90",
                                stroke: "currentColor",
                                strokeOpacity: 0.1
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 323,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: 12,
                                cy: 11,
                                r: 4,
                                className: "fill-teal-500 dark:fill-teal-400"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 324,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: 20,
                                y: 14,
                                fontSize: 9,
                                className: "fill-teal-600 dark:fill-teal-300",
                                children: "Temp (°C)"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 325,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                transform: "translate(75, 11)",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: -3,
                                        y1: -3,
                                        x2: 3,
                                        y2: 3,
                                        className: "stroke-rose-400 dark:stroke-rose-300",
                                        strokeWidth: 1.5
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 327,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: 3,
                                        y1: -3,
                                        x2: -3,
                                        y2: 3,
                                        className: "stroke-rose-400 dark:stroke-rose-300",
                                        strokeWidth: 1.5
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 328,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 326,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: 85,
                                y: 14,
                                fontSize: 9,
                                className: "fill-rose-500 dark:fill-rose-300",
                                children: "Pulse"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 330,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            hoveredPoint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bg-slate-800 dark:bg-slate-700 text-white px-2.5 py-1.5 rounded-lg text-xs pointer-events-none z-50 shadow-lg",
                style: {
                    left: hoveredPoint.x,
                    top: hoveredPoint.y - 45,
                    transform: 'translateX(-50%)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-medium",
                        children: [
                            hoveredPoint.data.record.dateShort,
                            " ",
                            hoveredPoint.data.vital.time
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 336,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: hoveredPoint.data.type === 'temp' ? 'text-teal-300' : 'text-rose-300',
                        children: hoveredPoint.data.type === 'temp' ? `${hoveredPoint.data.value}°C` : `${hoveredPoint.data.value} bpm`
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 337,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                lineNumber: 335,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
        lineNumber: 276,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(TPRGraph, "IHq9VLNMLz3UzA/UD32nBEumj7o=");
_c1 = TPRGraph;
// ============================================
// Vitals Table Component
// ============================================
const VitalsTable = ({ records, dayRange })=>{
    const displayRecords = records.slice(0, dayRange).reverse();
    const cellWidth = dayRange <= 3 ? 'w-10' : 'w-8';
    const fontSize = dayRange <= 3 ? 'text-xs' : 'text-[10px]';
    const rows = [
        {
            key: 'rr',
            label: 'Respiratory rate',
            getValue: (v)=>v.respiratoryRate,
            color: 'text-emerald-600 dark:text-emerald-400'
        },
        {
            key: 'sys',
            label: 'BP Systolic',
            getValue: (v)=>v.bpSystolic,
            color: 'text-violet-600 dark:text-violet-400'
        },
        {
            key: 'dia',
            label: '   Diastolic',
            getValue: (v)=>v.bpDiastolic,
            color: 'text-violet-500 dark:text-violet-300'
        },
        {
            key: 'sos',
            label: 'SOS score',
            getValue: (v)=>v.sosScore,
            color: '',
            getColor: (val)=>val !== undefined ? val >= 3 ? 'text-red-600 dark:text-red-400' : val >= 2 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400' : ''
        },
        {
            key: 'o2sat',
            label: 'O₂ saturation',
            getValue: (v)=>v.o2Saturation,
            color: 'text-cyan-600 dark:text-cyan-400',
            getColor: (val)=>val !== undefined && val < 95 ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20' : 'text-cyan-600 dark:text-cyan-400'
        },
        {
            key: 'o2th',
            label: 'O₂ therapy',
            getValue: (v)=>v.o2Therapy,
            color: 'text-slate-500 dark:text-slate-400 text-[9px]'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: `w-full border-collapse ${fontSize}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                children: [
                    rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "py-1.5 px-2 font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 whitespace-nowrap w-24 border-r border-slate-200 dark:border-slate-700",
                                    children: row.label
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 370,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                displayRecords.map((record)=>record.vitals.map((vital, idx)=>{
                                        const val = row.getValue(vital);
                                        const colorClass = row.getColor ? row.getColor(val) : row.color;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: `${cellWidth} text-center py-1.5 border-r border-slate-100 dark:border-slate-700/50 font-medium ${colorClass}`,
                                            children: val ?? '-'
                                        }, `${record.id}-${row.key}-${idx}`, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                            lineNumber: 375,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0));
                                    }))
                            ]
                        }, row.key, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 369,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: "border-b-2 border-amber-200 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "py-2 px-2 font-medium bg-amber-50 dark:bg-amber-900/20 whitespace-nowrap border-r border-slate-200 dark:border-slate-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-amber-700 dark:text-amber-400 font-semibold text-[11px]",
                                        children: "Pain scale"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 385,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-0.5 mt-1",
                                        children: [
                                            2,
                                            4,
                                            6,
                                            8
                                        ].map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `w-1.5 rounded-sm ${l <= 2 ? 'bg-emerald-400 h-1' : l <= 4 ? 'bg-yellow-400 h-1.5' : l <= 6 ? 'bg-amber-400 h-2' : 'bg-red-400 h-2.5'}`
                                            }, l, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 386,
                                                columnNumber: 70
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 386,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 384,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            displayRecords.map((record)=>record.vitals.map((vital, idx)=>{
                                    const pain = vital.painScore;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: `${cellWidth} text-center py-1.5 border-r border-amber-100 dark:border-amber-800/30`,
                                        children: pain !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `font-bold ${pain <= 2 ? 'text-emerald-600 dark:text-emerald-400' : pain <= 4 ? 'text-yellow-600 dark:text-yellow-400' : pain <= 6 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`,
                                                    children: pain
                                                }, void 0, false, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-0.5 overflow-hidden",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `h-full rounded-full ${pain <= 2 ? 'bg-emerald-500' : pain <= 4 ? 'bg-yellow-500' : pain <= 6 ? 'bg-amber-500' : 'bg-red-500'}`,
                                                        style: {
                                                            width: `${pain / 10 * 100}%`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                        lineNumber: 396,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                    lineNumber: 395,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                            lineNumber: 393,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)) : '-'
                                    }, `${record.id}-pain-${idx}`, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 391,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0));
                                }))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 383,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                lineNumber: 367,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
            lineNumber: 366,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
        lineNumber: 365,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = VitalsTable;
// ============================================
// Medication Table Component
// ============================================
const MedicationTable = ({ records, dayRange })=>{
    const displayRecords = records.slice(0, dayRange).reverse();
    const cellWidth = dayRange <= 3 ? 'w-10' : 'w-8';
    const fontSize = dayRange <= 3 ? 'text-xs' : 'text-[10px]';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: `w-full border-collapse ${fontSize}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: "bg-violet-500 dark:bg-violet-600 text-white",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                            colSpan: 1 + displayRecords.length * 6,
                            className: "py-1.5 px-2 font-semibold text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__["Pill"], {
                                    className: "w-3 h-3 inline mr-1.5"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 425,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Medication"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 424,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 423,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    [
                        'continuous dose',
                        'prn dose'
                    ].map((label, rowIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "border-b border-slate-200 dark:border-slate-700 hover:bg-violet-50/30 dark:hover:bg-violet-900/10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "py-1.5 px-2 font-medium text-slate-700 dark:text-slate-300 bg-violet-50 dark:bg-violet-900/20 whitespace-nowrap w-24 border-r border-slate-200 dark:border-slate-700",
                                    children: label
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 430,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                displayRecords.map((record)=>record.medications.map((med, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: `${cellWidth} text-center py-1.5 border-r border-violet-100 dark:border-violet-800/30 text-violet-700 dark:text-violet-300 font-medium`,
                                            children: rowIdx === 0 ? med.continuousDose || '-' : med.prnDose || '-'
                                        }, `${record.id}-med${rowIdx}-${idx}`, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                            lineNumber: 432,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))))
                            ]
                        }, label, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 429,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                lineNumber: 422,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
            lineNumber: 421,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
        lineNumber: 420,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c3 = MedicationTable;
// ============================================
// Fluid Balance Table Component
// ============================================
const FluidTable = ({ records, dayRange })=>{
    const displayRecords = records.slice(0, dayRange).reverse();
    const fontSize = dayRange <= 3 ? 'text-xs' : 'text-[10px]';
    const shiftColSpan = 2;
    const cellWidth = dayRange <= 3 ? 'w-20' : 'w-16';
    const getDayTotals = (record)=>{
        const totalIntake = record.fluids.reduce((sum, f)=>sum + (f.totalIntake || 0), 0);
        const totalOutput = record.fluids.reduce((sum, f)=>sum + (f.totalOutput || 0), 0);
        return {
            totalIntake,
            totalOutput,
            balance: totalIntake - totalOutput
        };
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: `w-full border-collapse ${fontSize}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "bg-slate-100 dark:bg-slate-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "py-1.5 px-2 text-left font-semibold text-slate-700 dark:text-slate-300 w-24 border-r border-slate-200 dark:border-slate-700",
                                    rowSpan: 2,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__["Droplets"], {
                                            className: "w-3.5 h-3.5 inline mr-1 text-cyan-600 dark:text-cyan-400"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                            lineNumber: 466,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "Fluid"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 465,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                displayRecords.map((record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        colSpan: 6,
                                        className: "py-1 text-center font-semibold text-slate-600 dark:text-slate-400 border-r border-slate-300 dark:border-slate-600 border-b border-slate-200 dark:border-slate-700",
                                        children: record.dateShort
                                    }, `h-${record.id}`, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 469,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 464,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "bg-slate-50 dark:bg-slate-800/50",
                            children: displayRecords.map((record)=>SHIFTS.map((shift, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        colSpan: shiftColSpan,
                                        className: `py-1 text-center font-medium border-r ${idx === 2 ? 'border-slate-300 dark:border-slate-600' : 'border-slate-200 dark:border-slate-700'} text-slate-600 dark:text-slate-400`,
                                        children: [
                                            shift.labelTh,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block text-[8px] text-slate-400 dark:text-slate-500",
                                                children: shift.timeRange
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 475,
                                                columnNumber: 32
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, `${record.id}-sh-${idx}`, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 474,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))))
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 472,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                    lineNumber: 463,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "bg-cyan-500 dark:bg-cyan-600 text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                colSpan: 1 + displayRecords.length * 6,
                                className: "py-1 px-2 font-semibold text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__["Droplets"], {
                                        className: "w-3 h-3 inline mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 483,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Fluid Intake (ml)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 482,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 481,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        [
                            'Oral fluid',
                            'Parenteral'
                        ].map((label, rowIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-slate-200 dark:border-slate-700 hover:bg-cyan-50/30 dark:hover:bg-cyan-900/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "py-1.5 px-2 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 whitespace-nowrap border-r border-slate-200 dark:border-slate-700 pl-3 font-medium",
                                        children: label
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 488,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    displayRecords.map((record)=>record.fluids.map((fluid, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: shiftColSpan,
                                                className: `${cellWidth} text-center py-1.5 border-r ${idx === 2 ? 'border-slate-300 dark:border-slate-600' : 'border-slate-200 dark:border-slate-700'} text-cyan-700 dark:text-cyan-300 font-medium`,
                                                children: rowIdx === 0 ? fluid.oralFluid || '-' : fluid.parenteral || '-'
                                            }, `${record.id}-in${rowIdx}-${idx}`, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 490,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))))
                                ]
                            }, label, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 487,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "border-b-2 border-cyan-200 dark:border-cyan-700 bg-cyan-50 dark:bg-cyan-900/20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "py-1.5 px-2 font-bold text-cyan-800 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-800/30 whitespace-nowrap border-r border-slate-200 dark:border-slate-700 pl-3",
                                    children: "Total"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 497,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                displayRecords.map((record)=>record.fluids.map((fluid, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: shiftColSpan,
                                            className: `${cellWidth} text-center py-1.5 border-r ${idx === 2 ? 'border-cyan-200 dark:border-cyan-700' : 'border-cyan-100 dark:border-cyan-800'} text-cyan-800 dark:text-cyan-200 font-bold`,
                                            children: fluid.totalIntake || '-'
                                        }, `${record.id}-tin-${idx}`, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                            lineNumber: 499,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 496,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "bg-amber-500 dark:bg-amber-600 text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                colSpan: 1 + displayRecords.length * 6,
                                className: "py-1 px-2 font-semibold text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$beaker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Beaker$3e$__["Beaker"], {
                                        className: "w-3 h-3 inline mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 505,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Fluid Output (ml)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 504,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 503,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        [
                            'Urine',
                            'Drainage'
                        ].map((label, rowIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-slate-200 dark:border-slate-700 hover:bg-amber-50/30 dark:hover:bg-amber-900/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "py-1.5 px-2 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 whitespace-nowrap border-r border-slate-200 dark:border-slate-700 pl-3 font-medium",
                                        children: label
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 510,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    displayRecords.map((record)=>record.fluids.map((fluid, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: shiftColSpan,
                                                className: `${cellWidth} text-center py-1.5 border-r ${idx === 2 ? 'border-slate-300 dark:border-slate-600' : 'border-slate-200 dark:border-slate-700'} text-amber-700 dark:text-amber-300 font-medium`,
                                                children: rowIdx === 0 ? fluid.urine || '-' : fluid.drainage || '-'
                                            }, `${record.id}-out${rowIdx}-${idx}`, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 512,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))))
                                ]
                            }, label, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 509,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "border-b-2 border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "py-1.5 px-2 font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-800/30 whitespace-nowrap border-r border-slate-200 dark:border-slate-700 pl-3",
                                    children: "Total"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 519,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                displayRecords.map((record)=>record.fluids.map((fluid, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: shiftColSpan,
                                            className: `${cellWidth} text-center py-1.5 border-r ${idx === 2 ? 'border-amber-200 dark:border-amber-700' : 'border-amber-100 dark:border-amber-800'} text-amber-800 dark:text-amber-200 font-bold`,
                                            children: fluid.totalOutput || '-'
                                        }, `${record.id}-tout-${idx}`, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                            lineNumber: 521,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 518,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "border-b border-slate-200 dark:border-slate-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "py-1.5 px-2 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700 font-medium",
                                    children: "Stool"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 526,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                displayRecords.map((record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: 6,
                                        className: "text-center py-1.5 border-r border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400",
                                        children: record.stool || '-'
                                    }, `${record.id}-stool`, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 528,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 525,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "border-b border-slate-200 dark:border-slate-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "py-1.5 px-2 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700 font-medium",
                                    children: "ประเภทผู้ป่วย"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 532,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                displayRecords.map((record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: 6,
                                        className: "text-center py-2 border-r border-slate-300 dark:border-slate-600",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PatientTypeBadge, {
                                            type: record.patientType,
                                            size: "lg"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                            lineNumber: 534,
                                            columnNumber: 132
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, `${record.id}-pt`, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 534,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 531,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "bg-slate-100 dark:bg-slate-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "py-2 px-2 font-bold text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 border-r border-slate-200 dark:border-slate-700",
                                    children: "I/O Balance"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 538,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                displayRecords.map((record)=>{
                                    const t = getDayTotals(record);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: 6,
                                        className: "text-center py-2 border-r border-slate-300 dark:border-slate-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-slate-500 dark:text-slate-400",
                                                children: [
                                                    t.totalIntake,
                                                    " - ",
                                                    t.totalOutput,
                                                    " = "
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 543,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `font-bold ${t.balance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`,
                                                children: [
                                                    t.balance >= 0 ? '+' : '',
                                                    t.balance,
                                                    " ml"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 544,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, `${record.id}-bal`, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 542,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 537,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                    lineNumber: 480,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
            lineNumber: 462,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
        lineNumber: 461,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c4 = FluidTable;
// ============================================
// Patient Info Row
// ============================================
const PatientInfoRow = ({ records, dayRange })=>{
    const displayRecords = records.slice(0, dayRange).reverse();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "w-full border-collapse text-xs",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                    className: "border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                            className: "py-2 px-2 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 whitespace-nowrap w-24 border-r border-slate-200 dark:border-slate-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
                                    className: "w-3.5 h-3.5 inline mr-1 text-emerald-600 dark:text-emerald-400"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 567,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Wt/Ht/Diet"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 566,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        displayRecords.map((record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                colSpan: 6,
                                className: "text-center py-2 border-r border-slate-300 dark:border-slate-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-500 dark:text-slate-400 text-[10px]",
                                        children: "Wt:"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 571,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-slate-700 dark:text-slate-300 ml-0.5",
                                        children: [
                                            record.weight,
                                            "kg"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 572,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-300 dark:text-slate-600 mx-1.5",
                                        children: "/"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 573,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-500 dark:text-slate-400 text-[10px]",
                                        children: "Ht:"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 574,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-slate-700 dark:text-slate-300 ml-0.5",
                                        children: [
                                            record.height,
                                            "cm"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 575,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-300 dark:text-slate-600 mx-1.5",
                                        children: "/"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 576,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 rounded",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Utensils$3e$__["Utensils"], {
                                                className: "w-3 h-3 text-emerald-600 dark:text-emerald-400"
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 578,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-emerald-700 dark:text-emerald-300",
                                                children: record.diet
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 579,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 577,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, `${record.id}-wt`, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 570,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                    lineNumber: 565,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                lineNumber: 564,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
            lineNumber: 563,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
        lineNumber: 562,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c5 = PatientInfoRow;
// ============================================
// Header Row
// ============================================
const HeaderRow = ({ records, dayRange })=>{
    const displayRecords = records.slice(0, dayRange).reverse();
    const cellWidth = dayRange <= 3 ? 'w-10' : 'w-8';
    const fontSize = dayRange <= 3 ? 'text-xs' : 'text-[10px]';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `overflow-x-auto bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-700 dark:to-cyan-700 text-white rounded-t-xl ${fontSize}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "w-full border-collapse",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "py-2 px-2 text-left font-semibold w-24 border-r border-teal-500 dark:border-teal-600",
                                children: "Date"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 604,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            displayRecords.map((record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    colSpan: 6,
                                    className: "py-2 px-1 text-center font-bold border-r border-teal-500 dark:border-teal-600 bg-teal-700/30 dark:bg-teal-800/30",
                                    children: record.date
                                }, `d-${record.id}`, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 606,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 603,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: "bg-teal-700/20 dark:bg-teal-800/20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "py-1 px-2 text-left text-teal-100 font-medium border-r border-teal-500 dark:border-teal-600",
                                children: "Day Admission"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 610,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            displayRecords.map((record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    colSpan: 6,
                                    className: "py-1 px-1 text-center border-r border-teal-500 dark:border-teal-600",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded font-bold text-xs",
                                        children: [
                                            "Day ",
                                            record.dayAdmission
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 613,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, `a-${record.id}`, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 612,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 609,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: "bg-teal-700/10 dark:bg-teal-800/10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "py-1 px-2 text-left text-teal-100 font-medium border-r border-teal-500 dark:border-teal-600",
                                children: "after Operation"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 618,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            displayRecords.map((record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    colSpan: 6,
                                    className: "py-1 px-1 text-center border-r border-teal-500 dark:border-teal-600",
                                    children: record.dayAfterOperation ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-amber-400 dark:bg-amber-500 text-amber-900 dark:text-amber-100 px-2 py-0.5 rounded font-bold text-xs",
                                        children: [
                                            "POD ",
                                            record.dayAfterOperation
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 621,
                                        columnNumber: 45
                                    }, ("TURBOPACK compile-time value", void 0)) : '-'
                                }, `o-${record.id}`, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 620,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 617,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: "bg-teal-800/30 dark:bg-teal-900/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "py-1.5 px-2 text-left font-medium border-r border-teal-500 dark:border-teal-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-teal-200",
                                        children: "Pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 627,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white ml-2",
                                        children: "C°"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 627,
                                        columnNumber: 59
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 626,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            displayRecords.map((record)=>TIME_LABELS.map((time, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: `${cellWidth} py-1.5 text-center font-bold border-r border-teal-500/50 dark:border-teal-600/50`,
                                        children: time
                                    }, `t-${record.id}-${idx}`, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 630,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 625,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                lineNumber: 602,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
            lineNumber: 601,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
        lineNumber: 600,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c6 = HeaderRow;
// ============================================
// Legend Component
// ============================================
const Legend = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-r border-slate-200 dark:border-slate-700 pr-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-bold text-slate-700 dark:text-slate-300 mb-2",
                                children: "ประเภทผู้ป่วย :"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 647,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-2 text-xs",
                                children: Object.entries(PATIENT_TYPES).map(([key, cfg])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `${cfg.bg} text-white px-2 py-0.5 rounded font-semibold text-[10px]`,
                                                children: key
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 651,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-600 dark:text-slate-400",
                                                children: [
                                                    "= ",
                                                    cfg.fullLabel
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 652,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, key, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 650,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 648,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 646,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-bold text-slate-700 dark:text-slate-300 mb-2",
                                children: "Medication :"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 658,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-x-4 gap-y-1 text-xs",
                                children: MEDICATION_CODES.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-violet-600 dark:text-violet-400 font-bold min-w-[20px]",
                                                children: m.code
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 662,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-600 dark:text-slate-400",
                                                children: [
                                                    "= ",
                                                    m.name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 663,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, m.code, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 661,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 659,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 657,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                lineNumber: 645,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-center gap-6 text-xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-3 h-3 rounded-full bg-teal-500 dark:bg-teal-400"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 670,
                                columnNumber: 50
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-teal-700 dark:text-teal-300",
                                children: "= Temperature"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 670,
                                columnNumber: 119
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 670,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-rose-400 dark:text-rose-300 font-bold",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 671,
                                columnNumber: 50
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-rose-600 dark:text-rose-300",
                                children: "= Pulse"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 671,
                                columnNumber: 119
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 671,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-4 h-0.5 bg-emerald-400 dark:bg-emerald-500"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 672,
                                columnNumber: 50
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-emerald-600 dark:text-emerald-400",
                                children: "= 37°C line"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 672,
                                columnNumber: 114
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 672,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                lineNumber: 669,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
        lineNumber: 644,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c7 = Legend;
// ============================================
// Day Range Selector
// ============================================
const DayRangeSelector = ({ value, onChange })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center bg-slate-100 dark:bg-slate-700 rounded-xl p-1",
        children: DAY_RANGE_OPTIONS.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onChange(opt.value),
                className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${value === opt.value ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-600'}`,
                children: opt.label
            }, opt.value, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                lineNumber: 684,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
        lineNumber: 682,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c8 = DayRangeSelector;
// ============================================
// Fullscreen TPR Chart
// ============================================
const FullscreenTPRChart = ({ records, initialDayRange = 7, onClose })=>{
    _s1();
    const [dayRange, setDayRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialDayRange);
    const [startIndex, setStartIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveSuccess, setSaveSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const displayedRecords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FullscreenTPRChart.useMemo[displayedRecords]": ()=>records.slice(startIndex, startIndex + dayRange)
    }["FullscreenTPRChart.useMemo[displayedRecords]"], [
        records,
        startIndex,
        dayRange
    ]);
    const canGoBack = startIndex + dayRange < records.length;
    const canGoForward = startIndex > 0;
    const handleGoBack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FullscreenTPRChart.useCallback[handleGoBack]": ()=>{
            if (canGoBack) setStartIndex({
                "FullscreenTPRChart.useCallback[handleGoBack]": (prev)=>Math.min(prev + 1, records.length - dayRange)
            }["FullscreenTPRChart.useCallback[handleGoBack]"]);
        }
    }["FullscreenTPRChart.useCallback[handleGoBack]"], [
        canGoBack,
        records.length,
        dayRange
    ]);
    const handleGoForward = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FullscreenTPRChart.useCallback[handleGoForward]": ()=>{
            if (canGoForward) setStartIndex({
                "FullscreenTPRChart.useCallback[handleGoForward]": (prev)=>Math.max(prev - 1, 0)
            }["FullscreenTPRChart.useCallback[handleGoForward]"]);
        }
    }["FullscreenTPRChart.useCallback[handleGoForward]"], [
        canGoForward
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FullscreenTPRChart.useEffect": ()=>{
            if (startIndex + dayRange > records.length) setStartIndex(Math.max(0, records.length - dayRange));
        }
    }["FullscreenTPRChart.useEffect"], [
        dayRange,
        records.length,
        startIndex
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FullscreenTPRChart.useEffect": ()=>{
            const handleKeyDown = {
                "FullscreenTPRChart.useEffect.handleKeyDown": (e)=>{
                    if (e.key === 'Escape') onClose();
                    if (e.key === 'ArrowLeft') handleGoBack();
                    if (e.key === 'ArrowRight') handleGoForward();
                }
            }["FullscreenTPRChart.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "FullscreenTPRChart.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["FullscreenTPRChart.useEffect"];
        }
    }["FullscreenTPRChart.useEffect"], [
        onClose,
        handleGoBack,
        handleGoForward
    ]);
    const handleSave = async ()=>{
        setIsSaving(true);
        await new Promise((r)=>setTimeout(r, 1000));
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(()=>setSaveSuccess(false), 2000);
    };
    const dateRangeText = displayedRecords.length > 0 ? `${displayedRecords[displayedRecords.length - 1]?.dateShort} - ${displayedRecords[0]?.dateShort}` : '';
    const canvasWidth = 150 + dayRange * 6 * (dayRange <= 3 ? 42 : 34);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 rounded-xl transition-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 731,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium hidden sm:inline",
                                        children: "กลับ"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 731,
                                        columnNumber: 46
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 730,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 734,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 733,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "font-bold text-slate-800 dark:text-white text-base",
                                        children: "ฟอร์มปรอท - TPR Chart"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 737,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-500 dark:text-slate-400",
                                        children: [
                                            dayRange,
                                            " วัน • ",
                                            dateRangeText
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 738,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 736,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 729,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleGoBack,
                                disabled: !canGoBack,
                                className: `p-2 rounded-lg ${canGoBack ? 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300' : 'text-slate-300 dark:text-slate-600 cursor-not-allowed'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 743,
                                    columnNumber: 246
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 743,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DayRangeSelector, {
                                value: dayRange,
                                onChange: setDayRange
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 744,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleGoForward,
                                disabled: !canGoForward,
                                className: `p-2 rounded-lg ${canGoForward ? 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300' : 'text-slate-300 dark:text-slate-600 cursor-not-allowed'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 745,
                                    columnNumber: 255
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 745,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 742,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg p-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setZoom((p)=>Math.max(p - 0.1, 0.5)),
                                        className: "w-7 h-7 rounded flex items-center justify-center hover:bg-white dark:hover:bg-slate-600",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__["ZoomOut"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                            lineNumber: 750,
                                            columnNumber: 174
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 750,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-12 text-center text-xs font-medium text-slate-600 dark:text-slate-300",
                                        children: [
                                            Math.round(zoom * 100),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 751,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setZoom((p)=>Math.min(p + 0.1, 2)),
                                        className: "w-7 h-7 rounded flex items-center justify-center hover:bg-white dark:hover:bg-slate-600",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                            lineNumber: 752,
                                            columnNumber: 172
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 752,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 749,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>window.print(),
                                className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                    className: "w-5 h-5 text-slate-500 dark:text-slate-400"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 754,
                                    columnNumber: 120
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 754,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                    className: "w-5 h-5 text-slate-500 dark:text-slate-400"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 755,
                                    columnNumber: 89
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 755,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSave,
                                disabled: isSaving,
                                className: `h-9 px-4 flex items-center gap-2 rounded-xl font-medium text-sm ${saveSuccess ? 'bg-emerald-500 text-white' : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'}`,
                                children: [
                                    isSaving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "w-4 h-4 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 757,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)) : saveSuccess ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 757,
                                        columnNumber: 86
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 757,
                                        columnNumber: 118
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        children: saveSuccess ? 'บันทึกแล้ว' : 'บันทึก'
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 758,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 756,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5 text-slate-500 dark:text-slate-400"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 760,
                                    columnNumber: 106
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 760,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 748,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                lineNumber: 728,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-slate-800 shadow-xl rounded-2xl mx-auto border border-slate-200 dark:border-slate-700",
                    style: {
                        width: `${Math.max(canvasWidth, 900)}px`,
                        transform: `scale(${zoom})`,
                        transformOrigin: 'top center'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-3 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-b border-slate-200 dark:border-slate-700 rounded-t-2xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-lg font-bold text-teal-700 dark:text-teal-300",
                                    children: "ฟอร์มปรอท โรงพยาบาล"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 767,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-500 dark:text-slate-400",
                                    children: "TPR Chart - Temperature, Pulse, Respiration"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 768,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 766,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-500 dark:text-slate-400",
                                                children: "ชื่อ:"
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 773,
                                                columnNumber: 20
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-slate-800 dark:text-slate-200",
                                                children: "นายสมชาย ใจดี"
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 773,
                                                columnNumber: 86
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 773,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-500 dark:text-slate-400",
                                                children: "HN:"
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 774,
                                                columnNumber: 20
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono font-semibold text-slate-800 dark:text-slate-200",
                                                children: "6712345"
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 774,
                                                columnNumber: 84
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 774,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-500 dark:text-slate-400",
                                                children: "AN:"
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 775,
                                                columnNumber: 20
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono font-semibold text-slate-800 dark:text-slate-200",
                                                children: "670001234"
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 775,
                                                columnNumber: 84
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 775,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-500 dark:text-slate-400",
                                                children: "Ward:"
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 776,
                                                columnNumber: 20
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-slate-800 dark:text-slate-200",
                                                children: "อายุรกรรม ชาย 1"
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                lineNumber: 776,
                                                columnNumber: 86
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 776,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 772,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 771,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeaderRow, {
                            records: displayedRecords,
                            dayRange: dayRange
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 780,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-b border-slate-200 dark:border-slate-700 p-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TPRGraph, {
                                records: displayedRecords,
                                dayRange: dayRange,
                                width: Math.max(canvasWidth - 20, 880),
                                height: 280
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 781,
                                columnNumber: 80
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 781,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VitalsTable, {
                            records: displayedRecords,
                            dayRange: dayRange
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 782,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MedicationTable, {
                            records: displayedRecords,
                            dayRange: dayRange
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 783,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PatientInfoRow, {
                            records: displayedRecords,
                            dayRange: dayRange
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 784,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FluidTable, {
                            records: displayedRecords,
                            dayRange: dayRange
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 785,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Legend, {}, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 786,
                                columnNumber: 32
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 786,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                    lineNumber: 765,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                lineNumber: 764,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-800 dark:bg-slate-700 text-white px-4 py-2 rounded-full text-sm shadow-xl flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-slate-300",
                        children: "← → เลื่อนวัน"
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 791,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-slate-500",
                        children: "|"
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 792,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-slate-300",
                        children: "ESC ปิด"
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 793,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                lineNumber: 790,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
        lineNumber: 727,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(FullscreenTPRChart, "7urRwPGIUMCI81PpFUDqL3uYgLg=");
_c9 = FullscreenTPRChart;
function TPRChartTab() {
    _s2();
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dayRange, setDayRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(7);
    const latestRecord = mockTPRRecords[0];
    const latestVitals = latestRecord.vitals[latestRecord.vitals.length - 1];
    if (isFullscreen) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FullscreenTPRChart, {
        records: mockTPRRecords,
        initialDayRange: dayRange,
        onClose: ()=>setIsFullscreen(false)
    }, void 0, false, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
        lineNumber: 810,
        columnNumber: 28
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-teal-50/50 dark:from-slate-800 dark:to-teal-900/20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/20",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                        lineNumber: 818,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 817,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "font-bold text-slate-800 dark:text-white text-base",
                                            children: "ฟอร์มปรอท - TPR Chart"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                            lineNumber: 821,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-slate-500 dark:text-slate-400",
                                            children: "Temperature, Pulse, Respiration Record"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                            lineNumber: 822,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 820,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 816,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden md:flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-3 py-1.5 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thermometer$2d$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThermometerSun$3e$__["ThermometerSun"], {
                                                    className: "w-4 h-4 text-teal-600 dark:text-teal-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                    lineNumber: 828,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-bold text-teal-700 dark:text-teal-300",
                                                    children: [
                                                        latestVitals?.temperature?.toFixed(1),
                                                        "°C"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                    lineNumber: 829,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                            lineNumber: 827,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-3 py-1.5 bg-rose-100 dark:bg-rose-900/30 rounded-lg flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                    className: "w-4 h-4 text-rose-500 dark:text-rose-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                    lineNumber: 832,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-bold text-rose-600 dark:text-rose-300",
                                                    children: [
                                                        latestVitals?.pulse,
                                                        " bpm"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                                    lineNumber: 833,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                            lineNumber: 831,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PatientTypeBadge, {
                                            type: latestRecord.patientType,
                                            size: "lg"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                            lineNumber: 835,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 826,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsFullscreen(true),
                                    className: "px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all hover:scale-105",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                            lineNumber: 838,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hidden md:inline",
                                            children: "ดูฟอร์มเต็ม"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                            lineNumber: 838,
                                            columnNumber: 48
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 837,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 825,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                    lineNumber: 815,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                lineNumber: 814,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                className: "w-4 h-4 text-teal-500"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 846,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium text-slate-700 dark:text-slate-300",
                                children: "แสดงแนวโน้ม"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                lineNumber: 847,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 845,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DayRangeSelector, {
                        value: dayRange,
                        onChange: setDayRange
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                        lineNumber: 849,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                lineNumber: 844,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TPRGraph, {
                    records: mockTPRRecords.slice(0, dayRange),
                    dayRange: dayRange,
                    width: dayRange === 1 ? 500 : dayRange === 3 ? 650 : dayRange === 5 ? 800 : 950,
                    height: 200
                }, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                    lineNumber: 853,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                lineNumber: 852,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between text-xs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 text-slate-500 dark:text-slate-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "ข้อมูล ",
                                        mockTPRRecords.length,
                                        " วัน"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 859,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-slate-300 dark:text-slate-600",
                                    children: "|"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 860,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "ล่าสุด: ",
                                        latestRecord.date
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 861,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-slate-300 dark:text-slate-600",
                                    children: "|"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 862,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Day ",
                                        latestRecord.dayAdmission
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 863,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 858,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsFullscreen(true),
                            className: "flex items-center gap-1 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium",
                            children: [
                                "ดูรายละเอียด",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                                    lineNumber: 866,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                            lineNumber: 865,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                    lineNumber: 857,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
                lineNumber: 856,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/TPRChartTab.tsx",
        lineNumber: 813,
        columnNumber: 5
    }, this);
}
_s2(TPRChartTab, "3TTsCsEunRPFVbsc/uNVug58Z/g=");
_c10 = TPRChartTab;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "PatientTypeBadge");
__turbopack_context__.k.register(_c1, "TPRGraph");
__turbopack_context__.k.register(_c2, "VitalsTable");
__turbopack_context__.k.register(_c3, "MedicationTable");
__turbopack_context__.k.register(_c4, "FluidTable");
__turbopack_context__.k.register(_c5, "PatientInfoRow");
__turbopack_context__.k.register(_c6, "HeaderRow");
__turbopack_context__.k.register(_c7, "Legend");
__turbopack_context__.k.register(_c8, "DayRangeSelector");
__turbopack_context__.k.register(_c9, "FullscreenTPRChart");
__turbopack_context__.k.register(_c10, "TPRChartTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=his-web_src_app_ipd_%5Ban%5D__components_TPRChartTab_tsx_f6325f5e._.js.map