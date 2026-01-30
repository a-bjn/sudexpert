"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  Button,
  Listbox,
  ListboxItem,
  Card,
  CardBody,
} from "@heroui/react";
import {
  ChevronRight,
  Tag,
  DollarSign,
  Package,
  Filter,
  X,
} from "lucide-react";

type Category = {
  id: number;
  name: string;
};

type ShopSidebarProps = {
  categories: Category[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
  priceRange: [number, number] | null;
  onPriceRangeChange: (range: [number, number] | null) => void;
  stockFilter: "all" | "in-stock" | "low-stock";
  onStockFilterChange: (filter: "all" | "in-stock" | "low-stock") => void;
  isOpen?: boolean;
  onClose?: () => void;
};

export default function ShopSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  stockFilter,
  onStockFilterChange,
  isOpen = true,
  onClose,
}: ShopSidebarProps) {
  const priceRanges = [
    { label: "Sub 100 RON", value: [0, 100] as [number, number] },
    { label: "100 - 500 RON", value: [100, 500] as [number, number] },
    { label: "500 - 1000 RON", value: [500, 1000] as [number, number] },
    { label: "Peste 1000 RON", value: [1000, 999999] as [number, number] },
  ];

  const stockOptions = [
    { label: "Toate produsele", value: "all" as const },
    { label: "Doar în stoc", value: "in-stock" as const },
    { label: "Stoc redus", value: "low-stock" as const },
  ];

  const hasActiveFilters = selectedCategory !== null || priceRange !== null || stockFilter !== "all";

  const clearAllFilters = () => {
    onCategoryChange(null);
    onPriceRangeChange(null);
    onStockFilterChange("all");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && onClose && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`
          fixed lg:sticky top-0 left-0 h-screen lg:h-auto
          w-80 bg-white border-r border-slate-200
          overflow-y-auto z-50 lg:z-0
          ${isOpen ? "block" : "hidden lg:block"}
        `}
        style={{ top: "var(--header-height, 0px)" }}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Filter className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="bebas-neue-regular text-2xl text-slate-800">Filtrare</h2>
            </div>
            {onClose && (
              <Button
                isIconOnly
                variant="light"
                onPress={onClose}
                className="lg:hidden"
                aria-label="Închide meniul"
              >
                <X className="w-5 h-5 text-slate-600" />
              </Button>
            )}
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                color="danger"
                variant="flat"
                onPress={clearAllFilters}
                startContent={<X className="w-4 h-4" />}
                className="w-full"
              >
                Șterge toate filtrele
              </Button>
            </motion.div>
          )}

          {/* Accordion for Filters */}
          <Accordion
            defaultExpandedKeys={["categories", "price", "stock"]}
            selectionMode="multiple"
            variant="splitted"
            className="px-0"
          >
            {/* Categories Section */}
            <AccordionItem
              key="categories"
              aria-label="Categorii"
              startContent={<Tag className="w-5 h-5 text-orange-600" />}
              title={<span className="font-semibold text-slate-800">Categorii</span>}
              classNames={{
                base: "shadow-none border border-slate-200",
                title: "text-slate-800",
                trigger: "hover:bg-slate-50",
                content: "pt-0",
              }}
            >
              <Listbox
                aria-label="Categorii produse"
                variant="flat"
                selectionMode="single"
                selectedKeys={selectedCategory !== null ? [String(selectedCategory)] : ["all"]}
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0] as string;
                  onCategoryChange(key === "all" ? null : Number(key));
                }}
                classNames={{
                  list: "gap-1",
                }}
              >
                <ListboxItem
                  key="all"
                  className="data-[selected=true]:bg-orange-50 data-[selected=true]:text-orange-700"
                >
                  Toate categoriile
                </ListboxItem>
                {categories.map((category) => (
                  <ListboxItem
                    key={String(category.id)}
                    className="data-[selected=true]:bg-orange-50 data-[selected=true]:text-orange-700"
                  >
                    {category.name}
                  </ListboxItem>
                ))}
              </Listbox>
            </AccordionItem>

            {/* Price Range Section */}
            <AccordionItem
              key="price"
              aria-label="Preț"
              startContent={<DollarSign className="w-5 h-5 text-orange-600" />}
              title={<span className="font-semibold text-slate-800">Preț</span>}
              classNames={{
                base: "shadow-none border border-slate-200",
                title: "text-slate-800",
                trigger: "hover:bg-slate-50",
                content: "pt-0",
              }}
            >
              <Listbox
                aria-label="Intervale de preț"
                variant="flat"
                selectionMode="single"
                selectedKeys={
                  priceRange !== null
                    ? [`${priceRange[0]}-${priceRange[1]}`]
                    : ["all"]
                }
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0] as string;
                  if (key === "all") {
                    onPriceRangeChange(null);
                  } else {
                    const range = priceRanges.find(
                      (r) => `${r.value[0]}-${r.value[1]}` === key
                    );
                    if (range) onPriceRangeChange(range.value);
                  }
                }}
                classNames={{
                  list: "gap-1",
                }}
              >
                <ListboxItem
                  key="all"
                  className="data-[selected=true]:bg-orange-50 data-[selected=true]:text-orange-700"
                >
                  Toate prețurile
                </ListboxItem>
                {priceRanges.map((range, index) => (
                  <ListboxItem
                    key={`${range.value[0]}-${range.value[1]}`}
                    className="data-[selected=true]:bg-orange-50 data-[selected=true]:text-orange-700"
                  >
                    {range.label}
                  </ListboxItem>
                ))}
              </Listbox>
            </AccordionItem>

            {/* Stock Status Section */}
            <AccordionItem
              key="stock"
              aria-label="Disponibilitate"
              startContent={<Package className="w-5 h-5 text-orange-600" />}
              title={<span className="font-semibold text-slate-800">Disponibilitate</span>}
              classNames={{
                base: "shadow-none border border-slate-200",
                title: "text-slate-800",
                trigger: "hover:bg-slate-50",
                content: "pt-0",
              }}
            >
              <Listbox
                aria-label="Filtre disponibilitate"
                variant="flat"
                selectionMode="single"
                selectedKeys={[stockFilter]}
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0] as "all" | "in-stock" | "low-stock";
                  onStockFilterChange(key);
                }}
                classNames={{
                  list: "gap-1",
                }}
              >
                {stockOptions.map((option) => (
                  <ListboxItem
                    key={option.value}
                    className="data-[selected=true]:bg-orange-50 data-[selected=true]:text-orange-700"
                  >
                    {option.label}
                  </ListboxItem>
                ))}
              </Listbox>
            </AccordionItem>
          </Accordion>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100">
              <CardBody className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <ChevronRight className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-1">
                      Ai nevoie de ajutor?
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Contactează-ne pentru consultanță gratuită în alegerea produselor potrivite.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}
