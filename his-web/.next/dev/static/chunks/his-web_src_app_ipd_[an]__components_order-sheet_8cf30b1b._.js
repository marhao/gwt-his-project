(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/his-web/src/app/ipd/[an]/_components/order-sheet/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ============================================
// Types & Interfaces
// ============================================
__turbopack_context__.s([
    "frequencyOptions",
    ()=>frequencyOptions,
    "getCurrentDateTime",
    ()=>getCurrentDateTime,
    "getRouteColor",
    ()=>getRouteColor,
    "instructionList",
    ()=>instructionList,
    "labList",
    ()=>labList,
    "medicationList",
    ()=>medicationList,
    "routeOptions",
    ()=>routeOptions,
    "treatmentList",
    ()=>treatmentList
]);
const medicationList = [
    {
        name: 'NSS 0.9% 1000ml',
        defaultDose: 'IV drip over 8 hours',
        defaultFreq: 'TID',
        defaultRoute: 'IV'
    },
    {
        name: 'Paracetamol 500mg',
        defaultDose: '1-2 tab',
        defaultFreq: 'Q6H PRN',
        defaultRoute: 'PO'
    },
    {
        name: 'Omeprazole 40mg IV',
        defaultDose: '1 vial',
        defaultFreq: 'OD',
        defaultRoute: 'IV'
    },
    {
        name: 'Morphine 10mg',
        defaultDose: '0.5-1 amp',
        defaultFreq: 'Q4H PRN',
        defaultRoute: 'IV'
    },
    {
        name: 'Aspirin 81mg',
        defaultDose: '1 tab',
        defaultFreq: 'OD PC',
        defaultRoute: 'PO'
    },
    {
        name: 'Clopidogrel 75mg',
        defaultDose: '1 tab',
        defaultFreq: 'OD PC',
        defaultRoute: 'PO'
    },
    {
        name: 'Atorvastatin 40mg',
        defaultDose: '1 tab',
        defaultFreq: 'OD HS',
        defaultRoute: 'PO'
    },
    {
        name: 'Enoxaparin 60mg',
        defaultDose: '1 prefilled',
        defaultFreq: 'BID',
        defaultRoute: 'SC'
    }
];
const labList = [
    {
        name: 'CBC',
        description: 'Complete Blood Count'
    },
    {
        name: 'BUN, Cr',
        description: 'Kidney Function'
    },
    {
        name: 'Electrolyte',
        description: 'Na, K, Cl, CO2'
    },
    {
        name: 'Cardiac enzyme',
        description: 'Troponin-T, CK-MB'
    },
    {
        name: 'LFT',
        description: 'Liver Function Test'
    },
    {
        name: 'Coagulogram',
        description: 'PT, PTT, INR'
    },
    {
        name: 'Lipid Profile',
        description: 'Cholesterol, TG, HDL, LDL'
    }
];
const treatmentList = [
    {
        name: 'Oxygen Cannula',
        defaultDose: '2-4 L/min'
    },
    {
        name: 'EKG Monitor',
        defaultDose: 'Continuous'
    },
    {
        name: 'Foley catheter',
        defaultDose: 'Strict I/O'
    },
    {
        name: 'IV access',
        defaultDose: 'Hep-lock'
    },
    {
        name: 'NPO',
        defaultDose: 'Nothing by mouth'
    }
];
const instructionList = [
    'รับประทานก่อนอาหาร 30 นาที',
    'รับประทานหลังอาหารทันที',
    'รับประทานก่อนนอน',
    'ฉีดเข้าใต้ผิวหนังบริเวณหน้าท้อง',
    'ห้ามบดหรือเคี้ยว'
];
const frequencyOptions = [
    'OD',
    'BID',
    'TID',
    'QID',
    'Q4H',
    'Q6H',
    'Q8H',
    'Q6H PRN',
    'Q4H PRN',
    'STAT',
    'Continuous',
    'OD PC',
    'OD HS'
];
const routeOptions = [
    'PO',
    'IV',
    'IM',
    'SC',
    'SL',
    'PR',
    'Topical',
    'Inhalation'
];
const getRouteColor = (route)=>{
    const colors = {
        IV: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400',
        PO: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
        IM: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
        SC: 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
    };
    return colors[route] || 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300';
};
const getCurrentDateTime = ()=>({
        date: new Date().toLocaleDateString('th-TH', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }).replace(/\//g, '/'),
        time: new Date().toLocaleTimeString('th-TH', {
            hour: '2-digit',
            minute: '2-digit'
        })
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AutocompleteInput",
    ()=>AutocompleteInput,
    "CollapsedColumn",
    ()=>CollapsedColumn,
    "PanelHeader",
    ()=>PanelHeader,
    "Splitter",
    ()=>Splitter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function AutocompleteInput({ value, onChange, onSelect, options, placeholder, className = '' }) {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value || '');
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AutocompleteInput.useEffect": ()=>{
            setSearchQuery(value || '');
        }
    }["AutocompleteInput.useEffect"], [
        value
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AutocompleteInput.useEffect": ()=>{
            const handleClickOutside = {
                "AutocompleteInput.useEffect.handleClickOutside": (e)=>{
                    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                        setIsOpen(false);
                    }
                }
            }["AutocompleteInput.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "AutocompleteInput.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["AutocompleteInput.useEffect"];
        }
    }["AutocompleteInput.useEffect"], []);
    const filteredOptions = options.filter((opt)=>(typeof opt === 'string' ? opt : opt.name).toLowerCase().includes(searchQuery.toLowerCase()));
    const handleSelect = (opt)=>{
        const name = typeof opt === 'string' ? opt : opt.name;
        setSearchQuery(name);
        onChange(name);
        onSelect?.(opt);
        setIsOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: dropdownRef,
        className: `relative ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: searchQuery,
                        onChange: (e)=>{
                            setSearchQuery(e.target.value);
                            onChange(e.target.value);
                            setIsOpen(true);
                        },
                        onFocus: ()=>setIsOpen(true),
                        placeholder: placeholder,
                        className: "w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            isOpen && filteredOptions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-52 overflow-y-auto",
                children: filteredOptions.slice(0, 8).map((opt, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>handleSelect(opt),
                        className: "w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-medium",
                                children: typeof opt === 'string' ? opt : opt.name
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                                lineNumber: 86,
                                columnNumber: 15
                            }, this),
                            typeof opt !== 'string' && (opt.description || opt.defaultDose) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-500 dark:text-slate-400",
                                children: opt.description || opt.defaultDose
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                                lineNumber: 90,
                                columnNumber: 17
                            }, this)
                        ]
                    }, idx, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                        lineNumber: 80,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_s(AutocompleteInput, "TU/hML89rngLFof3loevp9Q8rRc=");
_c = AutocompleteInput;
function Splitter({ index, onMouseDown, isDragging }) {
    const isActive = isDragging === index;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onMouseDown: onMouseDown(index),
        className: `hidden lg:flex w-2 flex-col items-center justify-center cursor-col-resize transition-colors shrink-0 ${isActive ? 'bg-blue-500' : 'bg-slate-300/80 dark:bg-slate-600/80 hover:bg-blue-400 dark:hover:bg-blue-500'}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-1",
            children: [
                ...Array(6)
            ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `w-1 h-1 rounded-full ${isActive ? 'bg-white' : 'bg-slate-500'}`
                }, i, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                    lineNumber: 126,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
            lineNumber: 124,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
_c1 = Splitter;
function CollapsedColumn({ title, icon: Icon, color, count, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: onClick,
        className: "hidden lg:flex w-12 flex-col items-center py-4 cursor-pointer transition-all hover:w-14 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: `p-2 rounded-xl ${color} mb-2`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    className: "w-4 h-4 text-white"
                }, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs font-bold text-center text-slate-600 dark:text-slate-300",
                style: {
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed'
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mt-2 px-1.5 py-0.5 rounded text-xs font-bold bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300",
                children: count
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                className: "w-4 h-4 mt-2 text-slate-400"
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
_c2 = CollapsedColumn;
function PanelHeader({ title, icon: Icon, iconBgColor, count, badgeColor, headerBgColor, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `sticky top-0 z-10 px-4 py-3 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between ${headerBgColor} backdrop-blur-sm`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-1.5 rounded-lg ${iconBgColor}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            className: "w-4 h-4 text-white"
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-bold text-slate-800 dark:text-white",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `px-2 py-0.5 rounded text-xs font-bold ${badgeColor}`,
                        children: count
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            children && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1",
                children: children
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
                lineNumber: 206,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx",
        lineNumber: 195,
        columnNumber: 5
    }, this);
}
_c3 = PanelHeader;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "AutocompleteInput");
__turbopack_context__.k.register(_c1, "Splitter");
__turbopack_context__.k.register(_c2, "CollapsedColumn");
__turbopack_context__.k.register(_c3, "PanelHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProgressNotePanel",
    ()=>ProgressNotePanel,
    "ProgressNotePanelMobile",
    ()=>ProgressNotePanelMobile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftClose$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/panel-left-close.js [app-client] (ecmascript) <export default as PanelLeftClose>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/ban.js [app-client] (ecmascript) <export default as Ban>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/pen-line.js [app-client] (ecmascript) <export default as Edit3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$shared$2d$components$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function SOAPForm({ newNote, setNewNote, onSave, isCollapsed, setIsCollapsed }) {
    const hasDraft = newNote.subjective || newNote.objective || newNote.assessment || newNote.plan;
    const soapFields = [
        {
            key: 'subjective',
            letter: 'S',
            color: 'bg-blue-500',
            label: 'Subjective'
        },
        {
            key: 'objective',
            letter: 'O',
            color: 'bg-purple-500',
            label: 'Objective'
        },
        {
            key: 'assessment',
            letter: 'A',
            color: 'bg-emerald-500',
            label: 'Assessment'
        },
        {
            key: 'plan',
            letter: 'P',
            color: 'bg-amber-500',
            label: 'Plan'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `border border-slate-200/50 dark:border-slate-700/50 rounded-xl overflow-hidden ${!isCollapsed ? 'bg-blue-50/30 dark:bg-blue-500/5' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-blue-100/50 dark:hover:bg-slate-700/50 transition-colors",
                onClick: ()=>setIsCollapsed(!isCollapsed),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__["Edit3"], {
                                className: "w-4 h-4 text-blue-500"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-semibold text-slate-700 dark:text-slate-200",
                                children: "เขียน Progress Note"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            isCollapsed && hasDraft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-1.5 py-0.5 bg-blue-500 text-white text-[10px] rounded font-bold",
                                children: "มี Draft"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-slate-400",
                                children: "คลิกเพื่อย่อ"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this),
                            isCollapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                className: "w-4 h-4 text-slate-400"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                className: "w-4 h-4 text-slate-400"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-t border-slate-200/50 dark:border-slate-700/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: soapFields.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `w-5 h-5 ${item.color} rounded text-white text-xs flex items-center justify-center font-bold`,
                                                children: item.letter
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                                lineNumber: 70,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                                lineNumber: 73,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                        lineNumber: 69,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: newNote[item.key],
                                        onChange: (e)=>setNewNote({
                                                ...newNote,
                                                [item.key]: e.target.value
                                            }),
                                        className: "w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white resize-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all",
                                        rows: 2,
                                        placeholder: `${item.label}...`
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                        lineNumber: 75,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, item.key, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 68,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onSave,
                        className: "w-full mt-3 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this),
                            " Save Note"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                lineNumber: 65,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c = SOAPForm;
function NoteCard({ note, index, total }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 rounded-xl bg-white/80 dark:bg-slate-700/50 border border-slate-200/50 dark:border-slate-600/50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-bold text-blue-600 dark:text-blue-400",
                        children: [
                            "#",
                            total - index,
                            " • ",
                            note.date,
                            " ",
                            note.time
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-slate-500",
                        children: note.author
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            note.vitalSigns && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm mb-3 p-2.5 rounded-lg bg-slate-100/80 dark:bg-slate-600/50 text-slate-600 dark:text-slate-300",
                children: [
                    "BP ",
                    note.vitalSigns.bp,
                    " | HR ",
                    note.vitalSigns.hr,
                    " | T ",
                    note.vitalSigns.temp,
                    "°C | O2 ",
                    note.vitalSigns.o2sat,
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                lineNumber: 120,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 text-sm",
                children: [
                    note.subjective && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-blue-500",
                                children: "S:"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this),
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-600 dark:text-slate-300",
                                children: note.subjective
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this),
                    note.objective && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-purple-500",
                                children: "O:"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 135,
                                columnNumber: 13
                            }, this),
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-600 dark:text-slate-300 whitespace-pre-line",
                                children: note.objective
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, this),
                    note.assessment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-emerald-500",
                                children: "A:"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, this),
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-600 dark:text-slate-300 whitespace-pre-line",
                                children: note.assessment
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                        lineNumber: 140,
                        columnNumber: 11
                    }, this),
                    note.plan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-amber-500",
                                children: "P:"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this),
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-600 dark:text-slate-300 whitespace-pre-line",
                                children: note.plan
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                        lineNumber: 146,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_c1 = NoteCard;
function DiscontinuedOrders({ orders }) {
    if (orders.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-2 text-sm font-semibold text-slate-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__["Ban"], {
                        className: "w-4 h-4"
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    "Discontinued (",
                    orders.length,
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 rounded-xl bg-slate-100/80 dark:bg-slate-700/30",
                children: orders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-2 border-b border-slate-200 dark:border-slate-600 last:border-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm line-through text-slate-500",
                                children: order.name
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 176,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-400 mt-1",
                                children: [
                                    "DC: ",
                                    order.endDate,
                                    " ",
                                    order.endTime,
                                    " • ",
                                    order.dcBy,
                                    " • ",
                                    order.dcReason
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                                lineNumber: 177,
                                columnNumber: 13
                            }, this)
                        ]
                    }, order.id, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                        lineNumber: 175,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
_c2 = DiscontinuedOrders;
function ProgressNotePanel({ progressNotes, setProgressNotes, discontinuedOrders, isOpen, onClose, flex }) {
    _s();
    const [soapFormCollapsed, setSoapFormCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newNote, setNewNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        subjective: '',
        objective: '',
        assessment: '',
        plan: ''
    });
    const saveProgressNote = ()=>{
        if (!newNote.subjective && !newNote.objective && !newNote.assessment && !newNote.plan) {
            return;
        }
        const { date, time } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentDateTime"])();
        const note = {
            id: Date.now(),
            date,
            time,
            author: 'นพ.วิชัย หัวใจดี',
            ...newNote,
            vitalSigns: {
                bp: '125/78',
                hr: 72,
                rr: 18,
                temp: 36.8,
                o2sat: 98
            }
        };
        setProgressNotes((prev)=>[
                note,
                ...prev
            ]);
        setNewNote({
            subjective: '',
            objective: '',
            assessment: '',
            plan: ''
        });
    };
    // Collapsed State
    if (!isOpen) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$shared$2d$components$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollapsedColumn"], {
            title: "Progress Note",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"],
            color: "bg-blue-500",
            count: progressNotes.length,
            onClick: onClose
        }, void 0, false, {
            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
            lineNumber: 238,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-column": "1",
        className: "flex flex-col bg-blue-50/30 dark:bg-slate-800/50 overflow-hidden min-w-[200px]",
        style: {
            flex
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$shared$2d$components$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PanelHeader"], {
                title: "Progress Note",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"],
                iconBgColor: "bg-blue-500",
                count: progressNotes.length,
                badgeColor: "bg-blue-200 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400",
                headerBgColor: "bg-blue-100/80 dark:bg-slate-800/90",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "p-1.5 rounded hover:bg-blue-200 dark:hover:bg-slate-700",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftClose$3e$__["PanelLeftClose"], {
                        className: "w-4 h-4 text-slate-400"
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                        lineNumber: 267,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                    lineNumber: 263,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                lineNumber: 255,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-4 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SOAPForm, {
                        newNote: newNote,
                        setNewNote: setNewNote,
                        onSave: saveProgressNote,
                        isCollapsed: soapFormCollapsed,
                        setIsCollapsed: setSoapFormCollapsed
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                        lineNumber: 274,
                        columnNumber: 9
                    }, this),
                    progressNotes.map((note, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NoteCard, {
                            note: note,
                            index: idx,
                            total: progressNotes.length
                        }, note.id, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                            lineNumber: 284,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DiscontinuedOrders, {
                        orders: discontinuedOrders
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                lineNumber: 272,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
        lineNumber: 249,
        columnNumber: 5
    }, this);
}
_s(ProgressNotePanel, "DOLDsmhfCej2QV4q0LlfgqYBw9Q=");
_c3 = ProgressNotePanel;
function ProgressNotePanelMobile({ progressNotes, setProgressNotes, discontinuedOrders }) {
    _s1();
    const [soapFormCollapsed, setSoapFormCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newNote, setNewNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        subjective: '',
        objective: '',
        assessment: '',
        plan: ''
    });
    const saveProgressNote = ()=>{
        if (!newNote.subjective && !newNote.objective && !newNote.assessment && !newNote.plan) {
            return;
        }
        const { date, time } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentDateTime"])();
        const note = {
            id: Date.now(),
            date,
            time,
            author: 'นพ.วิชัย หัวใจดี',
            ...newNote,
            vitalSigns: {
                bp: '125/78',
                hr: 72,
                rr: 18,
                temp: 36.8,
                o2sat: 98
            }
        };
        setProgressNotes((prev)=>[
                note,
                ...prev
            ]);
        setNewNote({
            subjective: '',
            objective: '',
            assessment: '',
            plan: ''
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-blue-50/30 dark:bg-blue-500/5 p-4 space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SOAPForm, {
                newNote: newNote,
                setNewNote: setNewNote,
                onSave: saveProgressNote,
                isCollapsed: soapFormCollapsed,
                setIsCollapsed: setSoapFormCollapsed
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                lineNumber: 343,
                columnNumber: 7
            }, this),
            progressNotes.map((note, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NoteCard, {
                    note: note,
                    index: idx,
                    total: progressNotes.length
                }, note.id, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                    lineNumber: 352,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DiscontinuedOrders, {
                orders: discontinuedOrders
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
                lineNumber: 360,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx",
        lineNumber: 342,
        columnNumber: 5
    }, this);
}
_s1(ProgressNotePanelMobile, "DOLDsmhfCej2QV4q0LlfgqYBw9Q=");
_c4 = ProgressNotePanelMobile;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "SOAPForm");
__turbopack_context__.k.register(_c1, "NoteCard");
__turbopack_context__.k.register(_c2, "DiscontinuedOrders");
__turbopack_context__.k.register(_c3, "ProgressNotePanel");
__turbopack_context__.k.register(_c4, "ProgressNotePanelMobile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrderRow",
    ()=>OrderRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/pen.js [app-client] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$stop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StopCircle$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/circle-stop.js [app-client] (ecmascript) <export default as StopCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/types.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function OrderRow({ order, onDelete, onDiscontinue, onSave, isEditing, setEditingId }) {
    _s();
    const [editedOrder, setEditedOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(order);
    const routeColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRouteColor"])(order.route || '');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrderRow.useEffect": ()=>{
            setEditedOrder(order);
        }
    }["OrderRow.useEffect"], [
        order
    ]);
    const handleSave = ()=>{
        onSave(editedOrder);
        setEditingId(null);
    };
    const handleCancel = ()=>{
        setEditedOrder(order);
        setEditingId(null);
    };
    // ============================================
    // Editing Mode
    // ============================================
    if (isEditing && !order.isDiscontinued) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-3 px-3 -mx-3 border-b border-slate-200 dark:border-slate-700 last:border-0 bg-blue-50 dark:bg-blue-500/10 rounded-lg",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: editedOrder.name,
                        onChange: (e)=>setEditedOrder({
                                ...editedOrder,
                                name: e.target.value
                            }),
                        className: "w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white font-medium"
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this),
                    order.type === 'medication' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: editedOrder.dose || '',
                                onChange: (e)=>setEditedOrder({
                                        ...editedOrder,
                                        dose: e.target.value
                                    }),
                                placeholder: "Dose",
                                className: "px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                lineNumber: 59,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: editedOrder.frequency || '',
                                onChange: (e)=>setEditedOrder({
                                        ...editedOrder,
                                        frequency: e.target.value
                                    }),
                                className: "px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frequencyOptions"].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: f,
                                        children: f
                                    }, f, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                        lineNumber: 71,
                                        columnNumber: 44
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: editedOrder.route || '',
                                onChange: (e)=>setEditedOrder({
                                        ...editedOrder,
                                        route: e.target.value
                                    }),
                                className: "px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routeOptions"].map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: r,
                                        children: r
                                    }, r, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                        lineNumber: 78,
                                        columnNumber: 40
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                lineNumber: 73,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                        lineNumber: 58,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: editedOrder.instruction || '',
                        onChange: (e)=>setEditedOrder({
                                ...editedOrder,
                                instruction: e.target.value
                            }),
                        placeholder: "วิธีใช้ยา / หมายเหตุ",
                        className: "w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 justify-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleCancel,
                                className: "px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this),
                                    " ยกเลิก"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSave,
                                className: "px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                        lineNumber: 104,
                                        columnNumber: 15
                                    }, this),
                                    " บันทึก"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                lineNumber: 47,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this);
    }
    // ============================================
    // Display Mode
    // ============================================
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex items-start gap-3 py-3 px-3 -mx-3 border-b border-slate-100 dark:border-slate-700/50 last:border-0 group rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/30 transition-colors ${order.isDiscontinued ? 'opacity-60' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 flex-wrap",
                        children: [
                            order.isStat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded animate-pulse",
                                children: "STAT"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `font-medium text-sm text-slate-800 dark:text-white ${order.isDiscontinued ? 'line-through' : ''}`,
                                children: order.name
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            order.route && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `px-2 py-0.5 text-xs font-bold rounded ${routeColor}`,
                                children: order.route
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    (order.dose || order.frequency) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-slate-600 dark:text-slate-400 mt-1",
                        children: [
                            order.dose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: order.dose
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                lineNumber: 138,
                                columnNumber: 28
                            }, this),
                            order.frequency && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2 font-medium text-slate-700 dark:text-slate-300",
                                children: order.frequency
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                lineNumber: 140,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this),
                    order.instruction && !order.isDiscontinued && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-slate-500 dark:text-slate-400 italic mt-1.5",
                        children: [
                            "💊 ",
                            order.instruction
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 mt-2 text-xs text-slate-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this),
                                    order.startDate
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this),
                                    order.time
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                        lineNumber: 165,
                                        columnNumber: 13
                                    }, this),
                                    order.prescriber
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    order.isDiscontinued && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 px-3 py-2 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-red-500",
                                children: "DC:"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-500 ml-2",
                                children: [
                                    order.endDate,
                                    " ",
                                    order.endTime,
                                    " • ",
                                    order.dcBy,
                                    " • ",
                                    order.dcReason
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                                lineNumber: 174,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            !order.isDiscontinued && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1 shrink-0 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setEditingId(order.id),
                        className: "p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-500",
                        title: "แก้ไข",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                            lineNumber: 189,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                    }, this),
                    order.orderType === 'continue' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onDiscontinue(order),
                        className: "p-2 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-500/20 text-orange-500",
                        title: "Discontinue",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$stop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StopCircle$3e$__["StopCircle"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                            lineNumber: 197,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                        lineNumber: 192,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onDelete(order),
                        className: "p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 text-red-500",
                        title: "ลบ",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                            lineNumber: 205,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                        lineNumber: 200,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
                lineNumber: 183,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
_s(OrderRow, "fYtD4m4HJbFf5mfdW6SLdVNSUzU=");
_c = OrderRow;
var _c;
__turbopack_context__.k.register(_c, "OrderRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OneDayOrderPanel",
    ()=>OneDayOrderPanel,
    "OneDayOrderPanelMobile",
    ()=>OneDayOrderPanelMobile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-client] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-client] (ecmascript) <export default as Minimize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$shared$2d$components$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$OrderRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function AddOrderForm({ newOrder, setNewOrder, onAdd, onCancel, type }) {
    const isOneday = type === 'oneday';
    const bgColor = isOneday ? 'bg-amber-500' : 'bg-emerald-500';
    const containerBg = isOneday ? 'bg-amber-50/50 dark:bg-amber-500/5 border-amber-200/50' : 'bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-200/50';
    const typeOptions = isOneday ? [
        {
            v: 'lab',
            l: '🔬 Lab'
        },
        {
            v: 'medication',
            l: '💊 ยา'
        },
        {
            v: 'treatment',
            l: '🏥 Tx'
        }
    ] : [
        {
            v: 'medication',
            l: '💊 ยา'
        },
        {
            v: 'treatment',
            l: '🏥 Tx'
        }
    ];
    const getAutocompleteOptions = ()=>{
        if (newOrder.type === 'medication') return __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["medicationList"];
        if (newOrder.type === 'lab') return __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["labList"];
        if (newOrder.type === 'treatment') return __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["treatmentList"];
        return [];
    };
    const handleMedicationSelect = (opt)=>{
        if (typeof opt !== 'string' && opt.defaultDose) {
            setNewOrder({
                ...newOrder,
                name: opt.name,
                dose: opt.defaultDose || '',
                frequency: opt.defaultFreq || newOrder.frequency,
                route: opt.defaultRoute || newOrder.route
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `p-4 rounded-xl border ${containerBg}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: typeOptions.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setNewOrder({
                                    ...newOrder,
                                    type: t.v
                                }),
                            className: `flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${newOrder.type === t.v ? `${bgColor} text-white` : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600'}`,
                            children: t.l
                        }, t.v, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$shared$2d$components$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AutocompleteInput"], {
                    value: newOrder.name,
                    onChange: (v)=>setNewOrder({
                            ...newOrder,
                            name: v
                        }),
                    onSelect: handleMedicationSelect,
                    options: getAutocompleteOptions(),
                    placeholder: "พิมพ์ค้นหา..."
                }, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this),
                newOrder.type === 'medication' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-3 gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: newOrder.dose,
                            onChange: (e)=>setNewOrder({
                                    ...newOrder,
                                    dose: e.target.value
                                }),
                            placeholder: "Dose",
                            className: "px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                            lineNumber: 87,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: newOrder.frequency,
                            onChange: (e)=>setNewOrder({
                                    ...newOrder,
                                    frequency: e.target.value
                                }),
                            className: "px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frequencyOptions"].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: f,
                                    children: f
                                }, f, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                                    lineNumber: 99,
                                    columnNumber: 42
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: newOrder.route,
                            onChange: (e)=>setNewOrder({
                                    ...newOrder,
                                    route: e.target.value
                                }),
                            className: "px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routeOptions"].map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: r,
                                    children: r
                                }, r, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                                    lineNumber: 106,
                                    columnNumber: 38
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, this),
                isOneday && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setNewOrder({
                            ...newOrder,
                            isStat: !newOrder.isStat
                        }),
                    className: `px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors ${newOrder.isStat ? 'bg-red-500 text-white' : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300'}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                            lineNumber: 121,
                            columnNumber: 13
                        }, this),
                        "STAT"
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                    lineNumber: 113,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onCancel,
                            className: "flex-1 px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300",
                            children: "ยกเลิก"
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onAdd,
                            disabled: !newOrder.name,
                            className: `flex-1 px-4 py-2.5 ${bgColor} hover:opacity-90 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-opacity ${!newOrder.name ? 'opacity-50 cursor-not-allowed' : ''}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                                    lineNumber: 141,
                                    columnNumber: 13
                                }, this),
                                "เพิ่ม"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_c = AddOrderForm;
