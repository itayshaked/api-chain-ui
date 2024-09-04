import { ModalBody, ModalFooter } from "@nextui-org/modal";
import { FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { AddButton } from "./AddButton";
import { Button } from "@nextui-org/button";
import { useDispatch, useSelector } from "@/app/hooks";
import { putCard, selectCard } from "@/app/cardsSlice";

type GenericCardFormProps = {
    onSubmit: (data: any) => void;
    onClose: () => void;
    handleSubmit: UseFormHandleSubmit<any>;
    errors: FieldErrors;
    children?: React.ReactNode;
};

export const GenericCardForm = ({
    onSubmit,
    onClose,
    handleSubmit,
    errors,
    children,
}: GenericCardFormProps) => {
    const dispatch = useDispatch();
    const onFormClose = () => {
        dispatch(putCard(null));
        onClose();
    };
    const selectedCard = useSelector(selectCard);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
                <AddButton
                    onPress={() => {
                        handleSubmit(onFormClose, (e) => console.log(e))();
                    }}
                    type="submit"
                    color="orange">
                    {(selectedCard ?? null) ? "Update" : "Add"}
                </AddButton>
                <Button color="danger" variant="light" onPress={onFormClose}>
                    Close
                </Button>
            </ModalFooter>
        </form>
    );
};
