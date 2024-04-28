export const getWebApiUrl = () => {
  const loc = document.location;
  switch (loc.hostname) {
    case "localhost" || "127.0.0.1":
      return "http://localhost:8000/api";
    default:
      return `https://${loc.hostname}/api`;
  }
};

export const RECAPTCHA_SECRET_KEY = "6LfuXdkmAAAAANrcSZY1LkaUSxDvyBpiSqvmvTO-";
export const RECAPTCHA_SITE_KEY = "6LfuXdkmAAAAAKEGNxd3xs-wFQjzb4FYVTUB6wO-";