function OrderList({ orders, type, editingOrderId, setEditingOrderId, onDelete, onDiscontinue, onSave }) {
    const isOneday = type === 'oneday';
    const orderTypes = isOneday ? [
        'lab',
        'medication',
        'treatment'
    ] : [
        'medication',
        'treatment'
    ];
    const typeConfig = {
        lab: {
            label: '🔬 Laboratory',
            color: 'text-purple-600 dark:text-purple-400'
        },
        medication: {
            label: '💊 Medications',
            color: 'text-blue-600 dark:text-blue-400'
        },
        treatment: {
            label: '🏥 Treatments',
            color: 'text-emerald-600 dark:text-emerald-400'
        }
    };
    if (orders.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-12 text-slate-400",
            children: [
                isOneday ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
                    className: "w-12 h-12 mx-auto mb-3 opacity-30"
                }, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                    lineNumber: 188,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                    className: "w-12 h-12 mx-auto mb-3 opacity-30"
                }, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                    lineNumber: 190,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm",
                    children: [
                        "ไม่มี ",
                        isOneday ? 'One Day' : 'Continue',
                        " Order"
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                    lineNumber: 192,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
            lineNumber: 186,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: orderTypes.map((orderType)=>{
            const typeOrders = orders.filter((o)=>o.type === orderType);
            if (typeOrders.length === 0) return null;
            const config = typeConfig[orderType];
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `text-sm font-bold uppercase tracking-wider mb-2 ${config.color}`,
                        children: config.label
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                        lineNumber: 207,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-white/80 dark:bg-slate-700/30 border border-slate-200/50 dark:border-slate-600/50 p-4",
                        children: typeOrders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$OrderRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrderRow"], {
                                order: order,
                                onDelete: onDelete,
                                onDiscontinue: onDiscontinue,
                                onSave: onSave,
                                isEditing: editingOrderId === order.id,
                                setEditingId: setEditingOrderId
                            }, order.id, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                                lineNumber: 212,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                        lineNumber: 210,
                        columnNumber: 13
                    }, this)
                ]
            }, orderType, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                lineNumber: 206,
                columnNumber: 11
            }, this);
        })
    }, void 0, false);
}
_c1 = OrderList;
function OneDayOrderPanel({ orders, setOrders, isOpen, onClose, flex, onDeleteOrder, onDiscontinueOrder }) {
    _s();
    const [showAddForm, setShowAddForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingOrderId, setEditingOrderId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newOrder, setNewOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: 'lab',
        name: '',
        dose: '',
        frequency: 'STAT',
        route: 'IV',
        instruction: '',
        orderType: 'oneday',
        isStat: false
    });
    const oneDayOrders = orders.filter((o)=>o.orderType === 'oneday' && !o.isDiscontinued);
    const addOrder = ()=>{
        if (!newOrder.name) return;
        const { date, time } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentDateTime"])();
        const order = {
            id: Date.now(),
            type: newOrder.type,
            name: newOrder.name,
            dose: newOrder.dose,
            frequency: newOrder.frequency,
            route: newOrder.route,
            instruction: newOrder.instruction,
            orderType: 'oneday',
            startDate: date,
            time,
            prescriber: 'นพ.วิชัย',
            status: newOrder.isStat ? 'pending' : 'active',
            isStat: newOrder.isStat,
            isDiscontinued: false
        };
        setOrders((prev)=>[
                order,
                ...prev
            ]);
        setNewOrder({
            type: 'lab',
            name: '',
            dose: '',
            frequency: 'STAT',
            route: 'IV',
            instruction: '',
            orderType: 'oneday',
            isStat: false
        });
        setShowAddForm(false);
    };
    const handleSaveOrder = (updatedOrder)=>{
        setOrders((prev)=>prev.map((o)=>o.id === updatedOrder.id ? updatedOrder : o));
    };
    // Collapsed State
    if (!isOpen) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$shared$2d$components$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollapsedColumn"], {
            title: "One Day",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"],
            color: "bg-amber-500",
            count: oneDayOrders.length,
            onClick: onClose
        }, void 0, false, {
            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
            lineNumber: 310,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-column": "2",
        className: "flex flex-col bg-amber-50/50 dark:bg-amber-900/10 overflow-hidden min-w-[200px]",
        style: {
            flex
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$shared$2d$components$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PanelHeader"], {
                title: "One Day",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"],
                iconBgColor: "bg-amber-500",
                count: oneDayOrders.length,
                badgeColor: "bg-amber-200 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400",
                headerBgColor: "bg-amber-100/80 dark:bg-slate-800/90",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowAddForm(true),
                        className: `p-1.5 rounded transition-colors ${showAddForm ? 'bg-amber-500 text-white' : 'hover:bg-amber-200 dark:hover:bg-slate-700'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                            lineNumber: 343,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "p-1.5 rounded hover:bg-amber-200 dark:hover:bg-slate-700",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                            className: "w-4 h-4 text-slate-400"
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                            lineNumber: 349,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                        lineNumber: 345,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-4 space-y-4",
                children: [
                    showAddForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AddOrderForm, {
                        newOrder: newOrder,
                        setNewOrder: setNewOrder,
                        onAdd: addOrder,
                        onCancel: ()=>setShowAddForm(false),
                        type: "oneday"
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                        lineNumber: 357,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OrderList, {
                        orders: oneDayOrders,
                        type: "oneday",
                        editingOrderId: editingOrderId,
                        setEditingOrderId: setEditingOrderId,
                        onDelete: onDeleteOrder,
                        onDiscontinue: onDiscontinueOrder,
                        onSave: handleSaveOrder
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                        lineNumber: 367,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                lineNumber: 354,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
        lineNumber: 321,
        columnNumber: 5
    }, this);
}
_s(OneDayOrderPanel, "MTcWbgpNs5giZOiWn+qF+g7eRMY=");
_c2 = OneDayOrderPanel;
function OneDayOrderPanelMobile({ orders, setOrders, onDeleteOrder, onDiscontinueOrder }) {
    _s1();
    const [showAddForm, setShowAddForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingOrderId, setEditingOrderId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newOrder, setNewOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: 'lab',
        name: '',
        dose: '',
        frequency: 'STAT',
        route: 'IV',
        instruction: '',
        orderType: 'oneday',
        isStat: false
    });
    const oneDayOrders = orders.filter((o)=>o.orderType === 'oneday' && !o.isDiscontinued);
    const addOrder = ()=>{
        if (!newOrder.name) return;
        const { date, time } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentDateTime"])();
        const order = {
            id: Date.now(),
            type: newOrder.type,
            name: newOrder.name,
            dose: newOrder.dose,
            frequency: newOrder.frequency,
            route: newOrder.route,
            instruction: newOrder.instruction,
            orderType: 'oneday',
            startDate: date,
            time,
            prescriber: 'นพ.วิชัย',
            status: newOrder.isStat ? 'pending' : 'active',
            isStat: newOrder.isStat,
            isDiscontinued: false
        };
        setOrders((prev)=>[
                order,
                ...prev
            ]);
        setNewOrder({
            type: 'lab',
            name: '',
            dose: '',
            frequency: 'STAT',
            route: 'IV',
            instruction: '',
            orderType: 'oneday',
            isStat: false
        });
        setShowAddForm(false);
    };
    const handleSaveOrder = (updatedOrder)=>{
        setOrders((prev)=>prev.map((o)=>o.id === updatedOrder.id ? updatedOrder : o));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-amber-50/50 dark:bg-amber-500/5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b border-slate-200/50 dark:border-slate-700/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setShowAddForm(!showAddForm),
                    className: "w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 bg-amber-500 text-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                            lineNumber: 460,
                            columnNumber: 11
                        }, this),
                        " เพิ่ม Order"
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                    lineNumber: 456,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                lineNumber: 455,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 space-y-4",
                children: [
                    showAddForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AddOrderForm, {
                        newOrder: newOrder,
                        setNewOrder: setNewOrder,
                        onAdd: addOrder,
                        onCancel: ()=>setShowAddForm(false),
                        type: "oneday"
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                        lineNumber: 466,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OrderList, {
                        orders: oneDayOrders,
                        type: "oneday",
                        editingOrderId: editingOrderId,
                        setEditingOrderId: setEditingOrderId,
                        onDelete: onDeleteOrder,
                        onDiscontinue: onDiscontinueOrder,
                        onSave: handleSaveOrder
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                        lineNumber: 475,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
                lineNumber: 464,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx",
        lineNumber: 453,
        columnNumber: 5
    }, this);
}
_s1(OneDayOrderPanelMobile, "MTcWbgpNs5giZOiWn+qF+g7eRMY=");
_c3 = OneDayOrderPanelMobile;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "AddOrderForm");
__turbopack_context__.k.register(_c1, "OrderList");
__turbopack_context__.k.register(_c2, "OneDayOrderPanel");
__turbopack_context__.k.register(_c3, "OneDayOrderPanelMobile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContinueOrderPanel",
    ()=>ContinueOrderPanel,
    "ContinueOrderPanelMobile",
    ()=>ContinueOrderPanelMobile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$right$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelRightClose$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/panel-right-close.js [app-client] (ecmascript) <export default as PanelRightClose>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$shared$2d$components$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$OrderRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// ============================================
// General Orders Component
// ============================================
function GeneralOrders() {
    const generalOrdersList = [
        'Soft diet / Low salt, Low fat',
        'Record V/S q 4 hr',
        'Strict I/O',
        'Keep O2 sat ≥ 95%',
        'Bed rest with bedside commode'
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm font-bold uppercase tracking-wider mb-2 text-slate-500",
                children: "📋 General Orders"
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl bg-white/80 dark:bg-slate-700/30 border border-slate-200/50 dark:border-slate-600/50 p-4",
                children: generalOrdersList.map((order, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-slate-800 dark:text-white py-1.5",
                        children: [
                            "• ",
                            order
                        ]
                    }, i, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = GeneralOrders;
function AddOrderForm({ newOrder, setNewOrder, onAdd, onCancel }) {
    const typeOptions = [
        {
            v: 'medication',
            l: '💊 ยา'
        },
        {
            v: 'treatment',
            l: '🏥 Tx'
        }
    ];
    const getAutocompleteOptions = ()=>{
        if (newOrder.type === 'medication') return __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["medicationList"];
        if (newOrder.type === 'treatment') return __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["treatmentList"];
        return [];
    };
    const handleMedicationSelect = (opt)=>{
        if (typeof opt !== 'string' && opt.defaultDose) {
            setNewOrder({
                ...newOrder,
                name: opt.name,
                dose: opt.defaultDose || '',
                frequency: opt.defaultFreq || newOrder.frequency,
                route: opt.defaultRoute || newOrder.route
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 rounded-xl border bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-200/50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: typeOptions.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setNewOrder({
                                    ...newOrder,
                                    type: t.v
                                }),
                            className: `flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${newOrder.type === t.v ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600'}`,
                            children: t.l
                        }, t.v, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                            lineNumber: 83,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$shared$2d$components$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AutocompleteInput"], {
                    value: newOrder.name,
                    onChange: (v)=>setNewOrder({
                            ...newOrder,
                            name: v
                        }),
                    onSelect: handleMedicationSelect,
                    options: getAutocompleteOptions(),
                    placeholder: "พิมพ์ค้นหา..."
                }, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this),
                newOrder.type === 'medication' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-3 gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: newOrder.dose,
                                    onChange: (e)=>setNewOrder({
                                            ...newOrder,
                                            dose: e.target.value
                                        }),
                                    placeholder: "Dose",
                                    className: "px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: newOrder.frequency,
                                    onChange: (e)=>setNewOrder({
                                            ...newOrder,
                                            frequency: e.target.value
                                        }),
                                    className: "px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frequencyOptions"].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: f,
                                            children: f
                                        }, f, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                                            lineNumber: 122,
                                            columnNumber: 44
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: newOrder.route,
                                    onChange: (e)=>setNewOrder({
                                            ...newOrder,
                                            route: e.target.value
                                        }),
                                    className: "px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routeOptions"].map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: r,
                                            children: r
                                        }, r, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                                            lineNumber: 129,
                                            columnNumber: 40
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                                    lineNumber: 124,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                            lineNumber: 109,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$shared$2d$components$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AutocompleteInput"], {
                            value: newOrder.instruction,
                            onChange: (v)=>setNewOrder({
                                    ...newOrder,
                                    instruction: v
                                }),
                            options: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instructionList"],
                            placeholder: "วิธีใช้ยา..."
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onCancel,
                            className: "flex-1 px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300",
                            children: "ยกเลิก"
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onAdd,
                            disabled: !newOrder.name,
                            className: `flex-1 px-4 py-2.5 bg-emerald-500 hover:opacity-90 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-opacity ${!newOrder.name ? 'opacity-50 cursor-not-allowed' : ''}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                                    lineNumber: 158,
                                    columnNumber: 13
                                }, this),
                                "เพิ่ม"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                    lineNumber: 144,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
            lineNumber: 79,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_c1 = AddOrderForm;
function OrderList({ orders, editingOrderId, setEditingOrderId, onDelete, onDiscontinue, onSave }) {
    const orderTypes = [
        'medication',
        'treatment'
    ];
    const typeConfig = {
        medication: {
            label: '💊 Medications',
            color: 'text-blue-600 dark:text-blue-400'
        },
        treatment: {
            label: '🏥 Treatments',
            color: 'text-emerald-600 dark:text-emerald-400'
        }
    };
    if (orders.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-12 text-slate-400",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                    className: "w-12 h-12 mx-auto mb-3 opacity-30"
                }, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                    lineNumber: 198,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm",
                    children: "ไม่มี Continue Order"
                }, void 0, false, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                    lineNumber: 199,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
            lineNumber: 197,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: orderTypes.map((orderType)=>{
            const typeOrders = orders.filter((o)=>o.type === orderType);
            if (typeOrders.length === 0) return null;
            const config = typeConfig[orderType];
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `text-sm font-bold uppercase tracking-wider mb-2 ${config.color}`,
                        children: config.label
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                        lineNumber: 214,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl bg-white/80 dark:bg-slate-700/30 border border-slate-200/50 dark:border-slate-600/50 p-4",
                        children: typeOrders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$OrderRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrderRow"], {
                                order: order,
                                onDelete: onDelete,
                                onDiscontinue: onDiscontinue,
                                onSave: onSave,
                                isEditing: editingOrderId === order.id,
                                setEditingId: setEditingOrderId
                            }, order.id, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                                lineNumber: 219,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                        lineNumber: 217,
                        columnNumber: 13
                    }, this)
                ]
            }, orderType, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                lineNumber: 213,
                columnNumber: 11
            }, this);
        })
    }, void 0, false);
}
_c2 = OrderList;
function ContinueOrderPanel({ orders, setOrders, isOpen, onClose, flex, onDeleteOrder, onDiscontinueOrder }) {
    _s();
    const [showAddForm, setShowAddForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingOrderId, setEditingOrderId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newOrder, setNewOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: 'medication',
        name: '',
        dose: '',
        frequency: 'TID',
        route: 'PO',
        instruction: '',
        orderType: 'continue',
        isStat: false
    });
    const continueOrders = orders.filter((o)=>o.orderType === 'continue' && !o.isDiscontinued);
    const addOrder = ()=>{
        if (!newOrder.name) return;
        const { date, time } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentDateTime"])();
        const order = {
            id: Date.now(),
            type: newOrder.type,
            name: newOrder.name,
            dose: newOrder.dose,
            frequency: newOrder.frequency,
            route: newOrder.route,
            instruction: newOrder.instruction,
            orderType: 'continue',
            startDate: date,
            time,
            prescriber: 'นพ.วิชัย',
            status: 'active',
            isStat: false,
            isDiscontinued: false
        };
        setOrders((prev)=>[
                order,
                ...prev
            ]);
        setNewOrder({
            type: 'medication',
            name: '',
            dose: '',
            frequency: 'TID',
            route: 'PO',
            instruction: '',
            orderType: 'continue',
            isStat: false
        });
        setShowAddForm(false);
    };
    const handleSaveOrder = (updatedOrder)=>{
        setOrders((prev)=>prev.map((o)=>o.id === updatedOrder.id ? updatedOrder : o));
    };
    // Collapsed State
    if (!isOpen) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$shared$2d$components$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollapsedColumn"], {
            title: "Continue",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"],
            color: "bg-emerald-500",
            count: continueOrders.length,
            onClick: onClose
        }, void 0, false, {
            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
            lineNumber: 317,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-column": "3",
        className: "flex flex-col bg-emerald-50/50 dark:bg-emerald-900/10 overflow-hidden min-w-[200px]",
        style: {
            flex
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$shared$2d$components$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PanelHeader"], {
                title: "Continue",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"],
                iconBgColor: "bg-emerald-500",
                count: continueOrders.length,
                badgeColor: "bg-emerald-200 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
                headerBgColor: "bg-emerald-100/80 dark:bg-slate-800/90",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowAddForm(true),
                        className: `p-1.5 rounded transition-colors ${showAddForm ? 'bg-emerald-500 text-white' : 'hover:bg-emerald-200 dark:hover:bg-slate-700'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                            lineNumber: 350,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "p-1.5 rounded hover:bg-emerald-200 dark:hover:bg-slate-700",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$right$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelRightClose$3e$__["PanelRightClose"], {
                            className: "w-4 h-4 text-slate-400"
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                            lineNumber: 356,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                lineNumber: 334,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-4 space-y-4",
                children: [
                    showAddForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AddOrderForm, {
                        newOrder: newOrder,
                        setNewOrder: setNewOrder,
                        onAdd: addOrder,
                        onCancel: ()=>setShowAddForm(false)
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                        lineNumber: 364,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GeneralOrders, {}, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                        lineNumber: 373,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OrderList, {
                        orders: continueOrders,
                        editingOrderId: editingOrderId,
                        setEditingOrderId: setEditingOrderId,
                        onDelete: onDeleteOrder,
                        onDiscontinue: onDiscontinueOrder,
                        onSave: handleSaveOrder
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                lineNumber: 361,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
        lineNumber: 328,
        columnNumber: 5
    }, this);
}
_s(ContinueOrderPanel, "xWZ5ZsaYqD7OqFr6PWnW2OkiGIg=");
_c3 = ContinueOrderPanel;
function ContinueOrderPanelMobile({ orders, setOrders, onDeleteOrder, onDiscontinueOrder }) {
    _s1();
    const [showAddForm, setShowAddForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingOrderId, setEditingOrderId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newOrder, setNewOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: 'medication',
        name: '',
        dose: '',
        frequency: 'TID',
        route: 'PO',
        instruction: '',
        orderType: 'continue',
        isStat: false
    });
    const continueOrders = orders.filter((o)=>o.orderType === 'continue' && !o.isDiscontinued);
    const addOrder = ()=>{
        if (!newOrder.name) return;
        const { date, time } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentDateTime"])();
        const order = {
            id: Date.now(),
            type: newOrder.type,
            name: newOrder.name,
            dose: newOrder.dose,
            frequency: newOrder.frequency,
            route: newOrder.route,
            instruction: newOrder.instruction,
            orderType: 'continue',
            startDate: date,
            time,
            prescriber: 'นพ.วิชัย',
            status: 'active',
            isStat: false,
            isDiscontinued: false
        };
        setOrders((prev)=>[
                order,
                ...prev
            ]);
        setNewOrder({
            type: 'medication',
            name: '',
            dose: '',
            frequency: 'TID',
            route: 'PO',
            instruction: '',
            orderType: 'continue',
            isStat: false
        });
        setShowAddForm(false);
    };
    const handleSaveOrder = (updatedOrder)=>{
        setOrders((prev)=>prev.map((o)=>o.id === updatedOrder.id ? updatedOrder : o));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-emerald-50/50 dark:bg-emerald-500/5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b border-slate-200/50 dark:border-slate-700/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setShowAddForm(!showAddForm),
                    className: "w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 bg-emerald-500 text-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                            lineNumber: 468,
                            columnNumber: 11
                        }, this),
                        " เพิ่ม Order"
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                    lineNumber: 464,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                lineNumber: 463,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 space-y-4",
                children: [
                    showAddForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AddOrderForm, {
                        newOrder: newOrder,
                        setNewOrder: setNewOrder,
                        onAdd: addOrder,
                        onCancel: ()=>setShowAddForm(false)
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                        lineNumber: 474,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GeneralOrders, {}, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                        lineNumber: 482,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OrderList, {
                        orders: continueOrders,
                        editingOrderId: editingOrderId,
                        setEditingOrderId: setEditingOrderId,
                        onDelete: onDeleteOrder,
                        onDiscontinue: onDiscontinueOrder,
                        onSave: handleSaveOrder
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                        lineNumber: 484,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
                lineNumber: 472,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx",
        lineNumber: 461,
        columnNumber: 5
    }, this);
}
_s1(ContinueOrderPanelMobile, "xWZ5ZsaYqD7OqFr6PWnW2OkiGIg=");
_c4 = ContinueOrderPanelMobile;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "GeneralOrders");
__turbopack_context__.k.register(_c1, "AddOrderForm");
__turbopack_context__.k.register(_c2, "OrderList");
__turbopack_context__.k.register(_c3, "ContinueOrderPanel");
__turbopack_context__.k.register(_c4, "ContinueOrderPanelMobile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrderSheet",
    ()=>OrderSheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-client] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$components$2f$ui$2f$confirm$2d$dialog$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/his-web/src/components/ui/confirm-dialog/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$components$2f$ui$2f$confirm$2d$dialog$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/components/ui/confirm-dialog/ConfirmDialog.tsx [app-client] (ecmascript)");
