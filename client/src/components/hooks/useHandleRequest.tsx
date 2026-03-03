"use client";

import { useState, useRef } from "react";
import { throwError } from "../../utils/helperFunctions";

type RequestError = {
  status: number;
  message: string;
  details?: unknown;
};

const useHandleRequest = () => {
  const throwTyped = throwError as unknown as (
    message: string,
    status: number,
    details?: unknown,
  ) => never;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null); // the timeout interval for refetching in case of a connection error

  //refetch
  function refetch(cb: () => void) {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(cb, 4000);
    }
  }

  //stop the refetching
  function stopRefetching() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  //req handler
  async function handleRequest(
    req: Request,
    cb?: (data: unknown) => void,
    onError?: (err: RequestError) => void,
  ) {
    setIsLoading(true);
    try {
      try {
        const clonedReq = req.clone();
        const res = await fetch(clonedReq);
        stopRefetching();

        if (!res.ok) {
          if (res.status === 404) throwTyped("NOT_FOUND", 404);
          const err = (await res.json()) as { message?: string; details?: unknown };
          throwTyped(err?.message ?? "REQUEST_FAILED", res.status, err?.details);
        }

        const data = (await res.json()) as unknown;
        if (cb) cb(data);
        setIsLoading(false);
      } catch (err) {
        throwTyped("INTERNET_ERROR", 503);
      }
    } catch (error) {
      const err = error as Partial<RequestError>;

      if (err.status === 503) {
        stopRefetching();
        refetch(() => void handleRequest(req, cb, onError));
      } else {
        setIsLoading(false);
        stopRefetching();
        if (onError)
          onError({
            status: err?.status ?? 500,
            message: err?.message ?? "Unknown Error occurred",
            details: err?.details ?? "",
          });
      }
    }
  }

  return { handleRequest, isLoading, setIsLoading, intervalRef };
};
export default useHandleRequest;
