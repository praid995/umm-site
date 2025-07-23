"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FilterOption {
  id: string;
  name: string;
}

interface FilterSidebarProps {
  forms?: FilterOption[];
  gosts?: FilterOption[];
  materials?: FilterOption[];
  thicknessRange?: [number, number];
  lengthRange?: [number, number];
  onFilterChange?: (filters: any) => void;
}

const FilterSidebar = ({
  forms = [],
  gosts = [],
  materials = [],
  thicknessRange = [0.5, 150],
  lengthRange = [0.5, 12],
  onFilterChange,
}: FilterSidebarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [selectedGosts, setSelectedGosts] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [thickness, setThickness] = useState<[number, number]>([thicknessRange[0], thicknessRange[1]]);
  const [length, setLength] = useState<[number, number]>([lengthRange[0], lengthRange[1]]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleFormChange = (id: string, checked: boolean) => {
    setSelectedForms(
      checked
        ? [...selectedForms, id]
        : selectedForms.filter((form) => form !== id)
    );
  };

  const handleGostChange = (id: string, checked: boolean) => {
    setSelectedGosts(
      checked
        ? [...selectedGosts, id]
        : selectedGosts.filter((gost) => gost !== id)
    );
  };

  const handleMaterialChange = (id: string, checked: boolean) => {
    setSelectedMaterials(
      checked
        ? [...selectedMaterials, id]
        : selectedMaterials.filter((material) => material !== id)
    );
  };

  const handleApplyFilters = () => {
    const filters = {
      forms: selectedForms,
      gosts: selectedGosts,
      materials: selectedMaterials,
      thickness,
      length,
    };
    
    onFilterChange?.(filters);
    setIsMobileFilterOpen(false);
    
    // Update URL with filter params
    const params = new URLSearchParams(searchParams.toString());
    
    if (selectedForms.length) params.set('forms', selectedForms.join(','));
    else params.delete('forms');
    
    if (selectedGosts.length) params.set('gosts', selectedGosts.join(','));
    else params.delete('gosts');
    
    if (selectedMaterials.length) params.set('materials', selectedMaterials.join(','));
    else params.delete('materials');
    
    params.set('minThickness', thickness[0].toString());
    params.set('maxThickness', thickness[1].toString());
    params.set('minLength', length[0].toString());
    params.set('maxLength', length[1].toString());
    
    // Update the URL
    const newPath = `${window.location.pathname}?${params.toString()}`;
    router.push(newPath);
  };

  const handleResetFilters = () => {
    setSelectedForms([]);
    setSelectedGosts([]);
    setSelectedMaterials([]);
    setThickness([thicknessRange[0], thicknessRange[1]]);
    setLength([lengthRange[0], lengthRange[1]]);
    
    onFilterChange?.({
      forms: [],
      gosts: [],
      materials: [],
      thickness: thicknessRange,
      length: lengthRange,
    });
    
    // Reset URL params
    router.push(window.location.pathname);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <Accordion type="multiple" className="w-full" defaultValue={["form", "gost", "material", "thickness", "length"]}>
        {/* Form Filter */}
        <AccordionItem value="form">
          <AccordionTrigger>Форма</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {forms.map((form) => (
                <div key={form.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`form-${form.id}`}
                    checked={selectedForms.includes(form.id)}
                    onCheckedChange={(checked) => 
                      handleFormChange(form.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`form-${form.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {form.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* GOST Filter */}
        <AccordionItem value="gost">
          <AccordionTrigger>ГОСТ</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {gosts.map((gost) => (
                <div key={gost.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`gost-${gost.id}`}
                    checked={selectedGosts.includes(gost.id)}
                    onCheckedChange={(checked) => 
                      handleGostChange(gost.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`gost-${gost.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {gost.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Material Filter */}
        <AccordionItem value="material">
          <AccordionTrigger>Материал</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {materials.map((material) => (
                <div key={material.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`material-${material.id}`}
                    checked={selectedMaterials.includes(material.id)}
                    onCheckedChange={(checked) => 
                      handleMaterialChange(material.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`material-${material.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {material.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Thickness Filter */}
        <AccordionItem value="thickness">
          <AccordionTrigger>Толщина (мм)</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 pt-4 px-1">
              <Slider
                value={[thickness[0], thickness[1]]}
                min={thicknessRange[0]}
                max={thicknessRange[1]}
                step={0.1}
                onValueChange={(value) => 
                  setThickness([value[0], value[1]])
                }
              />
              <div className="flex justify-between">
                <Input
                  type="number"
                  value={thickness[0]}
                  onChange={(e) => 
                    setThickness([Number(e.target.value), thickness[1]])
                  }
                  className="w-20"
                  min={thicknessRange[0]}
                  max={thickness[1]}
                  step={0.1}
                />
                <span className="mx-2 self-center">-</span>
                <Input
                  type="number"
                  value={thickness[1]}
                  onChange={(e) => 
                    setThickness([thickness[0], Number(e.target.value)])
                  }
                  className="w-20"
                  min={thickness[0]}
                  max={thicknessRange[1]}
                  step={0.1}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Length Filter */}
        <AccordionItem value="length">
          <AccordionTrigger>Длина (м)</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 pt-4 px-1">
              <Slider
                value={[length[0], length[1]]}
                min={lengthRange[0]}
                max={lengthRange[1]}
                step={0.5}
                onValueChange={(value) => 
                  setLength([value[0], value[1]])
                }
              />
              <div className="flex justify-between">
                <Input
                  type="number"
                  value={length[0]}
                  onChange={(e) => 
                    setLength([Number(e.target.value), length[1]])
                  }
                  className="w-20"
                  min={lengthRange[0]}
                  max={length[1]}
                  step={0.5}
                />
                <span className="mx-2 self-center">-</span>
                <Input
                  type="number"
                  value={length[1]}
                  onChange={(e) => 
                    setLength([length[0], Number(e.target.value)])
                  }
                  className="w-20"
                  min={length[0]}
                  max={lengthRange[1]}
                  step={0.5}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex gap-2 pt-4">
        <Button onClick={handleApplyFilters} className="flex-1">
          Применить
        </Button>
        <Button 
          variant="outline" 
          onClick={handleResetFilters}
          className="flex-1"
        >
          Сбросить
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <h3 className="font-semibold text-lg mb-4">Фильтры</h3>
        <FilterContent />
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden w-full mb-4">
        <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Фильтры
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Фильтры</SheetTitle>
            </SheetHeader>
            <div className="mt-4 overflow-y-auto max-h-[calc(80vh-80px)]">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default FilterSidebar;