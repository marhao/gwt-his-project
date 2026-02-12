"use client"

import { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import { nhsoApi } from '@/lib/api/index';
import { NhsoLoginModal, NhsoRightsModal } from '@/components/nhso';
import type { NhsoPersonalFund } from '@/lib/api/types/nhso';
import { NHSO_TO_PTTYPE_MAPPING } from '@/lib/constants/nhso';

type NHSOButonProps = {
    cid: string | null;
    patientName: string;
    onClick?: () => void;
    onSuccess: (mapping: string, right: any) => void;
}
const NHSOButon = ({ cid, patientName, onClick, onSuccess }: NHSOButonProps) => {
    const [canCheckNhso, setCanCheckNhso] = useState(false)
    // NHSO states
    const [showNhsoLoginModal, setShowNhsoLoginModal] = useState(false);
    const [showNhsoRightsModal, setShowNhsoRightsModal] = useState(false);
    const [nhsoLoading, setNhsoLoading] = useState(false);
    const [nhsoError, setNhsoError] = useState<string | null>(null);
    const [nhsoRights, setNhsoRights] = useState<NhsoPersonalFund | null>(null);

    useEffect(() => {
        if (cid) {
            setCanCheckNhso(true)
        }
    }, [cid]);

    // ==========================================
    // NHSO Functions
    // ==========================================
    /**
     * Get clean CID (remove dashes)
     */
    const getCleanCid = (cid: string): string => {
        return cid.replace(/-/g, '');
    };

    /**
     * Check if NHSO button should be enabled
     */
    // const canCheckNhso = (): boolean => {
    //     const cleanCid = getCleanCid();
    //     return cleanCid.length === 13 && !!patient;
    // };

    /**
     * Handle NHSO button click
     */
    const handleNHSO = async () => {
        const cleanCid = getCleanCid(cid!);

        if (!cleanCid || cleanCid.length !== 13) {
            return;
        }
    
        // Check if we have a valid token
        const tokenStatus = await nhsoApi.getTokenStatus();
        
        if (!tokenStatus.success || tokenStatus.data?.needsRelogin) {
            // No token or expired - show login modal
            setShowNhsoLoginModal(true);
        } else {
            // Have valid token - search directly
            await searchNhsoRights(cleanCid);
        }
    };

    /**
     * Handle successful NHSO login
     */
    const handleNhsoLoginSuccess = async (username: string) => {
        const cleanCid = getCleanCid(cid!);
        if (cleanCid) {
            await searchNhsoRights(cleanCid);
        }
    };

    /**
     * Search NHSO rights by CID
     */
    const searchNhsoRights = async (cid: string) => {
        setShowNhsoRightsModal(true);
        setNhsoLoading(true);
        setNhsoError(null);
        setNhsoRights(null);

        try {
            const result = await nhsoApi.searchByPid(cid);

            if (result.success && result.data) {
                setNhsoRights(result.data);
            } else {
                setNhsoError(result.message || 'ไม่สามารถตรวจสอบสิทธิ์ได้');
            }
        } catch (err) {
            setNhsoError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการตรวจสอบ');
        } finally {
            setNhsoLoading(false);
        }
    };

    /**
     * Retry NHSO search
     */
    const handleNhsoRetry = () => {
        const cleanCid = getCleanCid(cid!);
        if (cleanCid) {
            searchNhsoRights(cleanCid);
        }
    };

    /**
     * Apply NHSO rights to form
     */
    const handleApplyNhsoRights = (rights: NhsoPersonalFund) => {
        // Map NHSO rights to pttype if possible
        const mappedPttype = rights.mainInscl && Object.entries(NHSO_TO_PTTYPE_MAPPING).find(pt => pt[0] === rights.mainInscl?.rightId);
        if (mappedPttype) {
            onSuccess(mappedPttype[1], nhsoRights);
        }

        // Close modal
        setShowNhsoRightsModal(false);
    };

    return (
        <>
            <button
                type="button"
                onClick={handleNHSO}
                disabled={!canCheckNhso}
                className={`
                    px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap
                    transition-all duration-200 flex items-center gap-2
                    ${canCheckNhso
                        ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 cursor-pointer'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    }
                `}
                title={!canCheckNhso ? 'กรุณาเลือกผู้ป่วยที่มีเลขบัตรประชาชนก่อน' : 'ตรวจสอบสิทธิ์ สปสช.'}
            >
                <Shield size={16} />
                NHSO
            </button>

            {/* ============================================ */}
            {/* NHSO Modals */}
            {/* ============================================ */}
            {/* Login Modal */}
            <NhsoLoginModal
                isOpen={showNhsoLoginModal}
                onClose={() => setShowNhsoLoginModal(false)}
                onSuccess={handleNhsoLoginSuccess}
            />

            {/* Rights Result Modal */}
            <NhsoRightsModal
                isOpen={showNhsoRightsModal}
                onClose={() => setShowNhsoRightsModal(false)}
                isLoading={nhsoLoading}
                error={nhsoError}
                rights={nhsoRights}
                patientName={patientName}
                patientCid={cid!}
                onRetry={handleNhsoRetry}
                onApplyRights={handleApplyNhsoRights}
            />
        </>
    )
}

export default NHSOButon