// =============================================================================
// File: src/app/settings/kiosk-menus/add/page.tsx
// Description: Add Kiosk Menu - Form with CustomSelect lookups
// =============================================================================

'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Monitor, Eye } from 'lucide-react';
import { AdminLayout } from '@/components/layout';
import CustomSelect from '@/components/ui/CustomSelect';

// Types
type OpdKiosMenuType = 'G' | 'S' | 'V' | 'M';

interface FormData {
  parent_id: number | null;
  menu_type: OpdKiosMenuType;
  depcode: string;
  description: string;
  ovstist: string;
  ovstost: string;
  spclty: string;
  button_caption: string;
  symptom: string;
  print_form_name: string;
  order_no: number;
  button_width: number;
  button_height: number;
  font_name: string;
  font_size: number;
  font_color: string;
  fixed_pttype: string;
  fixed_pttype_code: string;
  fixed_sex: string;
  fixed_sex_code: string;
  fixed_age: string;
  fixed_age_min: number | null;
  fixed_age_max: number | null;
}

// Mock lookup data
const mockDepartments = [
  { value: '001', label: '001 - ตรวจโรคทั่วไป' },
  { value: '002', label: '002 - อายุรกรรม' },
  { value: '003', label: '003 - ศัลยกรรม' },
  { value: '010', label: '010 - หัวใจ' },
  { value: '011', label: '011 - กระดูกและข้อ' },
  { value: '020', label: '020 - ทันตกรรม' },
  { value: '030', label: '030 - จักษุ' },
  { value: '040', label: '040 - หู คอ จมูก' },
];

const mockOvstist = [
  { value: 'W', label: 'W - รอตรวจ' },
  { value: 'T', label: 'T - กำลังตรวจ' },
  { value: 'X', label: 'X - ตรวจเสร็จ' },
  { value: 'F', label: 'F - จำหน่าย' },
];

const mockOvstost = [
  { value: '01', label: '01 - ผู้ป่วยใหม่' },
  { value: '02', label: '02 - ผู้ป่วยเก่า' },
  { value: '03', label: '03 - ฉุกเฉิน' },
  { value: '04', label: '04 - นัดหมาย' },
];

const mockSpclty = [
  { value: '00', label: '00 - ทั่วไป' },
  { value: '01', label: '01 - อายุรกรรม' },
  { value: '02', label: '02 - ศัลยกรรม' },
  { value: '03', label: '03 - สูติ-นรีเวช' },
  { value: '04', label: '04 - กุมารเวช' },
  { value: '05', label: '05 - จักษุ' },
  { value: '06', label: '06 - หู คอ จมูก' },
  { value: '07', label: '07 - ออร์โธปิดิกส์' },
  { value: '08', label: '08 - จิตเวช' },
  { value: '09', label: '09 - รังสีวิทยา' },
  { value: '10', label: '10 - วิสัญญี' },
];

const mockParentMenus = [
  { value: '1', label: 'ห้องตรวจทั่วไป' },
  { value: '4', label: 'คลินิกพิเศษ' },
  { value: '7', label: 'ทันตกรรม' },
];

const menuTypeOptions = [
  { value: 'G', label: 'G - Group (กลุ่ม)' },
  { value: 'S', label: 'S - Service (บริการ)' },
  { value: 'V', label: 'V - Visit (เยี่ยมชม)' },
  { value: 'M', label: 'M - Module (โมดูล)' },
];

const fontOptions = [
  { value: 'Sarabun', label: 'Sarabun' },
  { value: 'Prompt', label: 'Prompt' },
  { value: 'Kanit', label: 'Kanit' },
  { value: 'Noto Sans Thai', label: 'Noto Sans Thai' },
  { value: 'IBM Plex Sans Thai', label: 'IBM Plex Sans Thai' },
];

const sexOptions = [
  { value: '', label: 'ไม่ระบุ' },
  { value: 'Y', label: 'Y - ระบุเพศ' },
];

const sexCodeOptions = [
  { value: '', label: 'ทุกเพศ' },
  { value: '1', label: '1 - ชาย' },
  { value: '2', label: '2 - หญิง' },
];

