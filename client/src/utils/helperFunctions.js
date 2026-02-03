const renderNumberWithAbbreviations = (number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  }
  return number.toString();
};

function timeDifference(pastTime) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(pastTime)) / 1000);

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

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function formatNumber(number) {
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

const throwError = (message, status, details = null) => {
  const error = new Error(message);
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
