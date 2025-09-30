import React, { useState, useEffect } from 'react';
import { Check, X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface AppliedAreasSelectorProps {
  productId: number;
  productName: string;
  category: {
    value: string;
    label: string;
  };
  appliedAreas: string[];
  onAreasChange: (areas: string[]) => void;
  availableAreas: string[];
  disabled?: boolean;
}

// Kategori bazlı alan grupları
const getAreaGroups = (category: string) => {
  switch (category) {
    case 'PPF':
      return {
        'Ön Bölge': ['Kaput', 'Ön Çamurluk Sol', 'Ön Çamurluk Sağ', 'Ön Tampon'],
        'Kapılar': ['Ön Kapı Sol', 'Ön Kapı Sağ', 'Arka Kapı Sol', 'Arka Kapı Sağ'],
        'Arka Bölge': ['Arka Çamurluk Sol', 'Arka Çamurluk Sağ', 'Bagaj Kapağı', 'Arka Tampon'],
        'Üst Bölge': ['Tavan']
      };
    case 'CAM_FILMI':
      return {
        'Ön Camlar': ['Ön Cam'],
        'Arka Camlar': ['Arka Cam'],
        'Yan Camlar': ['Yan Cam Sol Ön', 'Yan Cam Sağ Ön', 'Yan Cam Sol Arka', 'Yan Cam Sağ Arka'],
        'Tavan': ['Tavan Camı']
      };
    default:
      return {};
  }
};

// Hızlı seçim presetleri
const getQuickSelectPresets = (category: string) => {
  switch (category) {
    case 'PPF':
      return {
        'Tam Araç': ['Kaput', 'Ön Çamurluk Sol', 'Ön Çamurluk Sağ', 'Ön Kapı Sol', 'Ön Kapı Sağ', 'Arka Kapı Sol', 'Arka Kapı Sağ', 'Arka Çamurluk Sol', 'Arka Çamurluk Sağ', 'Bagaj Kapağı', 'Tavan', 'Ön Tampon', 'Arka Tampon'],
        'Sadece Ön': ['Kaput', 'Ön Çamurluk Sol', 'Ön Çamurluk Sağ', 'Ön Tampon'],
        'Sadece Kapılar': ['Ön Kapı Sol', 'Ön Kapı Sağ', 'Arka Kapı Sol', 'Arka Kapı Sağ'],
        'Sadece Arka': ['Arka Kapı Sol', 'Arka Kapı Sağ', 'Arka Çamurluk Sol', 'Arka Çamurluk Sağ', 'Bagaj Kapağı', 'Arka Tampon']
      };
    case 'CAM_FILMI':
      return {
        'Tüm Camlar': ['Ön Cam', 'Arka Cam', 'Yan Cam Sol Ön', 'Yan Cam Sağ Ön', 'Yan Cam Sol Arka', 'Yan Cam Sağ Arka', 'Tavan Camı'],
        'Sadece Ön-Arka': ['Ön Cam', 'Arka Cam'],
        'Sadece Yan Camlar': ['Yan Cam Sol Ön', 'Yan Cam Sağ Ön', 'Yan Cam Sol Arka', 'Yan Cam Sağ Arka']
      };
    default:
      return {};
  }
};

export default function AppliedAreasSelector({
  productId,
  productName,
  category,
  appliedAreas,
  onAreasChange,
  availableAreas,
  disabled = false
}: AppliedAreasSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(appliedAreas);

  // Seçilen alanları güncelle
  useEffect(() => {
    setSelectedAreas(appliedAreas);
  }, [appliedAreas]);

  const areaGroups = getAreaGroups(category.value);
  const quickPresets = getQuickSelectPresets(category.value);

  // Alan seçimi/kaldırma
  const toggleArea = (area: string) => {
    if (disabled) return;
    
    const newAreas = selectedAreas.includes(area)
      ? selectedAreas.filter(a => a !== area)
      : [...selectedAreas, area];
    
    setSelectedAreas(newAreas);
    onAreasChange(newAreas);
  };

  // Grup seçimi/kaldırma
  const toggleGroup = (groupAreas: string[]) => {
    if (disabled) return;
    
    const allSelected = groupAreas.every(area => selectedAreas.includes(area));
    
    if (allSelected) {
      // Tümünü kaldır
      const newAreas = selectedAreas.filter(area => !groupAreas.includes(area));
      setSelectedAreas(newAreas);
      onAreasChange(newAreas);
    } else {
      // Tümünü seç
      const newAreas = [...new Set([...selectedAreas, ...groupAreas])];
      setSelectedAreas(newAreas);
      onAreasChange(newAreas);
    }
  };

  // Hızlı seçim preset'i uygula
  const applyPreset = (presetAreas: string[]) => {
    if (disabled) return;
    
    setSelectedAreas(presetAreas);
    onAreasChange(presetAreas);
  };

  // Tümünü temizle
  const clearAll = () => {
    if (disabled) return;
    
    setSelectedAreas([]);
    onAreasChange([]);
  };

  // Tümünü seç
  const selectAll = () => {
    if (disabled) return;
    
    setSelectedAreas(availableAreas);
    onAreasChange(availableAreas);
  };

  return (
    <div className="space-y-4">
      {/* Başlık ve Hızlı Eylemler */}
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Uygulanan Alanlar *</Label>
          <p className="text-xs text-muted-foreground">
            {selectedAreas.length} alan seçildi
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={selectAll}
            disabled={disabled || selectedAreas.length === availableAreas.length}
          >
            <Plus className="h-3 w-3 mr-1" />
            Tümü
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearAll}
            disabled={disabled || selectedAreas.length === 0}
          >
            <Minus className="h-3 w-3 mr-1" />
            Temizle
          </Button>
        </div>
      </div>

      {/* Hızlı Seçim Presetleri */}
      {Object.keys(quickPresets).length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Hızlı Seçimler</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {Object.entries(quickPresets).map(([presetName, presetAreas]) => {
                const isActive = presetAreas.every((area: string) => selectedAreas.includes(area)) && 
                                presetAreas.length === selectedAreas.length;
                
                return (
                  <Button
                    key={presetName}
                    type="button"
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => applyPreset(presetAreas)}
                    disabled={disabled}
                    className="text-xs"
                  >
                    {presetName}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seçilen Alanlar */}
      {selectedAreas.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Seçilen Alanlar</Label>
          <div className="flex flex-wrap gap-1">
                    {selectedAreas.map((area: string) => (
              <Badge
                key={area}
                variant="secondary"
                className="inline-flex items-center gap-1 pr-1"
              >
                {area}
                <button
                  type="button"
                  onClick={() => toggleArea(area)}
                  disabled={disabled}
                  className="ml-1 hover:text-destructive disabled:opacity-50"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Detaylı Seçim */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full justify-between"
            disabled={disabled}
          >
            <span>Detaylı Seçim Yap</span>
            <Plus className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-45' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-4 mt-4">
          {Object.entries(areaGroups).map(([groupName, groupAreas]) => {
            const groupSelectedCount = groupAreas.filter((area: string) => selectedAreas.includes(area)).length;
            const isGroupFullySelected = groupSelectedCount === groupAreas.length;
            const isGroupPartiallySelected = groupSelectedCount > 0 && groupSelectedCount < groupAreas.length;
            
            return (
              <Card key={groupName}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{groupName}</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {groupSelectedCount}/{groupAreas.length}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => toggleGroup(groupAreas)}
                        disabled={disabled}
                        className="h-6 px-2 text-xs"
                      >
                        {isGroupFullySelected ? 'Kaldır' : 'Seç'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-2">
                    {groupAreas.map((area: string) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${productId}-${area}`}
                          checked={selectedAreas.includes(area)}
                          onCheckedChange={() => toggleArea(area)}
                          disabled={disabled}
                        />
                        <Label
                          htmlFor={`${productId}-${area}`}
                          className="text-sm font-normal cursor-pointer flex-1"
                        >
                          {area}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </CollapsibleContent>
      </Collapsible>

      {/* Uyarı Mesajı */}
      {selectedAreas.length === 0 && (
        <div className="text-center py-4 text-sm text-muted-foreground border border-dashed rounded-lg">
          En az bir alan seçmelisiniz
        </div>
      )}
    </div>
  );
}
