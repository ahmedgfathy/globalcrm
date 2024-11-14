import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "@/app/context/TranslationContext";

function DeleteButton({ handleDelete, title, afterDel }) {
  const { locale, t } = useTranslation();

  const onOk = () => {
    return handleDelete()
      .then(() => {
        afterDel();
      })
      .catch(() => {
        console.log("Oops, errors occurred!");
      });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="destructive" aria-label={t("delete")}>
          {title}
          <AiOutlineDelete className="mx-1 text-lg" />
        </Button>
      </DialogTrigger>
      <DialogContent
        locale={locale}
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="text-start"
      >
        <DialogHeader>
          <DialogTitle>{t("sure_delete")}</DialogTitle>
          <DialogDescription>
            {t("description_delete_dialog")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={onOk}>
            {t("Delete")}
            <AiOutlineDelete className="mx-1 text-lg" />
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              {t("close_dialog")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteButton;
