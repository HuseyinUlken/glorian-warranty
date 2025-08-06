import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";

interface ConfirmDialogProps {
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  confirmVariant?: ButtonVariant;
  onConfirm: () => void;
  children: React.ReactNode;
}

/**
 * ConfirmDialog bileşeni, herhangi bir işlem için onay almak üzere kullanılır.
 * 
 * @example
 * ```tsx
 * <ConfirmDialog 
 *   title="Silme İşlemi" 
 *   description="Bu kaydı silmek istediğinize emin misiniz?" 
 *   onConfirm={() => handleDelete(id)}
 * >
 *   <Button variant="destructive" size="sm">
 *     <Trash2 className="w-4 h-4" />
 *   </Button>
 * </ConfirmDialog>
 * ```
 */
export function ConfirmDialog({
  title = "Onay",
  description = "Bu işlemi gerçekleştirmek istediğinize emin misiniz?",
  cancelText = "İptal",
  confirmText = "Onayla",
  confirmVariant = "default",
  onConfirm,
  children,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)}>{children}</div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={
              confirmVariant === "destructive"
                ? "bg-destructive text-white hover:bg-destructive/90"
                : ""
            }
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/**
 * DeleteConfirmDialog bileşeni, silme işlemleri için özelleştirilmiş bir ConfirmDialog'dur.
 * 
 * @example
 * ```tsx
 * <DeleteConfirmDialog onConfirm={() => handleDelete(id)}>
 *   <Button variant="destructive" size="sm">
 *     <Trash2 className="w-4 h-4" />
 *   </Button>
 * </DeleteConfirmDialog>
 * ```
 */
export function DeleteConfirmDialog({
  title = "Silme İşlemi",
  description = "Bu kaydı silmek istediğinize emin misiniz?",
  cancelText = "İptal",
  confirmText = "Sil",
  onConfirm,
  children,
}: Omit<ConfirmDialogProps, "confirmVariant">) {
  return (
    <ConfirmDialog
      title={title}
      description={description}
      cancelText={cancelText}
      confirmText={confirmText}
      confirmVariant="destructive"
      onConfirm={onConfirm}
    >
      {children}
    </ConfirmDialog>
  );
}
