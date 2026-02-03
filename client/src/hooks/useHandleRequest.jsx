import { useState, useRef } from "react";
import { throwError } from "../utils/helperFunctions";

const useHandleRequest = () => {
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef(); // the timeout interval for refetching in case of a connection error

  //refetch
  function refetch(cb) {
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
  async function handleRequest(req, cb, onError) {
    setIsLoading(true);
    try {
      let res;
      try {
        const clonedReq = req.clone();
        res = await fetch(clonedReq);
      } catch (err) {
        throwError("INTERNET_ERROR", 503);
      }
      stopRefetching();
      if (!res.ok) {
        if (res.status == 404) throwError("NOT_FOUND", 404);
        const err = await res.json();
        throwError(err?.message, res.status, err?.details);
      }
      const data = await res.json();
      if (cb != null) cb(data);
      setIsLoading(false);
    } catch (error) {
      if (error.status == 503) {
        stopRefetching();
        refetch(() => handleRequest(req, cb, onError));
      } else {
        setIsLoading(false);
        stopRefetching();
        if (onError != null)
          onError({
            status: error?.status || 500,
            message: error?.message || "Unknown Error occurred",
            details: error?.details || "",
          });
      }
    }
  }

  return { handleRequest, isLoading, setIsLoading, intervalRef };
};
export default useHandleRequest;