// Import Types
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/types.ts [app-client] (ecmascript)");
// Import Panels
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$ProgressNotePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$OneDayOrderPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$ContinueOrderPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx [app-client] (ecmascript)");
// Import Shared Components
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$shared$2d$components$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx [app-client] (ecmascript)");
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
function OrderSheet({ orders, setOrders, progressNotes, setProgressNotes }) {
    _s();
    // Column open/close states
    const [col1Open, setCol1Open] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [col2Open, setCol2Open] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [col3Open, setCol3Open] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Column flex states for resizing
    const [col1Flex, setCol1Flex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [col2Flex, setCol2Flex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [col3Flex, setCol3Flex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    // Splitter dragging state
    const [draggingSplitter, setDraggingSplitter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [startX, setStartX] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [startWidths, setStartWidths] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        col1: 0,
        col2: 0,
        col3: 0
    });
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Mobile tab state
    const [mobileTab, setMobileTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('continue');
    // Dialog states
    const [deleteDialog, setDeleteDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        order: null
    });
    const [dcDialog, setDcDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        order: null
    });
    // Computed values
    const discontinuedOrders = orders.filter((o)=>o.isDiscontinued);
    const oneDayOrdersCount = orders.filter((o)=>o.orderType === 'oneday' && !o.isDiscontinued).length;
    const continueOrdersCount = orders.filter((o)=>o.orderType === 'continue' && !o.isDiscontinued).length;
    // ============================================
    // Splitter Drag Handlers
    // ============================================
    const handleMouseDown = (splitterIndex)=>(e)=>{
            e.preventDefault();
            setDraggingSplitter(splitterIndex);
            setStartX(e.clientX);
            if (containerRef.current) {
                const cols = containerRef.current.querySelectorAll('[data-column]');
                setStartWidths({
                    col1: cols[0]?.offsetWidth || 0,
                    col2: cols[1]?.offsetWidth || 0,
                    col3: cols[2]?.offsetWidth || 0
                });
            }
        };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrderSheet.useEffect": ()=>{
            if (draggingSplitter === null) return;
            const handleMouseMove = {
                "OrderSheet.useEffect.handleMouseMove": (e)=>{
                    if (!containerRef.current) return;
                    const delta = e.clientX - startX;
                    const containerWidth = containerRef.current.offsetWidth;
                    if (draggingSplitter === 1 && col1Open && col2Open) {
                        const newCol1Width = Math.max(150, Math.min(containerWidth * 0.5, startWidths.col1 + delta));
                        const newCol2Width = Math.max(150, startWidths.col2 - delta);
                        const totalFlex = col1Flex + col2Flex + col3Flex;
                        setCol1Flex(newCol1Width / (newCol1Width + newCol2Width + startWidths.col3) * totalFlex);
                        setCol2Flex(newCol2Width / (newCol1Width + newCol2Width + startWidths.col3) * totalFlex);
                    } else if (draggingSplitter === 2 && col2Open && col3Open) {
                        const newCol2Width = Math.max(150, Math.min(containerWidth * 0.5, startWidths.col2 + delta));
                        const newCol3Width = Math.max(150, startWidths.col3 - delta);
                        const totalFlex = col1Flex + col2Flex + col3Flex;
                        setCol2Flex(newCol2Width / (startWidths.col1 + newCol2Width + newCol3Width) * totalFlex);
                        setCol3Flex(newCol3Width / (startWidths.col1 + newCol2Width + newCol3Width) * totalFlex);
                    }
                }
            }["OrderSheet.useEffect.handleMouseMove"];
            const handleMouseUp = {
                "OrderSheet.useEffect.handleMouseUp": ()=>setDraggingSplitter(null)
            }["OrderSheet.useEffect.handleMouseUp"];
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return ({
                "OrderSheet.useEffect": ()=>{
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                }
            })["OrderSheet.useEffect"];
        }
    }["OrderSheet.useEffect"], [
        draggingSplitter,
        startX,
        startWidths,
        col1Flex,
        col2Flex,
        col3Flex,
        col1Open,
        col2Open,
        col3Open
    ]);
    // ============================================
    // Order Actions
    // ============================================
    const handleDeleteOrder = (order)=>{
        setDeleteDialog({
            isOpen: true,
            order
        });
    };
    const confirmDelete = ()=>{
        if (deleteDialog.order) {
            setOrders((prev)=>prev.filter((o)=>o.id !== deleteDialog.order.id));
        }
        setDeleteDialog({
            isOpen: false,
            order: null
        });
    };
    const handleDiscontinueOrder = (order)=>{
        setDcDialog({
            isOpen: true,
            order
        });
    };
    const confirmDiscontinue = ()=>{
        if (dcDialog.order) {
            const { date, time } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentDateTime"])();
            setOrders((prev)=>prev.map((o)=>o.id === dcDialog.order.id ? {
                        ...o,
                        isDiscontinued: true,
                        status: 'discontinued',
                        endDate: date,
                        endTime: time,
                        dcBy: 'นพ.วิชัย',
                        dcReason: 'แพทย์สั่งหยุด'
                    } : o));
        }
        setDcDialog({
            isOpen: false,
            order: null
        });
    };
    // ============================================
    // Render
    // ============================================
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$components$2f$ui$2f$confirm$2d$dialog$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmDialog"], {
                open: deleteDialog.isOpen,
                onClose: ()=>setDeleteDialog({
                        isOpen: false,
                        order: null
                    }),
                onConfirm: confirmDelete,
                title: "ยืนยันการลบ",
                message: `คุณต้องการลบ "${deleteDialog.order?.name}" ใช่หรือไม่?`,
                confirmText: "ลบ",
                variant: "danger"
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$components$2f$ui$2f$confirm$2d$dialog$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmDialog"], {
                open: dcDialog.isOpen,
                onClose: ()=>setDcDialog({
                        isOpen: false,
                        order: null
                    }),
                onConfirm: confirmDiscontinue,
                title: "ยืนยันการ Discontinue",
                message: `คุณต้องการหยุด "${dcDialog.order?.name}" ใช่หรือไม่?`,
                confirmText: "Discontinue",
                variant: "warning"
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:hidden flex border-b border-slate-200/50 dark:border-slate-700/50",
                        children: [
                            {
                                id: 'notes',
                                label: 'Progress',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"],
                                count: progressNotes.length,
                                color: 'blue'
                            },
                            {
                                id: 'oneday',
                                label: 'One Day',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"],
                                count: oneDayOrdersCount,
                                color: 'amber'
                            },
                            {
                                id: 'continue',
                                label: 'Continue',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"],
                                count: continueOrdersCount,
                                color: 'emerald'
                            }
                        ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMobileTab(tab.id),
                                className: `flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-colors ${mobileTab === tab.id ? `text-${tab.color}-600 dark:text-${tab.color}-400 border-b-2 border-${tab.color}-500` : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(tab.icon, {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                                        lineNumber: 211,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        children: tab.label
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-2 py-0.5 rounded text-xs font-bold ${mobileTab === tab.id ? `bg-${tab.color}-100 dark:bg-${tab.color}-500/20` : 'bg-slate-100 dark:bg-slate-700'}`,
                                        children: tab.count
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                                        lineNumber: 213,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, tab.id, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:hidden",
                        children: [
                            mobileTab === 'notes' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$ProgressNotePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProgressNotePanelMobile"], {
                                progressNotes: progressNotes,
                                setProgressNotes: setProgressNotes,
                                discontinuedOrders: discontinuedOrders
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this),
                            mobileTab === 'oneday' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$OneDayOrderPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OneDayOrderPanelMobile"], {
                                orders: orders,
                                setOrders: setOrders,
                                onDeleteOrder: handleDeleteOrder,
                                onDiscontinueOrder: handleDiscontinueOrder
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this),
                            mobileTab === 'continue' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$ContinueOrderPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContinueOrderPanelMobile"], {
                                orders: orders,
                                setOrders: setOrders,
                                onDeleteOrder: handleDeleteOrder,
                                onDiscontinueOrder: handleDiscontinueOrder
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                                lineNumber: 242,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: containerRef,
                        className: "hidden lg:flex min-h-[500px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$ProgressNotePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProgressNotePanel"], {
                                progressNotes: progressNotes,
                                setProgressNotes: setProgressNotes,
                                discontinuedOrders: discontinuedOrders,
                                isOpen: col1Open,
                                onClose: ()=>setCol1Open(!col1Open),
                                flex: col1Flex
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this),
                            col1Open && col2Open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$shared$2d$components$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Splitter"], {
                                index: 1,
                                onMouseDown: handleMouseDown,
                                isDragging: draggingSplitter
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                                lineNumber: 271,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$OneDayOrderPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OneDayOrderPanel"], {
                                orders: orders,
                                setOrders: setOrders,
                                isOpen: col2Open,
                                onClose: ()=>setCol2Open(!col2Open),
                                flex: col2Flex,
                                onDeleteOrder: handleDeleteOrder,
                                onDiscontinueOrder: handleDiscontinueOrder
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this),
                            col2Open && col3Open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$shared$2d$components$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Splitter"], {
                                index: 2,
                                onMouseDown: handleMouseDown,
                                isDragging: draggingSplitter
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                                lineNumber: 291,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$ContinueOrderPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContinueOrderPanel"], {
                                orders: orders,
                                setOrders: setOrders,
                                isOpen: col3Open,
                                onClose: ()=>setCol3Open(!col3Open),
                                flex: col3Flex,
                                onDeleteOrder: handleDeleteOrder,
                                onDiscontinueOrder: handleDiscontinueOrder
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                                lineNumber: 299,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(OrderSheet, "VFnDg8VF+eBQeR/TOoUoNQNsWt8=");
_c = OrderSheet;
var _c;
__turbopack_context__.k.register(_c, "OrderSheet");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/his-web/src/app/ipd/[an]/_components/order-sheet/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// ============================================
// Order Sheet Components - Main Export
// ============================================
// Main Component
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$OrderSheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderSheet.tsx [app-client] (ecmascript)");
// Panel Components
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$ProgressNotePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ProgressNotePanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$OneDayOrderPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OneDayOrderPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$ContinueOrderPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/ContinueOrderPanel.tsx [app-client] (ecmascript)");
// Row Component
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$OrderRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/OrderRow.tsx [app-client] (ecmascript)");
// Shared Components
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$shared$2d$components$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/shared-components.tsx [app-client] (ecmascript)");
// Constants & Helpers
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$app$2f$ipd$2f5b$an$5d2f$_components$2f$order$2d$sheet$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/app/ipd/[an]/_components/order-sheet/types.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=his-web_src_app_ipd_%5Ban%5D__components_order-sheet_8cf30b1b._.js.map