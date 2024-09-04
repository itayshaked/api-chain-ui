import { extractCurl } from "@/app/utils";
import { CurlRequestCardType, FormRequestCardType } from "@/types";
import { Button } from "@nextui-org/button";
import {
    Card as NextUICard,
    CardHeader,
    CardBody,
    CardFooter,
} from "@nextui-org/card";
import { Code } from "@nextui-org/code";
import { Spinner } from "@nextui-org/spinner";
import { useCallback, useMemo, useState } from "react";
import { DeleteIcon, EditIcon } from "./icons";
import { AddButton } from "./AddButton";
import { useDispatch, useFormState } from "@/app/hooks";
import { putCard, remove } from "@/app/cardsSlice";
import Draggable from "react-draggable";
import { DraggableBounds } from "react-draggable";
type FormRequestArgs = {
    method: string;
    url: string;
    params?: string;
    body?: string;
};
type CurlRequestArgs = {
    curl: string;
};
export type CardProps = {
    id: string;
    title: string;
    description?: string;
    requestArgs: FormRequestArgs | CurlRequestArgs;
    children: React.ReactNode;
};

export const GenericCard = ({
    id,
    title,
    description,
    requestArgs,
    children,
}: CardProps) => {
    const dispatch = useDispatch();
    const [requestWasSent, setRequestWasSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [responseCode, setResponseCode] = useState(0);
    const [responseTime, setResponseTime] = useState(0);
    const [responseSize, setResponseSize] = useState(0);
    const [responseHeaders, setResponseHeaders] = useState("");
    const [responseBody, setResponseBody] = useState("");
    const [responseError, setResponseError] = useState("");

    const { onCardFormOpen } = useFormState();

    const removeSelfFromState = () => {
        dispatch(remove({ id: id }));
    };

    const openExistingCardForm = () => {
        dispatch(putCard(id));
        onCardFormOpen();
    };

    const { method, url, params, body } = useMemo(() => {
        if ("method" in requestArgs) {
            return requestArgs;
        } else {
            const { curl } = requestArgs;
            const parsedCurl = extractCurl(curl);
            return {
                method: parsedCurl.method,
                url: parsedCurl.url,
                params: parsedCurl.data,
                body: parsedCurl.data,
            };
        }
    }, [requestArgs]);

    const sendRequest = async () => {
        setLoading(true);
        try {
            const startTime = Date.now();
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            });
            const endTime = Date.now();
            const responseText = await response.text();
            setResponseCode(response.status);
            setResponseTime(endTime - startTime);
            setResponseSize(responseText.length);
            setResponseHeaders(JSON.stringify(response.headers));
            setResponseBody(responseText);
            setRequestWasSent(true);
        } catch (error) {
            setResponseError("An error occurred while sending the request");
            setLoading(false);
            throw error;
        }
        setLoading(false);
    };

    return (
        <Draggable bounds="parent">
            <NextUICard className="cursor-grab absolute">
                <CardHeader className="flex flex-row justify-between">
                    <div className="flex flex-col items-center flex-grow ">
                        <h1>{title}</h1>
                        <p>{description}</p>
                    </div>
                    <AddButton
                        color="hoverOrange"
                        isIconOnly
                        radius="full"
                        onPress={openExistingCardForm}>
                        <EditIcon />
                    </AddButton>
                    <AddButton
                        color="hoverOrange"
                        radius="full"
                        isIconOnly
                        onPress={removeSelfFromState}>
                        <DeleteIcon />
                    </AddButton>
                </CardHeader>
                <CardBody>{children}</CardBody>
                <CardFooter className="flex flex-wrap flex-col gap-4">
                    {loading ? (
                        <Spinner color="warning" />
                    ) : (
                        <Button color="success" onPress={sendRequest}>
                            Send
                        </Button>
                    )}
                    {requestWasSent && (
                        <div className="flex flex-col gap-4">
                            <h2>Response details:</h2>
                            <Code className="text-wrap max-w-96	">
                                <p>Response Code: {responseCode}</p>
                                <p>Response Time: {responseTime}ms</p>
                                <p>Response Size: {responseSize} bytes</p>
                            </Code>
                            <h2>Response headers:</h2>
                            <Code className="text-wrap max-w-96	">
                                <p>{responseHeaders}</p>
                            </Code>
                            <h2>Response body:</h2>
                            <Code className="text-wrap max-w-96	">
                                <p>{responseBody}</p>
                            </Code>
                        </div>
                    )}
                </CardFooter>
            </NextUICard>
        </Draggable>
    );
};

export const HttpRequestCard = ({
    id,
    title,
    description,
    method,
    url,
    params,
    body,
}: FormRequestCardType) => {
    return (
        <GenericCard
            id={id}
            title={title}
            description={description}
            requestArgs={{
                method: method,
                url: url,
                params: params,
                body: body,
            }}>
            <CardBody>
                <h2>{method}</h2>
                <h2>{url}</h2>
                <h2>{params}</h2>
                <h2>{body}</h2>
            </CardBody>
        </GenericCard>
    );
};

export const CurlRequestCard = ({
    id,
    title,
    description,
    curl,
}: CurlRequestCardType) => {
    return (
        <GenericCard
            id={id}
            title={title}
            description={description}
            requestArgs={{ curl: curl }}>
            <CardBody>
                <Code>{curl}</Code>
            </CardBody>
        </GenericCard>
    );
};
