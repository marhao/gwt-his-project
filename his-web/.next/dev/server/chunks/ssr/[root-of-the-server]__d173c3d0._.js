module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/his-web/src/components/providers/ThemeProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function ThemeProvider({ children }) {
    const [theme, setThemeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('light');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Check localStorage and system preference
        const stored = localStorage.getItem('theme');
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const initialTheme = stored || systemPreference;
        setThemeState(initialTheme);
        // Apply theme to document
        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        setMounted(true);
    }, []);
    const setTheme = (newTheme)=>{
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
        // Apply theme to document
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };
    const toggleTheme = ()=>{
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    const value = {
        theme,
        toggleTheme,
        setTheme
    };
    // Always provide context
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: value,
        children: mounted ? children : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-slate-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
            }, void 0, false, {
                fileName: "[project]/his-web/src/components/providers/ThemeProvider.tsx",
                lineNumber: 70,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/his-web/src/components/providers/ThemeProvider.tsx",
            lineNumber: 69,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/his-web/src/components/providers/ThemeProvider.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
function useTheme() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (context === null) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
}),
"[project]/his-web/src/components/providers/LayoutProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LayoutProvider",
    ()=>LayoutProvider,
    "useLayout",
    ()=>useLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const LayoutContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function LayoutProvider({ children }) {
    const [mode, setModeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('sidebar');
    const [sidebarCollapsed, setSidebarCollapsedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileMenuOpen, setMobileMenuOpenState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
        // Check localStorage for saved preferences
        const storedMode = localStorage.getItem('layoutMode');
        const storedCollapsed = localStorage.getItem('sidebarCollapsed');
        if (storedMode) setModeState(storedMode);
        if (storedCollapsed) setSidebarCollapsedState(storedCollapsed === 'true');
        // Check if mobile
        const checkMobile = ()=>{
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return ()=>window.removeEventListener('resize', checkMobile);
    }, []);
    const setMode = (newMode)=>{
        setModeState(newMode);
        localStorage.setItem('layoutMode', newMode);
    };
    const toggleMode = ()=>{
        setMode(mode === 'sidebar' ? 'horizontal' : 'sidebar');
    };
    const setSidebarCollapsed = (collapsed)=>{
        setSidebarCollapsedState(collapsed);
        localStorage.setItem('sidebarCollapsed', String(collapsed));
    };
    const toggleSidebar = ()=>{
        setSidebarCollapsed(!sidebarCollapsed);
    };
    const openMobileMenu = ()=>{
        setMobileMenuOpenState(true);
        document.body.style.overflow = 'hidden';
    };
    const closeMobileMenu = ()=>{
        setMobileMenuOpenState(false);
        document.body.style.overflow = '';
    };
    const value = {
        mode,
        setMode,
        toggleMode,
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        mobileMenuOpen,
        setMobileMenuOpen: setMobileMenuOpenState,
        openMobileMenu,
        closeMobileMenu,
        isMobile
    };
    // Always provide context, but show loading state if not mounted
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LayoutContext.Provider, {
        value: value,
        children: mounted ? children : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"
            }, void 0, false, {
                fileName: "[project]/his-web/src/components/providers/LayoutProvider.tsx",
                lineNumber: 101,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/his-web/src/components/providers/LayoutProvider.tsx",
            lineNumber: 100,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/his-web/src/components/providers/LayoutProvider.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
function useLayout() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LayoutContext);
    if (context === null) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/his-web/src/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api,
    "authApi",
    ()=>authApi,
    "default",
    ()=>__TURBOPACK__default__export__,
    "groupApi",
    ()=>groupApi,
    "lookupApi",
    ()=>lookupApi,
    "menuApi",
    ()=>menuApi,
    "patientApi",
    ()=>patientApi,
    "patientImageApi",
    ()=>patientImageApi,
    "permissionApi",
    ()=>permissionApi,
    "roleApi",
    ()=>roleApi,
    "settingsApi",
    ()=>settingsApi,
    "userApi",
    ()=>userApi
]);
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:3333/api/v1") || 'http://localhost:3333/api/v1';
class ApiClient {
    baseUrl;
    authToken = null;
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }
    setToken(token) {
        this.authToken = token;
    }
    getToken() {
        if (this.authToken) {
            return this.authToken;
        }
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return null;
    }
    clearToken() {
        this.authToken = null;
    }
    async request(endpoint, options = {}) {
        const { method = 'GET', body, headers = {}, token } = options;
        const authToken = token || this.getToken();
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...authToken && {
                    Authorization: `Bearer ${authToken}`
                },
                ...headers
            }
        };
        if (body) {
            config.body = JSON.stringify(body);
        }
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, config);
            const data = await response.json();
            if (!response.ok) {
                const error = {
                    message: data.message || 'An error occurred',
                    status: response.status
                };
                if (response.status === 401) {
                    this.clearToken();
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                }
                throw error;
            }
            return data;
        } catch (error) {
            if (error.status) {
                throw error;
            }
            throw {
                message: 'Network error. Please check your connection.',
                status: 0
            };
        }
    }
    get(endpoint, options) {
        return this.request(endpoint, {
            ...options,
            method: 'GET'
        });
    }
    post(endpoint, body, options) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body
        });
    }
    put(endpoint, body, options) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body
        });
    }
    patch(endpoint, body, options) {
        return this.request(endpoint, {
            ...options,
            method: 'PATCH',
            body
        });
    }
    delete(endpoint, options) {
        return this.request(endpoint, {
            ...options,
            method: 'DELETE'
        });
    }
}
const api = new ApiClient(API_BASE_URL);
const authApi = {
    login: (username, password)=>api.post('/auth/login', {
            username,
            password
        }),
    logout: ()=>{
        api.clearToken();
        return api.post('/auth/logout');
    },
    refreshToken: ()=>api.post('/auth/refresh'),
    me: ()=>api.get('/auth/me')
};
const lookupApi = {
    // คำนำหน้าชื่อ
    getPnames: (sex)=>api.get(`/lookups/pnames${sex ? `?sex=${sex}` : ''}`),
    // อาชีพ
    getOccupations: ()=>api.get('/lookups/occupations'),
    // เชื้อชาติ/สัญชาติ
    getNationalities: ()=>api.get('/lookups/nationalities'),
    // ศาสนา
    getReligions: ()=>api.get('/lookups/religions'),
    // สถานะสมรส
    getMarryStatuses: ()=>api.get('/lookups/marry-statuses'),
    // การศึกษา
    getEducations: ()=>api.get('/lookups/educations'),
    // สิทธิการรักษา
    getPttypes: (activeOnly = true)=>api.get(`/lookups/pttypes?active=${activeOnly}`),
    // ความสัมพันธ์
    getRelationTypes: ()=>api.get('/lookups/relation-types'),
    // จังหวัด
    getProvinces: ()=>api.get('/lookups/provinces'),
    // อำเภอ
    getDistricts: (chwpart)=>api.get(`/lookups/districts?chwpart=${chwpart}`),
    // ตำบล
    getSubdistricts: (chwpart, amppart)=>api.get(`/lookups/subdistricts?chwpart=${chwpart}&amppart=${amppart}`),
    // ค้นหาที่อยู่
    searchAddress: (q, limit = 20)=>api.get(`/lookups/search-address?q=${encodeURIComponent(q)}&limit=${limit}`),
    // ประเภทการมา
    getOvstists: ()=>api.get('/lookups/ovstists')
};
// ============================================
// Transform Functions
// ============================================
const transformPatientListItem = (item)=>({
        hn: item.hn,
        fullName: item.full_name,
        cid: item.cid,
        sex: item.sex,
        age: item.age,
        birthday: item.birthday,
        phone: item.phone,
        pttype: item.pttype,
        pttypeName: item.pttype_name,
        bloodgrp: item.bloodgrp,
        hasAllergy: item.has_allergy,
        lastVisit: item.last_visit,
        isDead: item.is_dead
    });
