// src/components/ui/SmartCardButton.tsx

'use client';

import { useState, useEffect } from 'react';
import { CreditCard, Wifi, WifiOff, Loader2, Check, AlertCircle, X } from 'lucide-react';
import { useSmartCardReader, SmartCardData } from '@/hooks/useSmartCardReader';
import { patientApi } from '@/lib/api';
import { PatientListItem } from '@/types/patient.types';

interface SmartCardButtonProps {
  onPatientFound: (hn: string, patient: PatientListItem, cardPhoto?: string | null) => void;
  onNewPatient?: (cardData: SmartCardData) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  className?: string;
  serverUrl?: string;
}

export function SmartCardButton({
  onPatientFound,
  onNewPatient,
  onError,
  disabled = false,
  className = '',
  serverUrl = 'http://localhost:8080',
}: SmartCardButtonProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const {
    isConnected,
    isReading,
    cardData,
    error,
    readerStatus,
    connect,
    disconnect,
    readCard,
    clearCardData,
  } = useSmartCardReader({
    serverUrl,
    autoConnect: false,
    onCardRead: handleCardRead,
    onError: (err) => {
      setStatusMessage(err);
      onError?.(err);
    },
    onConnect: () => {
      setStatusMessage('เชื่อมต่อเครื่องอ่านบัตรแล้ว - รอเสียบบัตร');
    },
    onDisconnect: () => {
      setStatusMessage('ยกเลิกการเชื่อมต่อแล้ว');
    },
  });

  // Handle card data and search for patient
  async function handleCardRead(data: SmartCardData) {
    if (!data.cid) {
      const errMsg = 'ไม่พบเลขบัตรประชาชนในข้อมูลบัตร';
      setStatusMessage(errMsg);
      onError?.(errMsg);
      return;
    }

    setIsSearching(true);
    setStatusMessage(`กำลังค้นหาผู้ป่วย CID: ${data.cid_formatted || formatCid(data.cid)}...`);

    try {
      // Search patient by CID using patientApi.getList
      const response = await patientApi.getList({
        search: data.cid,
        limit: 1,
      });

      if (response.data && response.data.length > 0) {
        // Found existing patient
        const patient = response.data[0];
        setStatusMessage(`พบผู้ป่วย: ${patient.fullName}`);
        
        // Pass card photo as fallback (base64 with data URI prefix)
        const cardPhoto = data.photo 
          ? `data:image/jpeg;base64,${data.photo}`
          : null;
        onPatientFound(patient.hn, patient, cardPhoto);
      } else {
        // New patient - not found in database
        setStatusMessage(`ไม่พบข้อมูลในระบบ: ${data.name_th.prefix}${data.name_th.firstname} ${data.name_th.lastname}`);
        onNewPatient?.(data);
      }
    } catch (err) {
      console.error('Error searching patient:', err);
      const errMsg = 'เกิดข้อผิดพลาดในการค้นหาผู้ป่วย';
      setStatusMessage(errMsg);
      onError?.(errMsg);
    } finally {
      setIsSearching(false);
    }
  }

  // Format CID for display
  function formatCid(cid: string): string {
    if (!cid || cid.length !== 13) return cid;
    return `${cid.slice(0, 1)}-${cid.slice(1, 5)}-${cid.slice(5, 10)}-${cid.slice(10, 12)}-${cid.slice(12)}`;
  }

  // Handle button click
  const handleClick = async () => {
    if (disabled || isReading || isSearching) return;

    setShowStatus(true);

    if (!isConnected) {
      setStatusMessage('กำลังเชื่อมต่อเครื่องอ่านบัตร...');
      connect();
    } else if (cardData) {
      // Card already inserted, search patient
      setStatusMessage(`กำลังค้นหาผู้ป่วย CID: ${cardData.cid_formatted || formatCid(cardData.cid)}...`);
      handleCardRead(cardData);
    } else {
      // Connected but no card, wait for card
      setStatusMessage('รอเสียบบัตรประชาชน...');
    }
  };

  // Close status popup
  const handleCloseStatus = () => {
    setShowStatus(false);
    clearCardData();
  };

  // Handle disconnect
  const handleDisconnect = () => {
    disconnect();
    setShowStatus(false);
    clearCardData();
  };

  // Auto-hide status after success
  useEffect(() => {
    if (readerStatus === 'success' && !isSearching) {
      const timer = setTimeout(() => {
        setShowStatus(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [readerStatus, isSearching]);

  // Get button state
  const isLoading = isReading || isSearching;
  const buttonDisabled = disabled || isLoading;

  // Get status icon and color
  const getStatusIcon = () => {
    if (isLoading) return <Loader2 size={16} className="animate-spin" />;
    if (error) return <AlertCircle size={16} />;
    if (readerStatus === 'success') return <Check size={16} />;
    if (isConnected) return <Wifi size={16} />;
    return <WifiOff size={16} />;
  };

  const getStatusColor = () => {
    if (error) return 'text-red-500';
    if (readerStatus === 'success') return 'text-emerald-500';
    if (isConnected) return 'text-emerald-500';
    return 'text-slate-400';
  };

  return (
    <div className="relative">
      {/* Main Button */}
      <button
        onClick={handleClick}
        disabled={buttonDisabled}
        className={`
          relative px-3 py-3 rounded-xl transition-all duration-200
          flex items-center justify-center gap-2
          ${buttonDisabled
            ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            : isConnected
              ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30'
              : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/20 border border-amber-200 dark:border-amber-500/30'
          }
          ${className}
        `}
        title={isConnected ? 'เชื่อมต่อแล้ว - รอเสียบบัตร' : 'เชื่อมต่อเครื่องอ่านบัตร'}
      >
        {isLoading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <>
            <CreditCard size={18} />
            <span className="font-medium text-sm">SC</span>
          </>
        )}

        {/* Connection indicator dot */}
        <span
          className={`
            absolute -top-1 -right-1 size-3 rounded-full border-2 border-white dark:border-slate-900
            ${isConnected ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}
            ${isLoading ? 'animate-pulse' : ''}
          `}
        />
      </button>

      {/* Status Popup */}
      {showStatus && (
        <div className="absolute top-full right-0 mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 min-w-[300px] max-w-[360px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`${getStatusColor()}`}>
                  {getStatusIcon()}
                </div>
                <span className="font-medium text-sm text-slate-900 dark:text-white">
                  Smart Card Reader
                </span>
              </div>
              <button
                onClick={handleCloseStatus}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Status Message */}
            <div className={`
              text-sm p-3 rounded-lg
              ${error
                ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                : readerStatus === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }
            `}>
              {statusMessage || 'พร้อมเชื่อมต่อ'}
            </div>

            {/* Card Data Preview (if available) */}
            {cardData && (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex gap-3">
                  {/* Photo */}
                  {cardData.photo && (
                    <div className="shrink-0">
                      <img 
                        src={`data:image/jpeg;base64,${cardData.photo}`}
                        alt="Photo"
                        className="size-16 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                  )}
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {cardData.name_th.prefix}{cardData.name_th.firstname} {cardData.name_th.lastname}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {cardData.name_en.prefix} {cardData.name_en.firstname} {cardData.name_en.lastname}
                    </div>
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                      {cardData.cid_formatted || formatCid(cardData.cid)}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {cardData.gender_desc} | เกิด {cardData.dob}
                    </div>
                  </div>
                </div>
                {/* Address */}
                {cardData.address && (
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {cardData.address.replace(/#/g, ' ')}
                  </div>
                )}
              </div>
            )}

            {/* Loading Progress */}
            {isLoading && (
              <div className="mt-3">
                <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full animate-progress" />
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-3 flex gap-2">
              {error ? (
                <button
                  onClick={() => {
                    clearCardData();
                    handleClick();
                  }}
                  className="flex-1 px-3 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
                >
                  ลองใหม่
                </button>
              ) : isConnected ? (
                <button
                  onClick={handleDisconnect}
                  className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  ยกเลิกการเชื่อมต่อ
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for mobile */}
      {showStatus && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={handleCloseStatus}
        />
      )}

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default SmartCardButton;