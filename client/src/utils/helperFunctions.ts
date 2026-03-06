const renderNumberWithAbbreviations = (number: number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  }
  return number.toString();
};

function timeDifference(pastTime: string | number | Date) {
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - new Date(pastTime).getTime()) / 1000,
  );

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
}

function formatDate(dateString: string | number | Date) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

function formatNumber(number: number) {
  if (number >= 1e9) {
    return (number / 1e9).toFixed(1) + "b";
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(1) + "m";
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(1) + "k";
  } else {
    return number.toString();
  }
}

export interface CustomError extends Error {
  status?: number;
  details?: any;
}

const throwError = (message: string, status: number, details: any = null) => {
  const error = new Error(message) as CustomError;
  error.status = status;
  error.details = details;
  throw error;
};

export {
  throwError,
  timeDifference,
  formatDate,
  formatNumber,
  renderNumberWithAbbreviations,
};

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