const transformPatientDetail = (data)=>{
    const lookups = data.lookups || {};
    return {
        hn: data.hn,
        pname: data.pname,
        fname: data.fname,
        lname: data.lname,
        midname: data.midname,
        sex: data.sex,
        birthday: data.birthday,
        cid: data.cid,
        mobilePhone: data.mobile_phone_number,
        hometel: data.hometel,
        email: data.email,
        addrpart: data.addrpart,
        moopart: data.moopart,
        road: data.road,
        tmbpart: data.tmbpart,
        amppart: data.amppart,
        chwpart: data.chwpart,
        poCode: data.po_code,
        bloodgrp: data.bloodgrp,
        bloodgroupRh: data.bloodgroup_rh,
        drugallergy: data.drugallergy,
        g6pd: data.g6pd,
        pttype: data.pttype,
        lastVisit: data.last_visit,
        firstday: data.firstday,
        death: data.death,
        deathday: data.deathday,
        fathername: data.fathername,
        mathername: data.mathername,
        spsname: data.spsname,
        marrystatus: data.marrystatus,
        informname: data.informname,
        informtel: data.informtel,
        informrelation: data.informrelation,
        nationality: data.nationality,
        religion: data.religion,
        occupation: data.occupation,
        passportNo: data.passport_no,
        lastUpdate: data.last_update,
        // Computed fields
        fullName: [
            data.pname,
            data.fname,
            data.lname
        ].filter(Boolean).join(' '),
        age: data.age,
        ageText: data.age_text || '',
        fullAddress: data.full_address || '',
        // Joined data from lookups
        pttypeName: lookups.pttype_name,
        tmbName: lookups.tmbpart_name,
        ampName: lookups.amppart_name,
        chwName: lookups.chwpart_name,
        nationalityName: lookups.nationality_name,
        religionName: lookups.religion_name,
        occupationName: lookups.occupation_name,
        // Related data
        allergies: data.drugallergy ? data.drugallergy.split(',').map((s)=>s.trim()).filter(Boolean) : [],
        photo: data.photo
    };
};
const patientApi = {
    // Get patient list with pagination
    getList: async (params = {})=>{
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', String(params.page));
        if (params.limit) queryParams.append('limit', String(params.limit));
        if (params.search) queryParams.append('search', params.search);
        if (params.pttype) queryParams.append('pttype', params.pttype);
        if (params.chwpart) queryParams.append('chwpart', params.chwpart);
        if (params.amppart) queryParams.append('amppart', params.amppart);
        if (params.isActive !== undefined) queryParams.append('is_active', String(params.isActive));
        const response = await api.get(`/patients?${queryParams.toString()}`);
        return {
            data: response.data.map(transformPatientListItem),
            pagination: {
                page: response.meta.current_page,
                limit: response.meta.per_page,
                total: response.meta.total,
                totalPages: response.meta.last_page
            }
        };
    },
    // Get patient detail by HN
    getByHn: async (hn)=>{
        const response = await api.get(`/patients/${hn}`);
        return {
            success: response.success,
            data: transformPatientDetail(response.data)
        };
    },
    // Get patient detail by CID
    getByCid: async (cid)=>{
        const response = await api.get(`/patients/cid/${cid}`);
        return {
            success: response.success,
            data: transformPatientDetail(response.data)
        };
    },
    // Quick search patients
    search: async (q, limit = 10)=>{
        if (!q || q.length < 2) return [];
        const response = await api.get(`/patients/search?q=${encodeURIComponent(q)}&limit=${limit}`);
        return response.data.map((item)=>({
                hn: item.hn,
                fullName: item.full_name,
                cid: item.cid,
                sex: item.sex,
                age: item.age,
                birthday: item.birthday,
                phone: null,
                pttype: item.pttype,
                bloodgrp: null,
                hasAllergy: false,
                lastVisit: null,
                isDead: false
            }));
    },
    // Create new patient
    create: async (data)=>{
        return api.post('/patients', {
            pname: data.pname,
            fname: data.fname,
            lname: data.lname,
            sex: data.sex,
            birthday: data.birthday,
            cid: data.cid,
            mobile_phone_number: data.mobilePhone,
            hometel: data.hometel,
            email: data.email,
            addrpart: data.addrpart,
            moopart: data.moopart,
            road: data.road,
            tmbpart: data.tmbpart,
            amppart: data.amppart,
            chwpart: data.chwpart,
            po_code: data.poCode,
            bloodgrp: data.bloodgrp,
            bloodgroup_rh: data.bloodgroupRh,
            drugallergy: data.drugallergy,
            g6pd: data.g6pd,
            pttype: data.pttype,
            nationality: data.nationality,
            religion: data.religion,
            occupation: data.occupation,
            marrystatus: data.marrystatus,
            fathername: data.fathername,
            mathername: data.mathername,
            spsname: data.spsname,
            informname: data.informname,
            informtel: data.informtel,
            informrelation: data.informrelation
        });
    },
    // Update patient
    update: async (hn, data)=>{
        const payload = {};
        if (data.pname !== undefined) payload.pname = data.pname;
        if (data.fname !== undefined) payload.fname = data.fname;
        if (data.lname !== undefined) payload.lname = data.lname;
        if (data.sex !== undefined) payload.sex = data.sex;
        if (data.birthday !== undefined) payload.birthday = data.birthday;
        if (data.cid !== undefined) payload.cid = data.cid;
        if (data.mobilePhone !== undefined) payload.mobile_phone_number = data.mobilePhone;
        if (data.hometel !== undefined) payload.hometel = data.hometel;
        if (data.email !== undefined) payload.email = data.email;
        if (data.addrpart !== undefined) payload.addrpart = data.addrpart;
        if (data.moopart !== undefined) payload.moopart = data.moopart;
        if (data.road !== undefined) payload.road = data.road;
        if (data.tmbpart !== undefined) payload.tmbpart = data.tmbpart;
        if (data.amppart !== undefined) payload.amppart = data.amppart;
        if (data.chwpart !== undefined) payload.chwpart = data.chwpart;
        if (data.poCode !== undefined) payload.po_code = data.poCode;
        if (data.bloodgrp !== undefined) payload.bloodgrp = data.bloodgrp;
        if (data.bloodgroupRh !== undefined) payload.bloodgroup_rh = data.bloodgroupRh;
        if (data.drugallergy !== undefined) payload.drugallergy = data.drugallergy;
        if (data.g6pd !== undefined) payload.g6pd = data.g6pd;
        if (data.pttype !== undefined) payload.pttype = data.pttype;
        if (data.nationality !== undefined) payload.nationality = data.nationality;
        if (data.religion !== undefined) payload.religion = data.religion;
        if (data.occupation !== undefined) payload.occupation = data.occupation;
        if (data.marrystatus !== undefined) payload.marrystatus = data.marrystatus;
        if (data.fathername !== undefined) payload.fathername = data.fathername;
        if (data.mathername !== undefined) payload.mathername = data.mathername;
        if (data.spsname !== undefined) payload.spsname = data.spsname;
        if (data.informname !== undefined) payload.informname = data.informname;
        if (data.informtel !== undefined) payload.informtel = data.informtel;
        if (data.informrelation !== undefined) payload.informrelation = data.informrelation;
        return api.put(`/patients/${hn}`, payload);
    },
    // Delete patient
    delete: async (hn)=>{
        return api.delete(`/patients/${hn}`);
    },
    // Get patient statistics
    getStats: async ()=>{
        const response = await api.get('/patients/stats');
        return response.data;
    }
};
const patientImageApi = {
    // Get all images for a patient
    getByHn: async (hn)=>{
        const response = await api.get(`/patients/${hn}/images`);
        return response.data.map((item)=>({
                hn: item.hn,
                imageName: item.image_name,
                width: item.width,
                height: item.height,
                captureDate: item.capture_date
            }));
    },
    // Get profile image (primary image)
    getProfileImage: async (hn)=>{
        try {
            const response = await api.get(`/patients/${hn}/image`);
            return {
                hn: response.data.hn,
                imageName: response.data.image_name,
                image: response.data.image,
                width: response.data.width,
                height: response.data.height,
                captureDate: response.data.capture_date
            };
        } catch  {
            return null;
        }
    },
    // Get raw image URL for img src
    getProfileImageUrl: (hn)=>{
        const baseUrl = ("TURBOPACK compile-time value", "http://localhost:3333/api/v1") || 'http://localhost:3333/api/v1';
        return `${baseUrl}/patients/${hn}/image/raw`;
    },
    // Upload profile image
    upload: async (hn, imageData, width, height)=>{
        const response = await api.post(`/patients/${hn}/image`, {
            image: imageData,
            width,
            height
        });
        return response;
    },
    // Delete profile image
    delete: async (hn)=>{
        await api.delete(`/patients/${hn}/image`);
    }
};
// ============================================
// Helper: Transform menu from API response (camelCase) to snake_case
// ============================================
const transformMenuFromApi = (menu)=>({
        id: menu.id,
        menu_code: menu.menuCode || menu.menu_code,
        menu_name: menu.menuName || menu.menu_name,
        menu_name_th: menu.menuNameTh || menu.menu_name_th,
        parent_id: menu.parentId ?? menu.parent_id ?? null,
        icon: menu.icon || null,
        route_path: menu.routePath || menu.route_path,
        sort_order: menu.sortOrder ?? menu.sort_order ?? 0,
        is_active: Boolean(menu.isActive ?? menu.is_active)
    });
