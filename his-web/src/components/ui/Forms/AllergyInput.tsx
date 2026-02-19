"use client"

import { useState } from 'react';
import { X, AlertCircle, Plus } from 'lucide-react';
import Input from './Input';

// Allergy Input Component
const AllergyInput: React.FC<{
    allergies: string[];
    onChange: (allergies: string[]) => void;
}> = ({ allergies, onChange }) => {
    const [newAllergy, setNewAllergy] = useState('');

    const handleAdd = () => {
        if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) {
            onChange([...allergies, newAllergy.trim()]);
            setNewAllergy('');
        }
    };

    const handleRemove = (allergy: string) => {
        onChange(allergies.filter((a) => a !== allergy));
    };

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                <Input
                    type="text"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
                    placeholder="พิมพ์ชื่อยาที่แพ้..."
                    className="flex-1"
                />
                <button
                    type="button"
                    onClick={handleAdd}
                    disabled={!newAllergy.trim()}
                    className="px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Plus size={18} />
                </button>
            </div>
            
            {allergies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {allergies.map((allergy) => (
                        <span key={allergy} className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 rounded-lg text-sm">
                            <AlertCircle size={14} />
                            {allergy}
                            <button
                                type="button"
                                onClick={() => handleRemove(allergy)}
                                className="ml-1 hover:text-red-900 dark:hover:text-red-100"
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>
            )}
            
            {allergies.length === 0 && (
                <p className="text-sm text-slate-400 italic">ไม่มีประวัติแพ้ยา</p>
            )}
        </div>
    );
};

export default AllergyInput;