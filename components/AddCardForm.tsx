import { GenericCardType } from "@/types/index";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Tab, Tabs } from "@nextui-org/tabs";
import {
    CurlCardForm,
    curlInputs,
    HttpRequestCardForm,
    Inputs,
} from "./CardForms";
import { useDispatch, useFormState, useSelector } from "@/app/hooks";
import {
    add,
    selectCard,
    updateCurlCard,
    updateFormCard,
} from "@/app/cardsSlice";

export const HttpRequestForm = () => {
    const { isCardFormOpen, onCardFormOpenChange } = useFormState();
    const dispatch = useDispatch();
    const addCard = (card: GenericCardType) => {
        dispatch(add(card));
    };
    const selectedCard = useSelector(selectCard);
    const curlOnSubmit: SubmitHandler<curlInputs> = (data: curlInputs) => {
        if (selectedCard == null) {
            addCard({
                id: crypto.randomUUID(),
                title: data.title,
                curl: data.curl,
                type: "curl",
            });
        } else {
            dispatch(
                updateCurlCard({
                    id: selectedCard.id,
                    title: data.title,
                    curl: data.curl,
                    type: "curl",
                })
            );
        }
    };
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        if (selectedCard == null) {
            addCard({
                id: crypto.randomUUID(),
                title: data.title,
                url: data.URL,
                method: data.method,
                description: data.description,
                params: data.params ? data.params : undefined,
                body: data.body ? data.body : undefined,
                type: "form",
            });
        } else {
            dispatch(
                updateFormCard({
                    id: selectedCard.id,
                    title: data.title,
                    url: data.URL,
                    method: data.method,
                    description: data.description,
                    params: data.params ? data.params : undefined,
                    body: data.body ? data.body : undefined,
                    type: "form",
                })
            );
        }
    };
    const selectedTab = () => {
        if (selectedCard == null) {
            return undefined;
        }
        return selectedCard?.type == "curl" ? "curl" : "form";
    };

    return (
        <Modal
            placement="center"
            isOpen={isCardFormOpen}
            onOpenChange={onCardFormOpenChange}
            className="flex flex-col items-center">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h2>Add new Request</h2>
                        </ModalHeader>
                        <Tabs defaultSelectedKey={selectedTab()}>
                            <Tab
                                key="form"
                                title="Form"
                                className="w-full flex flex-col gap-2">
                                <HttpRequestCardForm
                                    onSubmit={onSubmit}
                                    onClose={onClose}
                                />
                            </Tab>
                            <Tab key="curl" title="cURL" className="w-full">
                                <CurlCardForm
                                    onSubmit={curlOnSubmit}
                                    onClose={onClose}
                                />
                            </Tab>
                        </Tabs>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