const menuApi = {
    // =========================================
    // Public Menu Operations
    // =========================================
    // Get all menus (with transform from camelCase to snake_case)
    getAll: async ()=>{
        const response = await api.get('/settings/menus');
        return {
            ...response,
            data: response.data.map(transformMenuFromApi)
        };
    },
    // Get active menus only
    getActive: async ()=>{
        const response = await api.get('/settings/menus/active');
        return {
            ...response,
            data: response.data.map(transformMenuFromApi)
        };
    },
    // Get menu tree (active only)
    getTree: async ()=>{
        const response = await api.get('/settings/menus/tree');
        return {
            ...response,
            data: response.data.map(transformMenuFromApi)
        };
    },
    // Get full menu tree (including inactive)
    getFullTree: async ()=>{
        const response = await api.get('/settings/menus/tree/full');
        return {
            ...response,
            data: response.data.map(transformMenuFromApi)
        };
    },
    // Get menu by ID
    getById: async (id)=>{
        const response = await api.get(`/settings/menus/${id}`);
        return {
            ...response,
            data: transformMenuFromApi(response.data)
        };
    },
    // Get menu by code
    getByCode: async (code)=>{
        const response = await api.get(`/settings/menus/code/${code}`);
        return {
            ...response,
            data: transformMenuFromApi(response.data)
        };
    },
    // Get menus by parent ID (use null for root)
    getByParentId: async (parentId)=>{
        const response = await api.get(`/settings/menus/parent/${parentId === null ? 'null' : parentId}`);
        return {
            ...response,
            data: response.data.map(transformMenuFromApi)
        };
    },
    // =========================================
    // CRUD Operations
    // =========================================
    // Create menu
    create: (data)=>api.post('/settings/menus', data),
    // Update menu
    update: (id, data)=>api.put(`/settings/menus/${id}`, data),
    // Delete menu
    delete: (id)=>api.delete(`/settings/menus/${id}`),
    // =========================================
    // Bulk Operations
    // =========================================
    // Reorder menus
    reorder: (items)=>api.post('/settings/menus/reorder', {
            items
        }),
    // Move menu to new parent
    move: (id, parentId)=>api.put(`/settings/menus/${id}/move`, {
            parent_id: parentId
        }),
    // =========================================
    // User Menu Access (by user ID)
    // =========================================
    // Get user menu access
    getUserAccess: (userId)=>api.get(`/settings/menus/user/${userId}/access`),
    // Get user menu tree
    getUserTree: (userId)=>api.get(`/settings/menus/user/${userId}/tree`),
    // Check user menu access
    checkUserAccess: (userId, menuCode)=>api.get(`/settings/menus/user/${userId}/check/${menuCode}`),
    // =========================================
    // Current User Menu Access (my)
    // =========================================
    // Get my menu access (current logged in user)
    getMyAccess: ()=>api.get('/settings/menus/my/access'),
    // Get my menu tree (current logged in user)
    getMyTree: ()=>api.get('/settings/menus/my/tree'),
    // Check my menu access (current logged in user)
    checkMyAccess: (menuCode)=>api.get(`/settings/menus/my/check/${menuCode}`),
    // =========================================
    // Alias for backward compatibility
    // =========================================
    getUserMenus: ()=>api.get('/settings/menus/my/tree')
};
const roleApi = {
    // Get all roles
    getAll: ()=>api.get('/roles'),
    // Get role by ID
    getById: (id)=>api.get(`/roles/${id}`),
    // Create role
    create: (data)=>api.post('/roles', data),
    // Update role
    update: (id, data)=>api.put(`/roles/${id}`, data),
    // Delete role
    delete: (id)=>api.delete(`/roles/${id}`),
    // Get role menu access
    getMenuAccess: (roleId)=>api.get(`/roles/${roleId}/menus`),
    // Update role menu access
    updateMenuAccess: (roleId, menuAccess)=>api.put(`/roles/${roleId}/menus`, {
            menuAccess
        })
};
const groupApi = {
    // Get all groups
    getAll: ()=>api.get('/groups'),
    // Get group by ID
    getById: (id)=>api.get(`/groups/${id}`),
    // Create group
    create: (data)=>api.post('/groups', data),
    // Update group
    update: (id, data)=>api.put(`/groups/${id}`, data),
    // Delete group
    delete: (id)=>api.delete(`/groups/${id}`),
    // Get group roles
    getRoles: (groupId)=>api.get(`/groups/${groupId}/roles`),
    // Assign roles to group
    assignRoles: (groupId, roleIds)=>api.put(`/groups/${groupId}/roles`, {
            roleIds
        })
};
const permissionApi = {
    // Get all permissions
    getAll: ()=>api.get('/permissions'),
    // Get permission by ID
    getById: (id)=>api.get(`/permissions/${id}`),
    // Create permission
    create: (data)=>api.post('/permissions', data),
    // Update permission
    update: (id, data)=>api.put(`/permissions/${id}`, data),
    // Delete permission
    delete: (id)=>api.delete(`/permissions/${id}`)
};
const userApi = {
    // Get all users
    getAll: (params)=>{
        const query = new URLSearchParams();
        if (params?.page) query.set('page', String(params.page));
        if (params?.limit) query.set('limit', String(params.limit));
        if (params?.search) query.set('search', params.search);
        const queryString = query.toString();
        return api.get(`/users${queryString ? `?${queryString}` : ''}`);
    },
    // Get user by ID
    getById: (id)=>api.get(`/users/${id}`),
    // Create user
    create: (data)=>api.post('/users', data),
    // Update user
    update: (id, data)=>api.put(`/users/${id}`, data),
    // Delete user
    delete: (id)=>api.delete(`/users/${id}`),
    // Get user roles
    getRoles: (userId)=>api.get(`/users/${userId}/roles`),
    // Assign roles to user
    assignRoles: (userId, roleIds)=>api.put(`/users/${userId}/roles`, {
            roleIds
        }),
    // Get user groups
    getGroups: (userId)=>api.get(`/users/${userId}/groups`),
    // Assign groups to user
    assignGroups: (userId, groupIds)=>api.put(`/users/${userId}/groups`, {
            groupIds
        })
};
const settingsApi = {
    // =========================================
    // Roles
    // =========================================
    roles: {
        getAll: ()=>api.get('/settings/roles'),
        getActive: ()=>api.get('/settings/roles/active'),
        getById: (id)=>api.get(`/settings/roles/${id}`),
        getWithDetails: (id)=>api.get(`/settings/roles/${id}/details`),
        getMenuAccess: (id)=>api.get(`/settings/roles/${id}/menus`),
        getPermissions: (id)=>api.get(`/settings/roles/${id}/permissions`),
        create: (data)=>api.post('/settings/roles', data),
        update: (id, data)=>api.put(`/settings/roles/${id}`, data),
        delete: (id)=>api.delete(`/settings/roles/${id}`),
        setMenuAccess: (roleId, menuId, access)=>api.post(`/settings/roles/${roleId}/menus/${menuId}`, access),
        removeMenuAccess: (roleId, menuId)=>api.delete(`/settings/roles/${roleId}/menus/${menuId}`),
        addPermission: (roleId, permissionId)=>api.post(`/settings/roles/${roleId}/permissions/${permissionId}`),
        removePermission: (roleId, permissionId)=>api.delete(`/settings/roles/${roleId}/permissions/${permissionId}`)
    },
    // =========================================
    // Groups
    // =========================================
    groups: {
        getAll: ()=>api.get('/settings/groups'),
        getActive: ()=>api.get('/settings/groups/active'),
        getTree: ()=>api.get('/settings/groups/tree'),
        getById: (id)=>api.get(`/settings/groups/${id}`),
        getWithRoles: (id)=>api.get(`/settings/groups/${id}/roles`),
        create: (data)=>api.post('/settings/groups', data),
        update: (id, data)=>api.put(`/settings/groups/${id}`, data),
        delete: (id)=>api.delete(`/settings/groups/${id}`),
        addRole: (groupId, roleId)=>api.post(`/settings/groups/${groupId}/roles/${roleId}`),
        removeRole: (groupId, roleId)=>api.delete(`/settings/groups/${groupId}/roles/${roleId}`)
    },
    // =========================================
    // Menu Items (use menuApi for full functionality)
    // =========================================
    menus: {
        // Basic CRUD - for full menu operations, use menuApi instead
        getAll: ()=>menuApi.getAll(),
        getTree: ()=>menuApi.getTree(),
        getById: (id)=>menuApi.getById(id),
        create: (data)=>menuApi.create(data),
        update: (id, data)=>menuApi.update(id, data),
        delete: (id)=>menuApi.delete(id)
    },
    // =========================================
    // Permissions
    // =========================================
    permissions: {
        getAll: ()=>api.get('/settings/permissions'),
        getById: (id)=>api.get(`/settings/permissions/${id}`),
        create: (data)=>api.post('/settings/permissions', data),
        update: (id, data)=>api.put(`/settings/permissions/${id}`, data),
        delete: (id)=>api.delete(`/settings/permissions/${id}`)
    },
    // =========================================
    // User Settings
    // =========================================
    users: {
        getGroups: (userId)=>api.get(`/settings/users/${userId}/groups`),
        getRoles: (userId)=>api.get(`/settings/users/${userId}/roles`),
        getEffectiveRoles: (userId)=>api.get(`/settings/users/${userId}/effective-roles`),
        getMenuAccess: (userId)=>api.get(`/settings/users/${userId}/menu-access`),
        getPermissions: (userId)=>api.get(`/settings/users/${userId}/permissions`),
        checkMenuAccess: (userId, menuCode)=>api.get(`/settings/users/${userId}/check-menu/${menuCode}`),
        checkPermission: (userId, permissionCode)=>api.get(`/settings/users/${userId}/check-permission/${permissionCode}`),
        addGroup: (userId, groupId, isPrimary)=>api.post(`/settings/users/${userId}/groups/${groupId}`, {
                is_primary: isPrimary
            }),
        removeGroup: (userId, groupId)=>api.delete(`/settings/users/${userId}/groups/${groupId}`),
        setPrimaryGroup: (userId, groupId)=>api.put(`/settings/users/${userId}/groups/${groupId}/primary`),
        addRole: (userId, roleId)=>api.post(`/settings/users/${userId}/roles/${roleId}`),
        removeRole: (userId, roleId)=>api.delete(`/settings/users/${userId}/roles/${roleId}`)
    },
    // =========================================
    // Current User Access (my)
    // =========================================
    my: {
        getEffectiveRoles: ()=>api.get('/settings/my/effective-roles'),
        getMenuAccess: ()=>api.get('/settings/my/menu-access'),
        getPermissions: ()=>api.get('/settings/my/permissions'),
        checkMenuAccess: (menuCode)=>api.get(`/settings/my/check-menu/${menuCode}`),
        checkPermission: (permissionCode)=>api.get(`/settings/my/check-permission/${permissionCode}`)
    }
};
const __TURBOPACK__default__export__ = api;
}),
"[project]/his-web/src/components/providers/AuthProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/lib/api.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Check for existing session
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            // Sync token with API client
            __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].setToken(storedToken);
        }
        setIsLoading(false);
    }, []);
    const login = async (username, password)=>{
        setIsLoading(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"].login(username, password);
            if (response.success) {
                const { token: newToken, user: userData } = response.data;
                // Set token in API client first
                __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].setToken(newToken);
                setToken(newToken);
                setUser(userData);
                localStorage.setItem('token', newToken);
                localStorage.setItem('user', JSON.stringify(userData));
                router.push('/');
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            const err = error;
            throw new Error(err.message || 'Login failed');
        } finally{
            setIsLoading(false);
        }
    };
    const logout = ()=>{
        // Clear token from API client
        __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].clearToken();
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };
    const value = {
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/his-web/src/components/providers/AuthProvider.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
}),
"[project]/his-web/src/components/providers/MenuProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MenuProvider",
    ()=>MenuProvider,
    "useMenuBadgeUpdater",
    ()=>useMenuBadgeUpdater,
    "useMenuContext",
    ()=>useMenuContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$components$2f$providers$2f$AuthProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/his-web/src/components/providers/AuthProvider.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
