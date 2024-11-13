import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';
import React from 'react'
import DeleteButton from '../../delete-button/DeleteButton';
import { IoMdAddCircle } from 'react-icons/io';

function CardHeader({ title, description, page, setIsDisabled, t, handleSubmit }) {
  return (
    <div className="header w-full flex justify-between items-center max-[450px]:flex-wrap gap-y-3 pb-2 px-2 md:px-6" dir="rtl">
      <div>
        <p className="text-2xl md:text-2xl font-semibold md:font-bold ">{title}</p>
        <CardDescription>{description}</CardDescription>
      </div>
      <div className="w-max flex justify-between items-center gap-2 buttons">
        {page === "add" ? (
          <Button className="GreenButton dark p-1  flex justify-between items-center gap-1" onClick={handleSubmit}>
            <IoMdAddCircle />
            {t("save")}
          </Button>
        ) : (
          <>
            <Button
              className="GreenButton dark"
              onClick={() => setIsDisabled(false)}
            >
              {t("Update")}
            </Button>
            <DeleteButton
              handleDelete={() => console.log("deletes")}
              className="DeleteButton dark"
            >
              {t("Delete")}
            </DeleteButton>
          </>
        )}
      </div>
    </div>
  );
}

export default CardHeader