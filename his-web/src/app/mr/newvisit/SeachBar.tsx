"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QrCode } from 'lucide-react';
import { SearchablePatientSelect } from '@/components/ui';
import { SmartCardButton } from '@/components/ui/SmartCardButton';
import { PatientListItem } from '@/types/patient';
import { SmartCardData } from '@/hooks/useSmartCardReader';
import { patientApi, patientImageApi } from '@/lib/api';

// TODO: Duplicated in OpdNewVisitResponsive page
interface Patient {
    hn: string;
    name: string;
    age: string;
    gender: string;
    birthDate: string;
    address: string;
    cid: string;
    phone: string;
    photo: string | null;
    bloodType?: string;
    allergies?: string[];
    lastVisit?: string;
    pttype?: string;
    pttypeName?: string;
}

type SearchBarProps = {
    pttypeOptions: any[];
    reset: boolean;
    onSuccess: (patient: Patient) => void;
}

const SeachBar = ({ pttypeOptions, reset, onSuccess }: SearchBarProps) => {
    const router = useRouter();
    const [searchHn, setSearchHn] = useState('')
    const [selectedPatientItem, setSelectedPatientItem] = useState<PatientListItem | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    /** Patient data */
    const [patient, setPatient] = useState<Patient | null>(null);

    /** Smart Card photo (fallback when no photo in DB) */
    const [smartCardPhoto, setSmartCardPhoto] = useState<string | null>(null);

    /** Clear searchbar's states */
    useEffect(() => {
        if (reset) {
            setSearchHn('');
            setSelectedPatientItem(null);
            setSmartCardPhoto(null);
        }
    }, [reset])

    /** Handle patient selection from search */
    const handlePatientSelect = async (
        hn: string, 
        patientItem: PatientListItem | null,
        cardPhoto?: string | null
    ) => {
        setSearchHn(hn);
        setSelectedPatientItem(patientItem);

        // Store smart card photo for fallback
        if (cardPhoto) {
            setSmartCardPhoto(cardPhoto);
        }

        if (!hn || !patientItem) {
            setPatient(null);
            return;
        }

        setIsLoading(true);

        try {
            // Fetch full patient details and image in parallel
            const [detailResponse, imageData] = await Promise.all([
                patientApi.getByHn(hn),
                patientImageApi.getProfileImage(hn).catch(() => null),
            ]);

            if (detailResponse.success && detailResponse.data) {
                const detail = detailResponse.data;

                // Build photo URL or base64 data
                // Priority: DB image > Smart Card image > null
                let photoUrl: string | null = null;
                if (imageData?.image) {
                    // Image from database (base64 encoded)
                    photoUrl = imageData.image.startsWith('data:')
                        ? imageData.image
                        : `data:image/jpeg;base64,${imageData.image}`;
                } else if (cardPhoto) {
                    // Fallback to Smart Card photo
                    photoUrl = cardPhoto.startsWith('data:')
                        ? cardPhoto
                        : `data:image/jpeg;base64,${cardPhoto}`;
                }

                // Update form with patient's pttype
                const patientPttype = pttypeOptions.find(p => p.value === detail.pttype);
                const _pttypeName = patientPttype?.label.split(' - ')[1] || detail.pttypeName || '-';

                onSuccess({
                    hn: detail.hn,
                    name: detail.fullName,
                    gender: String(detail.sex) === '1' ? 'ชาย' : String(detail.sex) === '2' ? 'หญิง' : '-',
                    age: detail.ageText || `${detail.age || 0} ปี`,
                    birthDate: detail.birthday || '',
                    address: detail.fullAddress || '',
                    cid: detail.cid ? detail.cid.replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, '$1-$2-$3-$4-$5') : '',
                    phone: detail.mobilePhone || detail.hometel || '',
                    photo: photoUrl,
                    bloodType: detail.bloodgrp ? `${detail.bloodgrp}${detail.bloodgroupRh || ''}` : undefined,
                    allergies: detail.allergies || [],
                    lastVisit: detail.lastVisit || undefined,
                    pttype: detail.pttype || '',
                    pttypeName: _pttypeName,
                });
            }
        } catch (error) {
            console.error('Error fetching patient details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewPatientFromCard = (cardData: SmartCardData) => {
        router.push(`/patients/register?cid=${cardData.cid}`);
    };

    return (
        <div className="flex items-center gap-2">
            {/* Patient Search - Full width on mobile */}
            <div className="flex-1 min-w-0">
                <SearchablePatientSelect
                    value={searchHn}
                    onChange={handlePatientSelect}
                    placeholder="ค้นหา HN, ชื่อ, เลขบัตร..."
                    disabled={isLoading}
                    initialPatient={selectedPatientItem}
                    limit={20}
                    className="w-full"
                />
            </div>

            {/* Action Buttons - Compact on mobile */}
            <div className="flex items-center gap-1.5 shrink-0">
                {/* QR Code Button */}
                <button
                    className="
                        size-11 rounded-xl flex items-center justify-center
                        bg-slate-100 dark:bg-slate-800 
                        text-slate-600 dark:text-slate-400 
                        hover:bg-slate-200 dark:hover:bg-slate-700 
                        active:scale-95 transition-all
                    "
                    title="สแกน QR Code"
                >
                    <QrCode size={20} />
                </button>

                {/* Smart Card Button */}
                <SmartCardButton
                    onPatientFound={handlePatientSelect}
                    onNewPatient={handleNewPatientFromCard}
                    onError={(err) => console.error(err)}
                    disabled={isLoading}
                    serverUrl={process.env.NEXT_PUBLIC_WS_URL}
                    className="size-11"
                />
            </div>
        </div>
    )
}

export default SeachBar