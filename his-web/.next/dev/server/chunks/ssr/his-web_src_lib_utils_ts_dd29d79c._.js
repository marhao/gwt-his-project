module.exports = [
"[project]/his-web/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateWorkMinutes",
    ()=>calculateWorkMinutes,
    "cn",
    ()=>cn,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDisplayDate",
    ()=>formatDisplayDate,
    "formatNumber",
    ()=>formatNumber,
    "formatThaiDate",
    ()=>formatThaiDate,
    "formatThaiID",
    ()=>formatThaiID,
    "formatWorkHours",
    ()=>formatWorkHours,
    "getCurrentBangkokDate",
    ()=>getCurrentBangkokDate,
    "getDisplayValue",
    ()=>getDisplayValue,
    "getStatusDisplay",
    ()=>getStatusDisplay,
    "isFutureDate",
    ()=>isFutureDate,
    "isTodayInBangkok",
    ()=>isTodayInBangkok
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
}
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}
function formatThaiID(value) {
    const cleanValue = value.endsWith('-') ? value.slice(0, -1) : value;
    const numbers = cleanValue.replace(/\D/g, '').slice(0, 13);
    let formatted = '';
    for(let i = 0; i < numbers.length; i++){
        if (i === 1 || i === 5 || i === 10 || i === 12) formatted += '-';
        formatted += numbers[i];
    }
    return formatted;
}
const formatThaiDate = (dateStr, showTime = false)=>{
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    const options = {
        timeZone: 'Asia/Bangkok',
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    };
    if (showTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.hour12 = false; // Use 24-hour format
    }
    const formatted = date.toLocaleDateString('th-TH', options);
    return formatted.replace(/(\d{2})\s(\S+)\s(\d{4})/, '$1 $2 $3'); // Ensure consistent format
};
const formatDisplayDate = (dateStr)=>{
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('th-TH', {
        timeZone: 'Asia/Bangkok',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};
const getCurrentBangkokDate = ()=>{
    return new Date().toLocaleDateString('en-CA', {
        timeZone: 'Asia/Bangkok',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};
const isTodayInBangkok = (dateStr)=>{
    if (!dateStr) return false;
    return dateStr.split('T')[0] === getCurrentBangkokDate();
};
const isFutureDate = (dateStr)=>{
    if (!dateStr) return false;
    return dateStr.split('T')[0] > getCurrentBangkokDate();
};
const calculateWorkMinutes = (checkIn, checkOut)=>{
    try {
        const inTime = new Date(`2000-01-01T${checkIn}`);
        const outTime = new Date(`2000-01-01T${checkOut}`);
        if (outTime < inTime) outTime.setDate(outTime.getDate() + 1);
        const diffMs = outTime.getTime() - inTime.getTime();
        return Math.max(0, Math.floor(diffMs / (1000 * 60)));
    } catch  {
        return 0;
    }
};
const formatWorkHours = (minutes)=>{
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hours} ชม.` : `${hours} ชม. ${mins} น.`;
};
const getStatusDisplay = (status, isDarkMode)=>{
    const styles = {
        Present: {
            icon: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                className: "w-4 h-4 text-green-600"
            }),
            text: 'เข้างาน',
            color: isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
        },
        Late: {
            icon: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                className: "w-4 h-4 text-orange-600"
            }),
            text: 'สาย',
            color: isDarkMode ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-800'
        },
        Absent: {
            icon: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                className: "w-4 h-4 text-red-600"
            }),
            text: 'ขาด',
            color: isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
        },
        Incomplete: {
            icon: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                className: "w-4 h-4 text-blue-600"
            }),
            text: 'ไม่สมบูรณ์',
            color: isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
        }
    };
    return styles[status] || {
        icon: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
            className: "w-4 h-4 text-gray-600"
        }),
        text: 'ไม่ทราบ',
        color: isDarkMode ? 'bg-gray-700/50 text-gray-400' : 'bg-gray-100 text-gray-800'
    };
};
const getDisplayValue = (val)=>{
    const displayMap = {
        all: 'ทุกสถานะ',
        Present: 'เข้างาน',
        Late: 'สาย',
        Absent: 'ขาด',
        Incomplete: 'ไม่สมบูรณ์',
        morning: 'เวรเช้า',
        afternoon: 'เวรบ่าย',
        night: 'เวรดึก'
    };
    return displayMap[val] || val;
};
}),
];

//# sourceMappingURL=his-web_src_lib_utils_ts_dd29d79c._.js.map