const ageOptions = [
  { value: '', label: 'ไม่ระบุ' },
  { value: 'Y', label: 'Y - ระบุช่วงอายุ' },
];

const pttypeOptions = [
  { value: '', label: 'ไม่ระบุ' },
  { value: 'Y', label: 'Y - ระบุสิทธิ์' },
];

const pttypeCodeOptions = [
  { value: '', label: 'ทุกสิทธิ์' },
  { value: 'UCS', label: 'UCS - บัตรทอง' },
  { value: 'OFC', label: 'OFC - ข้าราชการ' },
  { value: 'SSS', label: 'SSS - ประกันสังคม' },
  { value: 'LGO', label: 'LGO - อปท.' },
];

export default function AddKioskMenuPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    parent_id: null,
    menu_type: 'S',
    depcode: '',
    description: '',
    ovstist: 'W',
    ovstost: '',
    spclty: '',
    button_caption: '',
    symptom: '',
    print_form_name: '',
    order_no: 1,
    button_width: 180,
    button_height: 100,
    font_name: 'Sarabun',
    font_size: 16,
    font_color: '#000000',
    fixed_pttype: '',
    fixed_pttype_code: '',
    fixed_sex: '',
    fixed_sex_code: '',
    fixed_age: '',
    fixed_age_min: null,
    fixed_age_max: null,
  });

  const isGroup = formData.menu_type === 'G';

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.button_caption.trim()) {
      newErrors.button_caption = 'Button caption is required';
    }

    if (!isGroup && !formData.depcode) {
      newErrors.depcode = 'Department is required for service menus';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/settings/kiosk-menus');
    } catch (error: unknown) {
      const err = error as { message?: string };
      setErrors({ submit: err.message || 'Failed to create menu' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string | number | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Hex to number color
  const hexToNumber = (hex: string): number => {
    return parseInt(hex.replace('#', ''), 16);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Add Kiosk Menu</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">เพิ่มเมนูตู้ Kiosk ใหม่</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.submit && (
            <div className="p-4 bg-critical-50 dark:bg-critical-500/10 border border-critical-200 dark:border-critical-500/20 rounded-xl">
              <p className="text-sm text-critical-600 dark:text-critical-400">{errors.submit}</p>
            </div>
          )}

          {/* Basic Info */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Menu Type</label>
                <CustomSelect
                  options={menuTypeOptions}
                  value={formData.menu_type}
                  onChange={(val) => handleChange('menu_type', val as OpdKiosMenuType)}
                  placeholder="Select type..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Parent Menu</label>
                <CustomSelect
                  options={mockParentMenus}
                  value={formData.parent_id?.toString() || ''}
                  onChange={(val) => handleChange('parent_id', val ? parseInt(val) : null)}
                  placeholder="-- Root Menu --"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Button Caption <span className="text-critical-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.button_caption}
                  onChange={(e) => handleChange('button_caption', e.target.value)}
                  placeholder="e.g., ตรวจโรคทั่วไป"
                  className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all ${
                    errors.button_caption ? 'border-critical-300 dark:border-critical-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {errors.button_caption && <p className="mt-1 text-xs text-critical-500">{errors.button_caption}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="e.g., ตรวจโรคทั่วไป OPD"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Symptom</label>
                <input
                  type="text"
                  value={formData.symptom}
                  onChange={(e) => handleChange('symptom', e.target.value)}
                  placeholder="e.g., อาการทั่วไป"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Order No.</label>
                <input
                  type="number"
                  value={formData.order_no}
                  onChange={(e) => handleChange('order_no', parseInt(e.target.value) || 1)}
                  min={1}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Department & Status Settings */}
          {!isGroup && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Department & Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Department (depcode) <span className="text-critical-500">*</span>
                  </label>
                  <CustomSelect
                    options={mockDepartments}
                    value={formData.depcode}
                    onChange={(val) => handleChange('depcode', val)}
                    placeholder="Select department..."
                    error={errors.depcode}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Specialty (spclty)</label>
                  <CustomSelect
                    options={mockSpclty}
                    value={formData.spclty}
                    onChange={(val) => handleChange('spclty', val)}
                    placeholder="Select specialty..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Visit Status (ovstist)</label>
                  <CustomSelect
                    options={mockOvstist}
                    value={formData.ovstist}
                    onChange={(val) => handleChange('ovstist', val)}
                    placeholder="Select status..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">OPD Status (ovstost)</label>
                  <CustomSelect
                    options={mockOvstost}
                    value={formData.ovstost}
                    onChange={(val) => handleChange('ovstost', val)}
                    placeholder="Select OPD status..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Print Form Name</label>
                  <input
                    type="text"
                    value={formData.print_form_name}
                    onChange={(e) => handleChange('print_form_name', e.target.value)}
                    placeholder="e.g., OPD_TICKET"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Button Style */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Button Style</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Width (px)</label>
                <input
                  type="number"
                  value={formData.button_width}
                  onChange={(e) => handleChange('button_width', parseInt(e.target.value) || 180)}
                  min={80}
                  max={400}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Height (px)</label>
                <input
                  type="number"
                  value={formData.button_height}
                  onChange={(e) => handleChange('button_height', parseInt(e.target.value) || 100)}
                  min={40}
                  max={300}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Font</label>
                <CustomSelect
                  options={fontOptions}
                  value={formData.font_name}
                  onChange={(val) => handleChange('font_name', val)}
                  placeholder="Select font..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Font Size</label>
                <input
                  type="number"
                  value={formData.font_size}
                  onChange={(e) => handleChange('font_size', parseInt(e.target.value) || 16)}
                  min={10}
                  max={48}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Font Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.font_color}
                    onChange={(e) => handleChange('font_color', e.target.value)}
                    className="w-12 h-10 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.font_color}
                    onChange={(e) => handleChange('font_color', e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Preview</label>
                <div className="flex items-center justify-center p-6 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <div
                    className="bg-white dark:bg-slate-700 border-2 border-primary-500 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform"
                    style={{
                      width: formData.button_width,
                      height: formData.button_height,
                      fontFamily: formData.font_name,
                      fontSize: formData.font_size,
                      color: formData.font_color,
                    }}
                  >
                    <span className="px-2 text-center">{formData.button_caption || 'Button Caption'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Conditions */}
          {!isGroup && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Conditions (Optional)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Fixed PT Type</label>
                  <CustomSelect
                    options={pttypeOptions}
                    value={formData.fixed_pttype}
                    onChange={(val) => handleChange('fixed_pttype', val)}
                    placeholder="Select..."
                  />
                </div>

                {formData.fixed_pttype === 'Y' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">PT Type Code</label>
                    <CustomSelect
                      options={pttypeCodeOptions}
                      value={formData.fixed_pttype_code}
                      onChange={(val) => handleChange('fixed_pttype_code', val)}
                      placeholder="Select PT Type..."
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Fixed Sex</label>
                  <CustomSelect
                    options={sexOptions}
                    value={formData.fixed_sex}
                    onChange={(val) => handleChange('fixed_sex', val)}
                    placeholder="Select..."
                  />
                </div>

                {formData.fixed_sex === 'Y' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Sex Code</label>
                    <CustomSelect
                      options={sexCodeOptions}
                      value={formData.fixed_sex_code}
                      onChange={(val) => handleChange('fixed_sex_code', val)}
                      placeholder="Select sex..."
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Fixed Age</label>
                  <CustomSelect
                    options={ageOptions}
                    value={formData.fixed_age}
                    onChange={(val) => handleChange('fixed_age', val)}
                    placeholder="Select..."
                  />
                </div>

                {formData.fixed_age === 'Y' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Age Min</label>
                      <input
                        type="number"
                        value={formData.fixed_age_min || ''}
                        onChange={(e) => handleChange('fixed_age_min', e.target.value ? parseInt(e.target.value) : null)}
                        min={0}
                        max={150}
                        placeholder="0"
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Age Max</label>
                      <input
                        type="number"
                        value={formData.fixed_age_max || ''}
                        onChange={(e) => handleChange('fixed_age_max', e.target.value ? parseInt(e.target.value) : null)}
                        min={0}
                        max={150}
                        placeholder="150"
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition-colors shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Menu
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}