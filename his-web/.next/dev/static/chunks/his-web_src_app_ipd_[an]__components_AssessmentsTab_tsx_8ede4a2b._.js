(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssessmentsTab",
    ()=>AssessmentsTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/printer.js [app-client] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/clipboard-list.js [app-client] (ecmascript) <export default as ClipboardList>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/pill.js [app-client] (ecmascript) <export default as Pill>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/scale.js [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileQuestion$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/file-question-mark.js [app-client] (ecmascript) <export default as FileQuestion>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutList$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/layout-list.js [app-client] (ecmascript) <export default as LayoutList>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/mouse-pointer-2.js [app-client] (ecmascript) <export default as MousePointer2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/type.js [app-client] (ecmascript) <export default as Type>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveRight$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/move-right.js [app-client] (ecmascript) <export default as MoveRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/undo-2.js [app-client] (ecmascript) <export default as Undo2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$redo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Redo2$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/redo-2.js [app-client] (ecmascript) <export default as Redo2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-client] (ecmascript) <export default as ZoomIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/zoom-out.js [app-client] (ecmascript) <export default as ZoomOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__ = __turbopack_context__.i("[project]/his-web/node_modules/lucide-react/dist/esm/icons/eraser.js [app-client] (ecmascript) <export default as Eraser>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
// ============================================
// Constants
// ============================================
const CANVAS_WIDTH = 794;
const CANVAS_HEIGHT = 1123;
const ANNOTATION_COLORS = [
    {
        color: '#ef4444',
        name: 'แดง'
    },
    {
        color: '#3b82f6',
        name: 'น้ำเงิน'
    },
    {
        color: '#22c55e',
        name: 'เขียว'
    },
    {
        color: '#f59e0b',
        name: 'ส้ม'
    },
    {
        color: '#8b5cf6',
        name: 'ม่วง'
    },
    {
        color: '#0d9488',
        name: 'Teal'
    },
    {
        color: '#000000',
        name: 'ดำ'
    }
];
const MAX_HISTORY = 50;
// ============================================
// Mock Data
// ============================================
const categories = [
    {
        id: 'all',
        name: 'ทั้งหมด',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
        color: 'slate',
        count: 15
    },
    {
        id: 'initial',
        name: 'Initial Assessment',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"],
        color: 'blue',
        count: 2
    },
    {
        id: 'nursing',
        name: 'Nursing Assessment',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        color: 'purple',
        count: 3
    },
    {
        id: 'risk',
        name: 'Risk Assessment',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"],
        color: 'amber',
        count: 4
    },
    {
        id: 'pain',
        name: 'Pain Assessment',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"],
        color: 'red',
        count: 2
    },
    {
        id: 'nutrition',
        name: 'Nutrition',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"],
        color: 'emerald',
        count: 1
    },
    {
        id: 'medication',
        name: 'Medication',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__["Pill"],
        color: 'pink',
        count: 2
    },
    {
        id: 'discharge',
        name: 'Discharge Planning',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
        color: 'cyan',
        count: 1
    }
];
const mockAssessments = [
    {
        id: 1,
        category: 'initial',
        name: 'Initial Nursing Assessment',
        nameTh: 'แบบประเมินแรกรับทางการพยาบาล',
        status: 'completed',
        assessedBy: 'พยาบาลสมหญิง รักดี',
        assessedDate: '15/01/67',
        assessedTime: '14:45',
        version: 1,
        lastUpdated: '15/01/67 14:45'
    },
    {
        id: 2,
        category: 'initial',
        name: 'Medical History Assessment',
        nameTh: 'แบบประเมินประวัติการเจ็บป่วย',
        status: 'completed',
        assessedBy: 'นพ.วิชัย หัวใจดี',
        assessedDate: '15/01/67',
        assessedTime: '15:00',
        version: 1,
        lastUpdated: '15/01/67 15:00'
    },
    {
        id: 3,
        category: 'risk',
        name: 'Fall Risk Assessment (Morse)',
        nameTh: 'แบบประเมินความเสี่ยงต่อการพลัดตกหกล้ม',
        status: 'completed',
        score: '55/125',
        riskLevel: 'high',
        assessedBy: 'พยาบาลสมหญิง รักดี',
        assessedDate: '15/01/67',
        assessedTime: '14:50',
        version: 2,
        lastUpdated: '17/01/67 08:00',
        notes: 'ประเมินซ้ำทุก shift'
    },
    {
        id: 4,
        category: 'risk',
        name: 'Pressure Ulcer Risk (Braden Scale)',
        nameTh: 'แบบประเมินความเสี่ยงต่อการเกิดแผลกดทับ',
        status: 'completed',
        score: '14/23',
        riskLevel: 'moderate',
        assessedBy: 'พยาบาลวิไล ใจดี',
        assessedDate: '15/01/67',
        assessedTime: '15:00',
        version: 1,
        lastUpdated: '15/01/67 15:00'
    },
    {
        id: 5,
        category: 'risk',
        name: 'DVT Risk Assessment',
        nameTh: 'แบบประเมินความเสี่ยง DVT',
        status: 'completed',
        score: '3/8',
        riskLevel: 'high',
        assessedBy: 'นพ.วิชัย หัวใจดี',
        assessedDate: '15/01/67',
        assessedTime: '15:30',
        version: 1,
        lastUpdated: '15/01/67 15:30'
    },
    {
        id: 6,
        category: 'risk',
        name: 'Suicide Risk Assessment',
        nameTh: 'แบบประเมินความเสี่ยงต่อการทำร้ายตนเอง',
        status: 'completed',
        score: '0/10',
        riskLevel: 'low',
        assessedBy: 'พยาบาลสมหญิง รักดี',
        assessedDate: '15/01/67',
        assessedTime: '14:55',
        version: 1,
        lastUpdated: '15/01/67 14:55'
    },
    {
        id: 7,
        category: 'pain',
        name: 'Pain Assessment (NRS)',
        nameTh: 'แบบประเมินความปวด',
        status: 'completed',
        score: '3/10',
        riskLevel: 'low',
        assessedBy: 'พยาบาลวิไล ใจดี',
        assessedDate: '17/01/67',
        assessedTime: '08:00',
        version: 5,
        lastUpdated: '17/01/67 08:00',
        notes: 'ปวดลดลงจาก 7/10 แรกรับ'
    },
    {
        id: 8,
        category: 'pain',
        name: 'Chest Pain Assessment',
        nameTh: 'แบบประเมินอาการเจ็บหน้าอก',
        status: 'in_progress',
        assessedBy: 'นพ.วิชัย หัวใจดี',
        assessedDate: '17/01/67',
        assessedTime: '09:00',
        version: 3,
        lastUpdated: '17/01/67 09:00'
    },
    {
        id: 9,
        category: 'nursing',
        name: 'Functional Assessment (ADL)',
        nameTh: 'แบบประเมินความสามารถในการทำกิจวัตรประจำวัน',
        status: 'completed',
        score: '85/100',
        assessedBy: 'พยาบาลสมหญิง รักดี',
        assessedDate: '15/01/67',
        assessedTime: '15:00',
        version: 1,
        lastUpdated: '15/01/67 15:00'
    },
    {
        id: 10,
        category: 'nursing',
        name: 'Skin Assessment',
        nameTh: 'แบบประเมินสภาพผิวหนัง',
        status: 'completed',
        assessedBy: 'พยาบาลวิไล ใจดี',
        assessedDate: '17/01/67',
        assessedTime: '08:00',
        version: 2,
        lastUpdated: '17/01/67 08:00'
    },
    {
        id: 11,
        category: 'nursing',
        name: 'Neurological Assessment (GCS)',
        nameTh: 'แบบประเมินระดับความรู้สึกตัว',
        status: 'completed',
        score: 'E4V5M6 = 15',
        assessedBy: 'พยาบาลสมหญิง รักดี',
        assessedDate: '17/01/67',
        assessedTime: '08:00',
        version: 3,
        lastUpdated: '17/01/67 08:00'
    },
    {
        id: 12,
        category: 'nutrition',
        name: 'Nutritional Assessment (SGA)',
        nameTh: 'แบบประเมินภาวะโภชนาการ',
        status: 'pending',
        dueDate: '18/01/67',
        version: 0
    },
    {
        id: 13,
        category: 'medication',
        name: 'Medication Reconciliation - Admission',
        nameTh: 'การสอบทานรายการยาแรกรับ',
        status: 'completed',
        assessedBy: 'ภญ.สุภา ยาดี',
        assessedDate: '15/01/67',
        assessedTime: '16:00',
        version: 1,
        lastUpdated: '15/01/67 16:00'
    },
    {
        id: 14,
        category: 'medication',
        name: 'High Alert Drug Assessment',
        nameTh: 'แบบประเมินการใช้ยาความเสี่ยงสูง',
        status: 'completed',
        riskLevel: 'high',
        assessedBy: 'ภญ.สุภา ยาดี',
        assessedDate: '15/01/67',
        assessedTime: '16:30',
        version: 1,
        lastUpdated: '15/01/67 16:30',
        notes: 'Enoxaparin, Morphine'
    },
    {
        id: 15,
        category: 'discharge',
        name: 'Discharge Planning Assessment',
        nameTh: 'แบบประเมินการวางแผนจำหน่าย',
        status: 'in_progress',
        assessedBy: 'พยาบาลสมหญิง รักดี',
        assessedDate: '16/01/67',
        assessedTime: '10:00',
        version: 1,
        lastUpdated: '16/01/67 10:00'
    }
];
// ============================================
// Helper Functions & Components
// ============================================
const getStatusConfig = (status)=>{
    const configs = {
        completed: {
            label: 'เสร็จสิ้น',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"],
            bg: 'bg-emerald-100 dark:bg-emerald-500/20',
            text: 'text-emerald-700 dark:text-emerald-400'
        },
        pending: {
            label: 'รอดำเนินการ',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
            bg: 'bg-amber-100 dark:bg-amber-500/20',
            text: 'text-amber-700 dark:text-amber-400'
        },
        in_progress: {
            label: 'กำลังดำเนินการ',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"],
            bg: 'bg-blue-100 dark:bg-blue-500/20',
            text: 'text-blue-700 dark:text-blue-400'
        },
        overdue: {
            label: 'เกินกำหนด',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"],
            bg: 'bg-red-100 dark:bg-red-500/20',
            text: 'text-red-700 dark:text-red-400'
        }
    };
    return configs[status];
};
const getRiskConfig = (risk)=>{
    if (!risk) return null;
    const configs = {
        low: {
            label: 'เสี่ยงต่ำ',
            bg: 'bg-emerald-500'
        },
        moderate: {
            label: 'เสี่ยงปานกลาง',
            bg: 'bg-amber-500'
        },
        high: {
            label: 'เสี่ยงสูง',
            bg: 'bg-orange-500'
        },
        critical: {
            label: 'เสี่ยงวิกฤต',
            bg: 'bg-red-500'
        }
    };
    return configs[risk];
};
const StatusBadge = ({ status })=>{
    const config = getStatusConfig(status);
    const Icon = config.icon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: "w-3 h-3"
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "hidden sm:inline",
                children: config.label
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = StatusBadge;
const RiskBadge = ({ risk })=>{
    const config = getRiskConfig(risk);
    if (!config) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-bold text-white ${config.bg}`,
        children: config.label
    }, void 0, false, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
        lineNumber: 170,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = RiskBadge;
const CategoryIcon = ({ category, size = 'md' })=>{
    const cat = categories.find((c)=>c.id === category);
    if (!cat) return null;
    const Icon = cat.icon;
    const colorMap = {
        blue: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
        purple: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400',
        amber: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400',
        red: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400',
        emerald: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
        pink: 'bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400',
        cyan: 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400',
        slate: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
    };
    const sizeClass = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
    const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${sizeClass} rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[cat.color]}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
            className: iconSize
        }, void 0, false, {
            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
            lineNumber: 189,
            columnNumber: 123
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
        lineNumber: 189,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = CategoryIcon;
const CategoryDropdown = ({ selectedCategory, onSelect })=>{
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const selected = categories.find((c)=>c.id === selectedCategory);
    const Icon = selected?.icon || __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(!isOpen),
                className: "flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        className: "w-4 h-4 text-teal-500"
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-1 text-left truncate",
                        children: selected?.name
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "px-1.5 py-0.5 bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 rounded text-xs font-bold",
                        children: selected?.count
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: `w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-10",
                        onClick: ()=>setIsOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-20 overflow-hidden max-h-64 overflow-y-auto",
                        children: categories.map((cat)=>{
                            const CatIcon = cat.icon;
                            const isActive = selectedCategory === cat.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    onSelect(cat.id);
                                    setIsOpen(false);
                                },
                                className: `w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${isActive ? 'bg-teal-50 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CatIcon, {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 214,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-1 text-left",
                                        children: cat.name
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 215,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-1.5 py-0.5 rounded text-xs font-bold ${isActive ? 'bg-teal-200 dark:bg-teal-500/30' : 'bg-slate-200 dark:bg-slate-600'}`,
                                        children: cat.count
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 216,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, cat.id, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 213,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                        lineNumber: 208,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CategoryDropdown, "+sus0Lb0ewKHdwiUhiTAJFoFyQ0=");
_c3 = CategoryDropdown;
// ============================================
// Fullscreen A4 Preview (unchanged - already fullscreen)
// ============================================
const FullscreenA4Preview = ({ assessment, onClose })=>{
    _s1();
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [activeTool, setActiveTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('select');
    const [annotations, setAnnotations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAnnotationId, setSelectedAnnotationId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [annotationColor, setAnnotationColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('#0d9488');
    const [editingTextId, setEditingTextId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showColorPicker, setShowColorPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentArrow, setCurrentArrow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [freehandPoints, setFreehandPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const isDrawingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const drawStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeToolRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('select');
    const annotationColorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('#0d9488');
    const zoomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(1);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        []
    ]);
    const [historyIndex, setHistoryIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveSuccess, setSaveSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FullscreenA4Preview.useEffect": ()=>{
            activeToolRef.current = activeTool;
        }
    }["FullscreenA4Preview.useEffect"], [
        activeTool
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FullscreenA4Preview.useEffect": ()=>{
            annotationColorRef.current = annotationColor;
        }
    }["FullscreenA4Preview.useEffect"], [
        annotationColor
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FullscreenA4Preview.useEffect": ()=>{
            zoomRef.current = zoom;
        }
    }["FullscreenA4Preview.useEffect"], [
        zoom
    ]);
    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < history.length - 1;
    const currentAnnotations = annotations.filter((a)=>a.pageIndex === 0);
    const saveToHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FullscreenA4Preview.useCallback[saveToHistory]": (newAnnotations)=>{
            setHistory({
                "FullscreenA4Preview.useCallback[saveToHistory]": (prev)=>{
                    const newHistory = prev.slice(0, historyIndex + 1);
                    newHistory.push([
                        ...newAnnotations
                    ]);
                    if (newHistory.length > MAX_HISTORY) newHistory.shift();
                    return newHistory;
                }
            }["FullscreenA4Preview.useCallback[saveToHistory]"]);
            setHistoryIndex({
                "FullscreenA4Preview.useCallback[saveToHistory]": (prev)=>Math.min(prev + 1, MAX_HISTORY - 1)
            }["FullscreenA4Preview.useCallback[saveToHistory]"]);
        }
    }["FullscreenA4Preview.useCallback[saveToHistory]"], [
        historyIndex
    ]);
    const addAnnotation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FullscreenA4Preview.useCallback[addAnnotation]": (annotation)=>{
            setAnnotations({
                "FullscreenA4Preview.useCallback[addAnnotation]": (prev)=>{
                    const newAnnotations = [
                        ...prev,
                        annotation
                    ];
                    saveToHistory(newAnnotations);
                    return newAnnotations;
                }
            }["FullscreenA4Preview.useCallback[addAnnotation]"]);
        }
    }["FullscreenA4Preview.useCallback[addAnnotation]"], [
        saveToHistory
    ]);
    const deleteAnnotation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FullscreenA4Preview.useCallback[deleteAnnotation]": (id)=>{
            setAnnotations({
                "FullscreenA4Preview.useCallback[deleteAnnotation]": (prev)=>{
                    const newAnnotations = prev.filter({
                        "FullscreenA4Preview.useCallback[deleteAnnotation].newAnnotations": (a)=>a.id !== id
                    }["FullscreenA4Preview.useCallback[deleteAnnotation].newAnnotations"]);
                    saveToHistory(newAnnotations);
                    return newAnnotations;
                }
            }["FullscreenA4Preview.useCallback[deleteAnnotation]"]);
            setSelectedAnnotationId(null);
            setEditingTextId(null);
        }
    }["FullscreenA4Preview.useCallback[deleteAnnotation]"], [
        saveToHistory
    ]);
    const handleUndo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FullscreenA4Preview.useCallback[handleUndo]": ()=>{
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setAnnotations(history[newIndex] || []);
                setSelectedAnnotationId(null);
            }
        }
    }["FullscreenA4Preview.useCallback[handleUndo]"], [
        historyIndex,
        history
    ]);
    const handleRedo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FullscreenA4Preview.useCallback[handleRedo]": ()=>{
            if (historyIndex < history.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setAnnotations(history[newIndex] || []);
                setSelectedAnnotationId(null);
            }
        }
    }["FullscreenA4Preview.useCallback[handleRedo]"], [
        historyIndex,
        history
    ]);
    const clearAllAnnotations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FullscreenA4Preview.useCallback[clearAllAnnotations]": ()=>{
            if (annotations.length === 0) return;
            const confirmed = window.confirm('ต้องการลบ annotation ทั้งหมด?');
            if (!confirmed) return;
            setAnnotations([]);
            saveToHistory([]);
            setSelectedAnnotationId(null);
        }
    }["FullscreenA4Preview.useCallback[clearAllAnnotations]"], [
        annotations.length,
        saveToHistory
    ]);
    const getCanvasCoords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FullscreenA4Preview.useCallback[getCanvasCoords]": (clientX, clientY)=>{
            const canvas = canvasRef.current;
            if (!canvas) return null;
            const rect = canvas.getBoundingClientRect();
            return {
                x: (clientX - rect.left) / zoomRef.current,
                y: (clientY - rect.top) / zoomRef.current
            };
        }
    }["FullscreenA4Preview.useCallback[getCanvasCoords]"], []);
    const handleCanvasClick = (e)=>{
        if (activeTool === 'select') {
            setSelectedAnnotationId(null);
            setEditingTextId(null);
            return;
        }
        if (activeTool === 'text') {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const coords = {
                x: (e.clientX - rect.left) / zoom,
                y: (e.clientY - rect.top) / zoom
            };
            const newText = {
                id: `text-${Date.now()}`,
                type: 'text',
                x: coords.x,
                y: coords.y,
                text: '',
                fontSize: 14,
                color: annotationColor,
                pageIndex: 0
            };
            addAnnotation(newText);
            setEditingTextId(newText.id);
            setSelectedAnnotationId(newText.id);
        }
    };
    const handleMouseDown = (e)=>{
        if (activeTool !== 'arrow' && activeTool !== 'freehand') return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const coords = {
            x: (e.clientX - rect.left) / zoom,
            y: (e.clientY - rect.top) / zoom
        };
        isDrawingRef.current = true;
        drawStartRef.current = coords;
        if (activeTool === 'arrow') setCurrentArrow({
            startX: coords.x,
            startY: coords.y,
            endX: coords.x,
            endY: coords.y
        });
        else setFreehandPoints([
            coords
        ]);
    };
    const handleMouseMove = (e)=>{
        if (!isDrawingRef.current) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const coords = {
            x: (e.clientX - rect.left) / zoom,
            y: (e.clientY - rect.top) / zoom
        };
        if (activeTool === 'arrow' && drawStartRef.current) setCurrentArrow({
            startX: drawStartRef.current.x,
            startY: drawStartRef.current.y,
            endX: coords.x,
            endY: coords.y
        });
        else if (activeTool === 'freehand') setFreehandPoints((prev)=>[
                ...prev,
                coords
            ]);
    };
    const handleMouseUp = ()=>{
        if (!isDrawingRef.current) return;
        if (activeTool === 'arrow' && currentArrow) {
            const dx = currentArrow.endX - currentArrow.startX;
            const dy = currentArrow.endY - currentArrow.startY;
            if (Math.sqrt(dx * dx + dy * dy) > 10) addAnnotation({
                id: `arrow-${Date.now()}`,
                type: 'arrow',
                ...currentArrow,
                color: annotationColor,
                strokeWidth: 2,
                pageIndex: 0
            });
            setCurrentArrow(null);
        } else if (activeTool === 'freehand' && freehandPoints.length > 1) {
            addAnnotation({
                id: `freehand-${Date.now()}`,
                type: 'freehand',
                points: freehandPoints,
                color: annotationColor,
                strokeWidth: 2,
                pageIndex: 0
            });
            setFreehandPoints([]);
        }
        isDrawingRef.current = false;
        drawStartRef.current = null;
    };
    const handleTextChange = (id, text)=>setAnnotations((prev)=>prev.map((a)=>a.id === id && a.type === 'text' ? {
                    ...a,
                    text
                } : a));
    const handleTextBlur = (id, text)=>{
        if (!text.trim()) deleteAnnotation(id);
        else saveToHistory(annotations);
        setEditingTextId(null);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FullscreenA4Preview.useEffect": ()=>{
            const handleKeyDown = {
                "FullscreenA4Preview.useEffect.handleKeyDown": (e)=>{
                    if (editingTextId) {
                        if (e.key === 'Escape') setEditingTextId(null);
                        return;
                    }
                    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                        e.preventDefault();
                        handleUndo();
                        return;
                    }
                    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'z' && e.shiftKey)) {
                        e.preventDefault();
                        handleRedo();
                        return;
                    }
                    if ((e.key === 'Delete' || e.key === 'Backspace') && selectedAnnotationId) {
                        e.preventDefault();
                        deleteAnnotation(selectedAnnotationId);
                        return;
                    }
                    if (e.key === 'Escape') {
                        setSelectedAnnotationId(null);
                        setActiveTool('select');
                        return;
                    }
                    if (e.key === 'v' || e.key === 'V') setActiveTool('select');
                    if (e.key === 't' || e.key === 'T') setActiveTool('text');
                    if (e.key === 'a' || e.key === 'A') setActiveTool('arrow');
                    if (e.key === 'd' || e.key === 'D') setActiveTool('freehand');
                }
            }["FullscreenA4Preview.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "FullscreenA4Preview.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["FullscreenA4Preview.useEffect"];
        }
    }["FullscreenA4Preview.useEffect"], [
        handleUndo,
        handleRedo,
        deleteAnnotation,
        selectedAnnotationId,
        editingTextId
    ]);
    const handleSave = async ()=>{
        setIsSaving(true);
        await new Promise((resolve)=>setTimeout(resolve, 1000));
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(()=>setSaveSuccess(false), 2000);
    };
    const handleZoomIn = ()=>setZoom((prev)=>Math.min(prev + 0.1, 2));
    const handleZoomOut = ()=>setZoom((prev)=>Math.max(prev - 0.1, 0.5));
    const handlePrint = ()=>window.print();
    const isDrawingTool = activeTool === 'arrow' || activeTool === 'freehand';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm shrink-0",
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
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 406,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium hidden sm:inline",
                                        children: "กลับ"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 406,
                                        columnNumber: 46
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 405,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CategoryIcon, {
                                category: assessment.category,
                                size: "sm"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 408,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "font-bold text-slate-800 dark:text-white text-base",
                                        children: assessment.name
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 410,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-500",
                                        children: assessment.nameTh
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 411,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 409,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                        lineNumber: 404,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                                status: assessment.status
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 415,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            assessment.riskLevel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RiskBadge, {
                                risk: assessment.riskLevel
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 416,
                                columnNumber: 36
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg p-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleZoomOut,
                                        disabled: zoom <= 0.5,
                                        className: "w-7 h-7 rounded flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-600 disabled:opacity-30",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__["ZoomOut"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 418,
                                            columnNumber: 223
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 418,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-12 text-center text-xs font-medium text-slate-600 dark:text-slate-300",
                                        children: [
                                            Math.round(zoom * 100),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 419,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleZoomIn,
                                        disabled: zoom >= 2,
                                        className: "w-7 h-7 rounded flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-600 disabled:opacity-30",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 420,
                                            columnNumber: 220
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 420,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 417,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handlePrint,
                                className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                    className: "w-5 h-5 text-slate-500"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 422,
                                    columnNumber: 111
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 422,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                    className: "w-5 h-5 text-slate-500"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 423,
                                    columnNumber: 89
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 423,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSave,
                                disabled: isSaving,
                                className: `h-9 px-4 flex items-center gap-2 rounded-xl font-medium text-sm shadow-sm transition-all ${saveSuccess ? 'bg-emerald-500 text-white' : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white'}`,
                                children: [
                                    isSaving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "w-4 h-4 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 425,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)) : saveSuccess ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 425,
                                        columnNumber: 86
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 425,
                                        columnNumber: 118
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        children: saveSuccess ? 'บันทึกแล้ว' : isSaving ? 'กำลังบันทึก...' : 'บันทึก'
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 426,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 424,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "p-2 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5 text-slate-500"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 428,
                                    columnNumber: 106
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 428,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                        lineNumber: 414,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                lineNumber: 403,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-14 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col items-center py-4 gap-2 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center gap-1 p-1.5 bg-slate-100 dark:bg-slate-700 rounded-xl",
                                children: [
                                    {
                                        tool: 'select',
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__["MousePointer2"],
                                        title: 'เลือก (V)'
                                    },
                                    {
                                        tool: 'text',
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__["Type"],
                                        title: 'ข้อความ (T)'
                                    },
                                    {
                                        tool: 'arrow',
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveRight$3e$__["MoveRight"],
                                        title: 'ลูกศร (A)'
                                    },
                                    {
                                        tool: 'freehand',
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"],
                                        title: 'วาดเส้น (D)'
                                    }
                                ].map(({ tool, icon: Icon, title })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveTool(tool),
                                        className: `w-10 h-10 rounded-lg flex items-center justify-center transition-all ${activeTool === tool ? 'bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg' : 'text-slate-500 hover:bg-white dark:hover:bg-slate-600'}`,
                                        title: title,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 443,
                                            columnNumber: 317
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, tool, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 443,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 436,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-px bg-slate-200 dark:bg-slate-700"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 446,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowColorPicker(!showColorPicker),
                                        className: "w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600",
                                        style: {
                                            backgroundColor: annotationColor
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 448,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    showColorPicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "fixed inset-0 z-10",
                                                onClick: ()=>setShowColorPicker(false)
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                lineNumber: 451,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute left-full ml-2 top-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-2 z-20 flex flex-col gap-1",
                                                children: ANNOTATION_COLORS.map(({ color, name })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setAnnotationColor(color);
                                                            setShowColorPicker(false);
                                                        },
                                                        className: `w-8 h-8 rounded-lg ${annotationColor === color ? 'ring-2 ring-offset-2 ring-slate-400' : ''}`,
                                                        style: {
                                                            backgroundColor: color
                                                        },
                                                        title: name
                                                    }, color, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                        lineNumber: 454,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                lineNumber: 452,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 447,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-px bg-slate-200 dark:bg-slate-700"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 460,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleUndo,
                                disabled: !canUndo,
                                className: `w-10 h-10 rounded-lg flex items-center justify-center ${canUndo ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-300'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__["Undo2"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 461,
                                    columnNumber: 196
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 461,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleRedo,
                                disabled: !canRedo,
                                className: `w-10 h-10 rounded-lg flex items-center justify-center ${canRedo ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-300'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$redo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Redo2$3e$__["Redo2"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 462,
                                    columnNumber: 196
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 462,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-px bg-slate-200 dark:bg-slate-700"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 463,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            selectedAnnotationId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>deleteAnnotation(selectedAnnotationId),
                                className: "w-10 h-10 rounded-lg bg-red-100 text-red-600 hover:bg-red-200",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 465,
                                    columnNumber: 150
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 465,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)) : currentAnnotations.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: clearAllAnnotations,
                                className: "w-10 h-10 rounded-lg text-slate-400 hover:bg-slate-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__["Eraser"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 467,
                                    columnNumber: 118
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 467,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                        lineNumber: 435,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-auto p-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: canvasRef,
                            className: `relative bg-white shadow-2xl rounded-lg overflow-hidden mx-auto ${activeTool === 'text' && 'cursor-text'} ${isDrawingTool && 'cursor-crosshair'}`,
                            style: {
                                width: `${CANVAS_WIDTH}px`,
                                height: `${CANVAS_HEIGHT}px`,
                                transform: `scale(${zoom})`,
                                transformOrigin: 'top center'
                            },
                            onClick: handleCanvasClick,
                            onMouseDown: handleMouseDown,
                            onMouseMove: handleMouseMove,
                            onMouseUp: handleMouseUp,
                            onMouseLeave: handleMouseUp,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gradient-to-r from-slate-700 to-slate-800 text-white px-8 py-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "text-xl font-bold",
                                                        children: assessment.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                        lineNumber: 477,
                                                        columnNumber: 22
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-300 mt-1",
                                                        children: assessment.nameTh
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                        lineNumber: 477,
                                                        columnNumber: 78
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                lineNumber: 477,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-right",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-slate-300",
                                                        children: "เอกสารเลขที่"
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                        lineNumber: 478,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono font-bold text-lg",
                                                        children: [
                                                            "IPD-ASM-",
                                                            assessment.id.toString().padStart(4, '0')
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                        lineNumber: 478,
                                                        columnNumber: 103
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                lineNumber: 478,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 476,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 475,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-8 py-4 bg-slate-50 border-b border-slate-200",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-4 gap-6 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-500 block text-xs",
                                                        children: "ชื่อผู้ป่วย:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                        lineNumber: 484,
                                                        columnNumber: 22
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold",
                                                        children: "นายสมชาย ใจดี"
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                        lineNumber: 484,
                                                        columnNumber: 88
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                lineNumber: 484,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-500 block text-xs",
                                                        children: "HN:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                        lineNumber: 485,
                                                        columnNumber: 22
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-mono font-semibold",
                                                        children: "6712345"
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                        lineNumber: 485,
                                                        columnNumber: 79
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                lineNumber: 485,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-500 block text-xs",
                                                        children: "AN:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                        lineNumber: 486,
                                                        columnNumber: 22
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-mono font-semibold",
                                                        children: "670001234"
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                        lineNumber: 486,
                                                        columnNumber: 79
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                lineNumber: 486,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-500 block text-xs",
                                                        children: "Ward:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                        lineNumber: 487,
                                                        columnNumber: 22
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold",
                                                        children: "อายุรกรรม ชาย 1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                        lineNumber: 487,
                                                        columnNumber: 81
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                lineNumber: 487,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 483,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 482,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-8 py-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-6 mb-6 pb-4 border-b border-slate-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-slate-500 block mb-1",
                                                            children: "สถานะ"
                                                        }, void 0, false, {
                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                            lineNumber: 493,
                                                            columnNumber: 22
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                                                            status: assessment.status
                                                        }, void 0, false, {
                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                            lineNumber: 493,
                                                            columnNumber: 86
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                assessment.score && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-slate-500 block mb-1",
                                                            children: "คะแนน"
                                                        }, void 0, false, {
                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                            lineNumber: 494,
                                                            columnNumber: 43
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xl font-bold",
                                                            children: assessment.score
                                                        }, void 0, false, {
                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                            lineNumber: 494,
                                                            columnNumber: 107
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                    lineNumber: 494,
                                                    columnNumber: 38
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                assessment.riskLevel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-slate-500 block mb-1",
                                                            children: "ระดับความเสี่ยง"
                                                        }, void 0, false, {
                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                            lineNumber: 495,
                                                            columnNumber: 47
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RiskBadge, {
                                                            risk: assessment.riskLevel
                                                        }, void 0, false, {
                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                            lineNumber: 495,
                                                            columnNumber: 121
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                    lineNumber: 495,
                                                    columnNumber: 42
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 492,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold mb-3 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-7 h-7 rounded-lg bg-teal-500 text-white flex items-center justify-center text-sm font-bold",
                                                            children: "1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                            lineNumber: 500,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "ข้อมูลทั่วไป"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                    lineNumber: 499,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-slate-50 rounded-xl p-4 border border-slate-100",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-4",
                                                        children: [
                                                            'รับทราบสิทธิผู้ป่วย',
                                                            'ยืนยันตัวตนผู้ป่วย',
                                                            'ประวัติแพ้ยา: Penicillin, Aspirin',
                                                            'โรคประจำตัว: HT, DM, DLP'
                                                        ].map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                            className: "w-3 h-3 text-white",
                                                                            strokeWidth: 3
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                            lineNumber: 505,
                                                                            columnNumber: 160
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                        lineNumber: 505,
                                                                        columnNumber: 74
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm",
                                                                        children: item
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                        lineNumber: 505,
                                                                        columnNumber: 222
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, idx, true, {
                                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                lineNumber: 505,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                    }, void 0, false, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                        lineNumber: 503,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                    lineNumber: 502,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 498,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold mb-3 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-7 h-7 rounded-lg bg-teal-500 text-white flex items-center justify-center text-sm font-bold",
                                                            children: "2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                            lineNumber: 513,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "การประเมิน"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                    lineNumber: 512,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-slate-50 rounded-xl p-4 border border-slate-100",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                        className: "w-full text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    className: "border-b border-slate-200",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "text-left py-2 text-slate-500",
                                                                            children: "หัวข้อ"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                            lineNumber: 517,
                                                                            columnNumber: 70
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "text-center py-2 text-slate-500 w-20",
                                                                            children: "คะแนน"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                            lineNumber: 517,
                                                                            columnNumber: 127
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "text-left py-2 text-slate-500",
                                                                            children: "หมายเหตุ"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                            lineNumber: 517,
                                                                            columnNumber: 190
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                    lineNumber: 517,
                                                                    columnNumber: 28
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                lineNumber: 517,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                                children: [
                                                                    {
                                                                        topic: 'ประวัติการพลัดตกหกล้ม',
                                                                        score: 25,
                                                                        note: 'มีประวัติ 1 ครั้ง'
                                                                    },
                                                                    {
                                                                        topic: 'การใช้ยาที่มีผลต่อการทรงตัว',
                                                                        score: 15,
                                                                        note: 'Morphine PRN'
                                                                    }
                                                                ].map((row, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                        className: "border-b border-slate-100",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                className: "py-3",
                                                                                children: row.topic
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                                lineNumber: 520,
                                                                                columnNumber: 77
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                className: "py-3 text-center font-semibold",
                                                                                children: row.score
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                                lineNumber: 520,
                                                                                columnNumber: 114
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                className: "py-3 text-slate-500",
                                                                                children: row.note
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                                lineNumber: 520,
                                                                                columnNumber: 177
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, idx, true, {
                                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                        lineNumber: 520,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            }, void 0, false, {
                                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                lineNumber: 518,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                        lineNumber: 516,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                    lineNumber: 515,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 511,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 491,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "absolute inset-0 pointer-events-none",
                                    width: CANVAS_WIDTH,
                                    height: CANVAS_HEIGHT,
                                    style: {
                                        zIndex: 1000
                                    },
                                    children: [
                                        currentAnnotations.map((annotation)=>{
                                            if (annotation.type === 'arrow') {
                                                const a = annotation;
                                                const angle = Math.atan2(a.endY - a.startY, a.endX - a.startX);
                                                const arrowLen = 12;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                    className: "pointer-events-auto cursor-pointer",
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        setSelectedAnnotationId(a.id);
                                                        setActiveTool('select');
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                            x1: a.startX,
                                                            y1: a.startY,
                                                            x2: a.endX,
                                                            y2: a.endY,
                                                            stroke: a.color,
                                                            strokeWidth: 2
                                                        }, void 0, false, {
                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                            lineNumber: 537,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                            points: `${a.endX},${a.endY} ${a.endX - arrowLen * Math.cos(angle - Math.PI / 6)},${a.endY - arrowLen * Math.sin(angle - Math.PI / 6)} ${a.endX - arrowLen * Math.cos(angle + Math.PI / 6)},${a.endY - arrowLen * Math.sin(angle + Math.PI / 6)}`,
                                                            fill: a.color
                                                        }, void 0, false, {
                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                            lineNumber: 538,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, a.id, true, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                    lineNumber: 536,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0));
                                            }
                                            if (annotation.type === 'freehand') {
                                                const f = annotation;
                                                const pathD = f.points.map((p, i)=>`${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: pathD,
                                                    stroke: f.color,
                                                    strokeWidth: 2,
                                                    fill: "none",
                                                    strokeLinecap: "round",
                                                    className: "pointer-events-auto cursor-pointer",
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        setSelectedAnnotationId(f.id);
                                                        setActiveTool('select');
                                                    }
                                                }, f.id, false, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                    lineNumber: 545,
                                                    columnNumber: 26
                                                }, ("TURBOPACK compile-time value", void 0));
                                            }
                                            return null;
                                        }),
                                        currentArrow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: currentArrow.startX,
                                            y1: currentArrow.startY,
                                            x2: currentArrow.endX,
                                            y2: currentArrow.endY,
                                            stroke: annotationColor,
                                            strokeWidth: 2,
                                            strokeDasharray: "5,5"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 549,
                                            columnNumber: 32
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        freehandPoints.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: freehandPoints.map((p, i)=>`${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' '),
                                            stroke: annotationColor,
                                            strokeWidth: 2,
                                            fill: "none",
                                            opacity: 0.7
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 550,
                                            columnNumber: 45
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 529,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                currentAnnotations.filter((a)=>a.type === 'text').map((annotation)=>{
                                    const t = annotation;
                                    const isEditing = editingTextId === t.id;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `absolute ${selectedAnnotationId === t.id && !isEditing && 'ring-2 ring-teal-500 rounded'}`,
                                        style: {
                                            left: t.x,
                                            top: t.y,
                                            color: t.color,
                                            fontSize: t.fontSize,
                                            zIndex: 1001
                                        },
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            setSelectedAnnotationId(t.id);
                                            if (!isEditing) setEditingTextId(t.id);
                                        },
                                        children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: t.text,
                                            onChange: (e)=>handleTextChange(t.id, e.target.value),
                                            onBlur: ()=>handleTextBlur(t.id, t.text),
                                            onKeyDown: (e)=>{
                                                if (e.key === 'Enter') handleTextBlur(t.id, t.text);
                                                if (e.key === 'Escape') setEditingTextId(null);
                                            },
                                            autoFocus: true,
                                            className: "bg-white border-2 border-teal-400 rounded-lg px-2 py-1 min-w-[150px]",
                                            style: {
                                                color: t.color,
                                                fontSize: t.fontSize
                                            },
                                            placeholder: "พิมพ์ข้อความ..."
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 560,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "cursor-pointer whitespace-nowrap px-1.5 py-0.5 rounded bg-white/80 shadow-sm",
                                            children: t.text || 'คลิกเพื่อพิมพ์...'
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 562,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, t.id, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 558,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                            lineNumber: 473,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                        lineNumber: 472,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                lineNumber: 433,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            activeTool !== 'select' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm shadow-xl flex items-center gap-2",
                children: [
                    activeTool === 'text' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__["Type"], {
                                className: "w-4 h-4 text-teal-400"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 573,
                                columnNumber: 39
                            }, ("TURBOPACK compile-time value", void 0)),
                            " คลิกเพื่อเพิ่มข้อความ"
                        ]
                    }, void 0, true),
                    activeTool === 'arrow' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveRight$3e$__["MoveRight"], {
                                className: "w-4 h-4 text-teal-400"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 574,
                                columnNumber: 40
                            }, ("TURBOPACK compile-time value", void 0)),
                            " ลากเพื่อวาดลูกศร"
                        ]
                    }, void 0, true),
                    activeTool === 'freehand' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                className: "w-4 h-4 text-teal-400"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 575,
                                columnNumber: 43
                            }, ("TURBOPACK compile-time value", void 0)),
                            " ลากเพื่อวาดเส้น"
                        ]
                    }, void 0, true),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-slate-400 text-xs ml-2",
                        children: "กด ESC เพื่อยกเลิก"
                    }, void 0, false, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                        lineNumber: 576,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                lineNumber: 572,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
        lineNumber: 401,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(FullscreenA4Preview, "CjsWteyl1M7Imp4dQwPeW1XZ0x8=");
_c4 = FullscreenA4Preview;
function AssessmentsTab() {
    _s2();
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('list');
    const [selectedAssessment, setSelectedAssessment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const filteredAssessments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AssessmentsTab.useMemo[filteredAssessments]": ()=>mockAssessments.filter({
                "AssessmentsTab.useMemo[filteredAssessments]": (a)=>{
                    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
                    const matchesSearch = !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.nameTh.includes(searchQuery);
                    return matchesCategory && matchesSearch;
                }
            }["AssessmentsTab.useMemo[filteredAssessments]"])
    }["AssessmentsTab.useMemo[filteredAssessments]"], [
        selectedCategory,
        searchQuery
    ]);
    const groupedAssessments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AssessmentsTab.useMemo[groupedAssessments]": ()=>{
            if (selectedCategory !== 'all') return {
                [selectedCategory]: filteredAssessments
            };
            const grouped = {};
            filteredAssessments.forEach({
                "AssessmentsTab.useMemo[groupedAssessments]": (a)=>{
                    if (!grouped[a.category]) grouped[a.category] = [];
                    grouped[a.category].push(a);
                }
            }["AssessmentsTab.useMemo[groupedAssessments]"]);
            return grouped;
        }
    }["AssessmentsTab.useMemo[groupedAssessments]"], [
        filteredAssessments,
        selectedCategory
    ]);
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AssessmentsTab.useMemo[stats]": ()=>({
                total: mockAssessments.length,
                completed: mockAssessments.filter({
                    "AssessmentsTab.useMemo[stats]": (a)=>a.status === 'completed'
                }["AssessmentsTab.useMemo[stats]"]).length,
                pending: mockAssessments.filter({
                    "AssessmentsTab.useMemo[stats]": (a)=>a.status === 'pending'
                }["AssessmentsTab.useMemo[stats]"]).length,
                highRisk: mockAssessments.filter({
                    "AssessmentsTab.useMemo[stats]": (a)=>a.riskLevel === 'high' || a.riskLevel === 'critical'
                }["AssessmentsTab.useMemo[stats]"]).length
            })
    }["AssessmentsTab.useMemo[stats]"], []);
    const handleSelectAssessment = (assessment)=>{
        setSelectedAssessment(assessment);
        setIsFullscreen(true);
    };
    const handleCloseFullscreen = ()=>setIsFullscreen(false);
    if (isFullscreen && selectedAssessment) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FullscreenA4Preview, {
        assessment: selectedAssessment,
        onClose: handleCloseFullscreen
    }, void 0, false, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
        lineNumber: 612,
        columnNumber: 50
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/25",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 621,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 620,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "font-bold text-slate-800 dark:text-white",
                                            children: "Assessment Forms"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 624,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-slate-500",
                                            children: "แบบประเมินผู้ป่วย"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 625,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 623,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                            lineNumber: 619,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 flex-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-500",
                                            children: "ทั้งหมด:"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 630,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-1 font-bold text-slate-700 dark:text-slate-200",
                                            children: stats.total
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 631,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 629,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "px-2 py-1 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-emerald-600",
                                            children: "เสร็จ:"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 634,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-1 font-bold text-emerald-700",
                                            children: stats.completed
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 635,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 633,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "px-2 py-1 bg-amber-100 dark:bg-amber-500/20 rounded-lg text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-amber-600",
                                            children: "รอ:"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 638,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-1 font-bold text-amber-700",
                                            children: stats.pending
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 639,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 637,
                                    columnNumber: 13
                                }, this),
                                stats.highRisk > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "px-2 py-1 bg-red-100 dark:bg-red-500/20 rounded-lg text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-600",
                                            children: "เสี่ยงสูง:"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 643,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-1 font-bold text-red-700",
                                            children: stats.highRisk
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 644,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 642,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                            lineNumber: 628,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                    lineNumber: 618,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                lineNumber: 617,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "md:w-52 shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CategoryDropdown, {
                                selectedCategory: selectedCategory,
                                onSelect: setSelectedCategory
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 656,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                            lineNumber: 655,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 661,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: searchQuery,
                                    onChange: (e)=>setSearchQuery(e.target.value),
                                    placeholder: "ค้นหาแบบประเมิน...",
                                    className: "w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-700 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                                }, void 0, false, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 662,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                            lineNumber: 660,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setViewMode('list'),
                                            className: `p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-700' : 'text-slate-500 hover:text-slate-700'}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutList$3e$__["LayoutList"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                lineNumber: 678,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 674,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setViewMode('grid'),
                                            className: `p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-700' : 'text-slate-500 hover:text-slate-700'}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                lineNumber: 684,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 680,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 673,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-teal-500/25",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 688,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hidden sm:inline",
                                            children: "เพิ่มแบบประเมิน"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 689,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 687,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                            lineNumber: 672,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                    lineNumber: 653,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                lineNumber: 652,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-1.5 rounded-lg bg-cyan-500",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                            className: "w-3.5 h-3.5 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 701,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 700,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold text-slate-800 dark:text-white",
                                        children: "รายการแบบประเมิน"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 703,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-2 py-0.5 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400",
                                        children: [
                                            filteredAssessments.length,
                                            " รายการ"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 704,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 699,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-500 hidden md:block",
                                children: "คลิกที่รายการเพื่อดูรายละเอียด"
                            }, void 0, false, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 708,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                        lineNumber: 698,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4",
                        children: [
                            Object.entries(groupedAssessments).map(([categoryId, assessments])=>{
                                const category = categories.find((c)=>c.id === categoryId);
                                if (!category || assessments.length === 0) return null;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-6 last:mb-0",
                                    children: [
                                        selectedCategory === 'all' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CategoryIcon, {
                                                    category: categoryId,
                                                    size: "sm"
                                                }, void 0, false, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                    lineNumber: 721,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold text-slate-800 dark:text-white text-sm",
                                                    children: category.name
                                                }, void 0, false, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                    lineNumber: 722,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-bold text-slate-500",
                                                    children: assessments.length
                                                }, void 0, false, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                    lineNumber: 723,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 720,
                                            columnNumber: 19
                                        }, this),
                                        viewMode === 'list' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: assessments.map((assessment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleSelectAssessment(assessment),
                                                    className: "w-full p-4 rounded-xl border transition-all text-left hover:shadow-md border-slate-200/50 dark:border-slate-700/50 hover:border-teal-300 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-700/50",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CategoryIcon, {
                                                                category: assessment.category
                                                            }, void 0, false, {
                                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                lineNumber: 738,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2 flex-wrap",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                                className: "font-semibold text-slate-800 dark:text-white",
                                                                                children: assessment.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                                lineNumber: 741,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                                                                                status: assessment.status
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                                lineNumber: 742,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            assessment.riskLevel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RiskBadge, {
                                                                                risk: assessment.riskLevel
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                                lineNumber: 743,
                                                                                columnNumber: 56
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                        lineNumber: 740,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-slate-500 mt-1",
                                                                        children: assessment.nameTh
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                        lineNumber: 745,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-4 mt-2 text-xs text-slate-400",
                                                                        children: [
                                                                            assessment.score && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-bold text-slate-600 dark:text-slate-300",
                                                                                children: assessment.score
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                                lineNumber: 747,
                                                                                columnNumber: 52
                                                                            }, this),
                                                                            assessment.assessedBy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "flex items-center gap-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                                        className: "w-3 h-3"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                                        lineNumber: 750,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    assessment.assessedBy
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                                lineNumber: 749,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            assessment.lastUpdated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "flex items-center gap-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                                        className: "w-3 h-3"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                                        lineNumber: 755,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    assessment.lastUpdated
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                                lineNumber: 754,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                        lineNumber: 746,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                lineNumber: 739,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                className: "w-5 h-5 text-slate-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                lineNumber: 760,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                        lineNumber: 737,
                                                        columnNumber: 25
                                                    }, this)
                                                }, assessment.id, false, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                    lineNumber: 732,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 730,
                                            columnNumber: 19
                                        }, this),
                                        viewMode === 'grid' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3",
                                            children: assessments.map((assessment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleSelectAssessment(assessment),
                                                    className: "p-4 rounded-xl border transition-all text-left hover:shadow-md border-slate-200/50 dark:border-slate-700/50 hover:border-teal-300 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-700/50",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 mb-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CategoryIcon, {
                                                                    category: assessment.category,
                                                                    size: "sm"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                    lineNumber: 776,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                                                                    status: assessment.status
                                                                }, void 0, false, {
                                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                    lineNumber: 777,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                            lineNumber: 775,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-semibold text-slate-800 dark:text-white text-sm line-clamp-1",
                                                            children: assessment.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                            lineNumber: 779,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-slate-500 mt-1 line-clamp-1",
                                                            children: assessment.nameTh
                                                        }, void 0, false, {
                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                            lineNumber: 780,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-700",
                                                            children: [
                                                                assessment.score ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-bold text-slate-700 dark:text-slate-300",
                                                                    children: assessment.score
                                                                }, void 0, false, {
                                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                    lineNumber: 783,
                                                                    columnNumber: 29
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs text-slate-400",
                                                                    children: "-"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                    lineNumber: 785,
                                                                    columnNumber: 29
                                                                }, this),
                                                                assessment.riskLevel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RiskBadge, {
                                                                    risk: assessment.riskLevel
                                                                }, void 0, false, {
                                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                                    lineNumber: 787,
                                                                    columnNumber: 52
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                            lineNumber: 781,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, assessment.id, true, {
                                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                                    lineNumber: 770,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                            lineNumber: 768,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, categoryId, true, {
                                    fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                    lineNumber: 718,
                                    columnNumber: 15
                                }, this);
                            }),
                            filteredAssessments.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileQuestion$3e$__["FileQuestion"], {
                                        className: "w-16 h-16 mx-auto text-slate-300 mb-4"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 799,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-500 text-lg",
                                        children: "ไม่พบแบบประเมิน"
                                    }, void 0, false, {
                                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                        lineNumber: 800,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                                lineNumber: 798,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                        lineNumber: 712,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
                lineNumber: 696,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/his-web/src/app/ipd/[an]/_components/AssessmentsTab.tsx",
        lineNumber: 615,
        columnNumber: 5
    }, this);
}
_s2(AssessmentsTab, "3YXZi7ml4Iyt3lWzvMAuSiVgxF4=");
_c5 = AssessmentsTab;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "StatusBadge");
__turbopack_context__.k.register(_c1, "RiskBadge");
__turbopack_context__.k.register(_c2, "CategoryIcon");
__turbopack_context__.k.register(_c3, "CategoryDropdown");
__turbopack_context__.k.register(_c4, "FullscreenA4Preview");
__turbopack_context__.k.register(_c5, "AssessmentsTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=his-web_src_app_ipd_%5Ban%5D__components_AssessmentsTab_tsx_8ede4a2b._.js.map