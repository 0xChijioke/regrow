export function formatTime(timestamp: number) {
  const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
  const timeDiff = currentTime - timestamp;

  // Convert time difference to appropriate format
  if (timeDiff < 60) {
    return `${timeDiff} seconds ago`;
  } else if (timeDiff < 3600) {
    const minutes = Math.floor(timeDiff / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDiff < 86400) {
    const hours = Math.floor(timeDiff / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    // Use Date object to format timestamp into a readable date
    const date = new Date(timestamp * 1000);
    return date.toDateString(); // Adjust this line for your specific date format needs
  }
}