// Convert API response (camelCase) to frontend format (snake_case)
const convertApiMenuItem = (item)=>({
        id: item.menuId,
        menu_code: item.menuCode,
        menu_name: item.menuName,
        menu_name_th: item.menuNameTh,
        parent_id: item.parentId,
        icon: item.icon,
        route_path: item.routePath,
        sort_order: item.sortOrder,
        is_active: item.isActive ?? true,
        can_view: item.canView === 1,
        can_create: item.canCreate === 1,
        can_edit: item.canEdit === 1,
        can_delete: item.canDelete === 1,
        can_export: item.canExport === 1,
        can_print: item.canPrint === 1,
        children: item.children?.map(convertApiMenuItem) ?? []
    });
const MenuContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
// Convert MenuItem to MenuAccessItem with default permissions
const toMenuAccessItem = (item)=>({
        ...item,
        // Access permissions
        can_view: item.can_view ?? true,
        can_create: item.can_create ?? false,
        can_edit: item.can_edit ?? false,
        can_delete: item.can_delete ?? false,
        can_export: item.can_export ?? false,
        can_print: item.can_print ?? false,
        // HIS properties (preserve if exists, otherwise undefined)
        badge_count: item.badge_count,
        badge_type: item.badge_type,
        is_new: item.is_new,
        has_notification: item.has_notification,
        notification_type: item.notification_type,
        shortcut_key: item.shortcut_key,
        children: item.children?.map(toMenuAccessItem) ?? []
    });
