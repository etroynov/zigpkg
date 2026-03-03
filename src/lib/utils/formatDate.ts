export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  switch (true) {
    case diffDays === 0:
      return "today";
    case diffDays === 1:
      return "yesterday";
    case diffDays < 7:
      return `${diffDays} days ago`;
    case diffDays < 30:
      return `${Math.floor(diffDays / 7)} weeks ago`;
    case diffDays < 365:
      return `${Math.floor(diffDays / 30)} months ago`;
    default:
      return `${Math.floor(diffDays / 365)} years ago`;
  }
};
