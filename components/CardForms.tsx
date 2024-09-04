import { Input, Textarea } from "@nextui-org/input";

import { FieldError, useForm } from "react-hook-form";

import { GenericCardForm } from "./GenericCardForm";
import { Select, SelectItem } from "@nextui-org/select";
import { useSelector } from "react-redux";
import { selectCard } from "@/app/cardsSlice";
import { CurlRequestCardType, FormRequestCardType } from "@/types";
import { useDispatch } from "@/app/hooks";
import { useEffect } from "react";

export type curlInputs = {
    title: string;
    curl: string;
};
type CardFormProps = {
    onSubmit: (data: any) => void;
    onClose: () => void;
};

export const CurlCardForm = ({ onSubmit, onClose }: CardFormProps) => {
    const { register, handleSubmit, formState, setValue } =
        useForm<curlInputs>();
    const { errors } = formState;
    const generateCurlErrorMessaage = (error: FieldError | undefined) => {
        if (error?.type === "required") {
            return "This field is required";
        } else if (error?.type === "validate") {
            return "cURL Should look like this: curl -X GET http://example.com";
        }
    };
    const validateCurl = (value: string) => {
        const curlRegex = /^curl\s+-[A-Z]+\s+https?:\/\/\S+$/;
        if (!curlRegex.test(value)) {
            return "cURL should look like this: curl -X GET http://example.com";
        }
    };
    const selectedCard = useSelector(selectCard) as CurlRequestCardType;
    useEffect(() => {
        if (selectedCard && selectedCard.type === "curl") {
            setValue("title", selectedCard.title);
            setValue("curl", selectedCard.curl);
        }
    });

    return (
        <GenericCardForm
            onSubmit={onSubmit}
            onClose={onClose}
            errors={errors}
            handleSubmit={handleSubmit}>
            <Input
                {...register("title", {
                    required: true,
                })}
                label="Title"
                size="lg"
                isInvalid={errors.title ? true : false}
                errorMessage={generateCurlErrorMessaage(errors.title)}
            />
            <Textarea
                {...register("curl", {
                    required: true,
                })}
                label="cURL"
                size="lg"
                isInvalid={errors.curl ? true : false}
                errorMessage={generateCurlErrorMessaage(errors.curl)}
            />
        </GenericCardForm>
    );
};

type Method = "GET" | "POST" | "PUT" | "DELETE";
type Methods = {
    key: Method;
    label: Method;
}[];

export type Inputs = {
    title: string;
    URL: string;
    method: Method;
    description: string;
    params: string;
    body: string;
};

const methods: Methods = [
    { key: "GET", label: "GET" },
    { key: "POST", label: "POST" },
    { key: "PUT", label: "PUT" },
    { key: "DELETE", label: "DELETE" },
];

export const HttpRequestCardForm = ({ onSubmit, onClose }: CardFormProps) => {
    const { register, handleSubmit, formState, setValue } = useForm<Inputs>();
    const { errors } = formState;
    const selectedCard = useSelector(selectCard) as FormRequestCardType;
    useEffect(() => {
        if (selectedCard && selectedCard.type === "form") {
            setValue("title", selectedCard.title);
            setValue("URL", selectedCard.url);
            setValue("method", selectedCard.method);
            setValue("description", selectedCard.description ?? "");
            setValue("params", selectedCard.params ?? "");
            setValue("body", selectedCard.body ?? "");
        }
    });
    const generateUrlErrorMessaage = (error: FieldError | undefined) => {
        if (error?.type === "required") {
            return "This field is required";
        }
        return "URL Should look like this: http://example.com";
    };

    return (
        <GenericCardForm
            onSubmit={onSubmit}
            onClose={onClose}
            errors={errors}
            handleSubmit={handleSubmit}>
            <Input
                {...register("title", {
                    required: true,
                })}
                isInvalid={errors.title ? true : false}
                isRequired
                type="text"
                label="Title"
            />
            <Input
                isInvalid={errors.URL ? true : false}
                errorMessage={generateUrlErrorMessaage(errors.URL)}
                {...register("URL", {
                    required: true,
                    pattern: /^https?:\/\/.*/,
                })}
                isRequired
                type="text"
                label="URL"
            />
            <Select
                {...register("method", {
                    required: true,
                })}
                label="Method"
                isRequired
                defaultSelectedKeys={[methods[0].key]}
                items={methods}>
                {(method) => (
                    <SelectItem key={method.key}>{method.label}</SelectItem>
                )}
            </Select>
            <Input {...register("description")} label="Description" />
            <Textarea {...register("params")} label="Params" />
            <Textarea {...register("body")} label="Body" />
        </GenericCardForm>
    );
};