// Build tree structure from flat menu list
const buildMenuTree = (items)=>{
    const menuMap = new Map();
    // First pass: create all menu items with empty children arrays
    items.forEach((item)=>{
        menuMap.set(item.id, {
            ...item,
            children: []
        });
    });
    // Second pass: build the tree
    const rootMenus = [];
    items.forEach((item)=>{
        const menuItem = menuMap.get(item.id);
        if (item.parent_id === null || item.parent_id === undefined) {
            rootMenus.push(menuItem);
        } else {
            const parent = menuMap.get(item.parent_id);
            if (parent) {
                if (!parent.children) {
                    parent.children = [];
                }
                parent.children.push(menuItem);
            } else {
                rootMenus.push(menuItem);
            }
        }
    });
    // Sort menus by sort_order
    const sortMenus = (menus)=>{
        return menus.sort((a, b)=>(a.sort_order || 0) - (b.sort_order || 0)).map((menu)=>({
                ...menu,
                children: menu.children ? sortMenus(menu.children) : []
            }));
    };
    return sortMenus(rootMenus);
};
// Flatten tree to list
const flattenTree = (items)=>{
    const result = [];
    const traverse = (menuItems)=>{
        for (const item of menuItems){
            result.push(item);
            if (item.children && item.children.length > 0) {
                traverse(item.children);
            }
        }
    };
    traverse(items);
    return result;
};
// Helper to update badge in menu tree
const updateBadgeInTree = (menus, menuCode, config)=>{
    return menus.map((menu)=>{
        if (menu.menu_code === menuCode) {
            return {
                ...menu,
                badge_count: config.count ?? menu.badge_count,
                badge_type: config.type ?? menu.badge_type,
                has_notification: config.has_notification ?? menu.has_notification,
                notification_type: config.notification_type ?? menu.notification_type
            };
        }
        if (menu.children && menu.children.length > 0) {
            return {
                ...menu,
                children: updateBadgeInTree(menu.children, menuCode, config)
            };
        }
        return menu;
    });
};
// Helper to clear badge in menu tree
const clearBadgeInTree = (menus, menuCode)=>{
    return menus.map((menu)=>{
        if (menu.menu_code === menuCode) {
            return {
                ...menu,
                badge_count: undefined,
                badge_type: undefined,
                has_notification: false,
                notification_type: undefined
            };
        }
        if (menu.children && menu.children.length > 0) {
            return {
                ...menu,
                children: clearBadgeInTree(menu.children, menuCode)
            };
        }
        return menu;
    });
};
// Helper to clear all badges
const clearAllBadgesInTree = (menus)=>{
    return menus.map((menu)=>({
            ...menu,
            badge_count: undefined,
            badge_type: undefined,
            has_notification: false,
            notification_type: undefined,
            children: menu.children ? clearAllBadgesInTree(menu.children) : []
        }));
};
function MenuProvider({ children }) {
    const { isAuthenticated, token } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$components$2f$providers$2f$AuthProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [menus, setMenus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [flatMenus, setFlatMenus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchMenus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!isAuthenticated || !token) {
            setMenus([]);
            setFlatMenus([]);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            // Try to get user's menu tree first
            let rawData = [];
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["menuApi"].getMyTree();
                if (response.success && response.data) {
                    // API returns camelCase, need to cast
                    rawData = response.data;
                }
            } catch  {
                // Fallback to all menus if my/tree fails
                console.warn('Failed to get user menu tree, falling back to all menus');
                const fallbackResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["menuApi"].getAll();
                if (fallbackResponse.success && fallbackResponse.data) {
                    rawData = fallbackResponse.data;
                }
            }
            if (rawData.length > 0) {
                // Convert API response (camelCase) to frontend format (snake_case)
                const data = rawData.map(convertApiMenuItem);
                // Convert to MenuAccessItem with default permissions
                const accessItems = data.map(toMenuAccessItem);
                // Debug log
                console.log('Raw API data:', rawData);
                console.log('Converted menu data:', data);
                console.log('Menu count:', data.length);
                // Check if data already has nested children (is a tree)
                const isAlreadyTree = accessItems.some((item)=>item.children && Array.isArray(item.children) && item.children.length > 0);
                if (isAlreadyTree) {
                    console.log('Data is already a tree');
                    setMenus(accessItems);
                    setFlatMenus(flattenTree(accessItems));
                } else {
                    console.log('Building tree from flat data');
                    const menuTree = buildMenuTree(accessItems);
                    console.log('Built menu tree:', menuTree);
                    setMenus(menuTree);
                    setFlatMenus(accessItems);
                }
            } else {
                setMenus([]);
                setFlatMenus([]);
            }
        } catch (err) {
            const error = err;
            console.error('Menu fetch error:', error);
            setError(error.message || 'Failed to fetch menus');
            setMenus([]);
            setFlatMenus([]);
        } finally{
            setIsLoading(false);
        }
    }, [
        isAuthenticated,
        token
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchMenus();
    }, [
        fetchMenus
    ]);
    const getMenuByCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((code)=>{
        return flatMenus.find((menu)=>menu.menu_code === code);
    }, [
        flatMenus
    ]);
    const getMenuByPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((path)=>{
        return flatMenus.find((menu)=>menu.route_path === path);
    }, [
        flatMenus
    ]);
    const hasAccess = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((menuCode, action = 'view')=>{
        const menu = getMenuByCode(menuCode);
        if (!menu) return false;
        switch(action){
            case 'view':
                return menu.can_view ?? true;
            case 'create':
                return menu.can_create ?? false;
            case 'edit':
                return menu.can_edit ?? false;
            case 'delete':
                return menu.can_delete ?? false;
            case 'export':
                return menu.can_export ?? false;
            case 'print':
                return menu.can_print ?? false;
            default:
                return false;
        }
    }, [
        getMenuByCode
    ]);
    const checkAccess = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (menuCode)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["menuApi"].checkMyAccess(menuCode);
            if (response.success) {
                return response.data;
            }
            return null;
        } catch  {
            return null;
        }
    }, []);
    // Update single menu badge
    const updateMenuBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((menuCode, config)=>{
        setMenus((prev)=>updateBadgeInTree(prev, menuCode, config));
        setFlatMenus((prev)=>prev.map((menu)=>menu.menu_code === menuCode ? {
                    ...menu,
                    badge_count: config.count ?? menu.badge_count,
                    badge_type: config.type ?? menu.badge_type,
                    has_notification: config.has_notification ?? menu.has_notification,
                    notification_type: config.notification_type ?? menu.notification_type
                } : menu));
    }, []);
    // Update multiple menu badges at once
    const updateMenuBadges = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((configs)=>{
        setMenus((prev)=>{
            let updated = prev;
            for (const config of configs){
                updated = updateBadgeInTree(updated, config.menu_code, config);
            }
            return updated;
        });
        setFlatMenus((prev)=>prev.map((menu)=>{
                const config = configs.find((c)=>c.menu_code === menu.menu_code);
                if (config) {
                    return {
                        ...menu,
                        badge_count: config.count ?? menu.badge_count,
                        badge_type: config.type ?? menu.badge_type,
                        has_notification: config.has_notification ?? menu.has_notification,
                        notification_type: config.notification_type ?? menu.notification_type
                    };
                }
                return menu;
            }));
    }, []);
    // Clear single menu badge
    const clearMenuBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((menuCode)=>{
        setMenus((prev)=>clearBadgeInTree(prev, menuCode));
        setFlatMenus((prev)=>prev.map((menu)=>menu.menu_code === menuCode ? {
                    ...menu,
                    badge_count: undefined,
                    badge_type: undefined,
                    has_notification: false,
                    notification_type: undefined
                } : menu));
    }, []);
    // Clear all badges
    const clearAllBadges = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setMenus((prev)=>clearAllBadgesInTree(prev));
        setFlatMenus((prev)=>prev.map((menu)=>({
                    ...menu,
                    badge_count: undefined,
                    badge_type: undefined,
                    has_notification: false,
                    notification_type: undefined
                })));
    }, []);
    const value = {
        menus,
        flatMenus,
        isLoading,
        error,
        refetch: fetchMenus,
        getMenuByCode,
        getMenuByPath,
        hasAccess,
        checkAccess,
        updateMenuBadge,
        updateMenuBadges,
        clearMenuBadge,
        clearAllBadges
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/his-web/src/components/providers/MenuProvider.tsx",
        lineNumber: 476,
        columnNumber: 10
    }, this);
}
function useMenuContext() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(MenuContext);
    if (context === null) {
        throw new Error('useMenuContext must be used within a MenuProvider');
    }
    return context;
}
function useMenuBadgeUpdater() {
    const { updateMenuBadge, updateMenuBadges, clearMenuBadge, clearAllBadges } = useMenuContext();
    // ตัวอย่างการอัปเดต badge สำหรับ OPD queue
    const updateOPDQueue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((count)=>{
        updateMenuBadge('OPD', {
            count,
            type: count > 20 ? 'danger' : count > 10 ? 'warning' : 'default',
            has_notification: count > 0
        });
    }, [
        updateMenuBadge
    ]);
    // ตัวอย่างการอัปเดต badge สำหรับ IPD
    const updateIPDPatients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((count)=>{
        updateMenuBadge('IPD', {
            count,
            type: 'default'
        });
    }, [
        updateMenuBadge
    ]);
    // ตัวอย่างการแจ้งเตือน ER ด่วน
    const setERAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((hasAlert)=>{
        updateMenuBadge('ER', {
            has_notification: hasAlert,
            notification_type: 'danger'
        });
    }, [
        updateMenuBadge
    ]);
    // ตัวอย่างการอัปเดตหลายเมนูพร้อมกัน
    const updateAllCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$his$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((data)=>{
        const configs = [];
        if (data.opd !== undefined) {
            configs.push({
                menu_code: 'OPD',
                count: data.opd,
                type: data.opd > 20 ? 'danger' : data.opd > 10 ? 'warning' : 'default',
                has_notification: data.opd > 0
            });
        }
        if (data.ipd !== undefined) {
            configs.push({
                menu_code: 'IPD',
                count: data.ipd,
                type: 'default'
            });
        }
        if (data.pharmacy !== undefined) {
            configs.push({
                menu_code: 'PHARMACY',
                count: data.pharmacy,
                type: data.pharmacy > 30 ? 'warning' : 'default'
            });
        }
        if (data.er !== undefined) {
            configs.push({
                menu_code: 'ER',
                has_notification: data.er,
                notification_type: 'danger'
            });
        }
        if (configs.length > 0) {
            updateMenuBadges(configs);
        }
    }, [
        updateMenuBadges
    ]);
    return {
        updateMenuBadge,
        updateMenuBadges,
        clearMenuBadge,
        clearAllBadges,
        // HIS-specific helpers
        updateOPDQueue,
        updateIPDPatients,
        setERAlert,
        updateAllCounts
    };
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d173c3d0._.js.map