export const get_web_api_url = (loc) => {
  switch (loc.hostname) {
    case "localhost":
    case "127.0.0.1":
      return "http://localhost:8000/api";
    default:
      return "https://admin.longevityknowledge.app/api";
  }
};

export const RECAPTCHA_SECRET_KEY = "6LfuXdkmAAAAANrcSZY1LkaUSxDvyBpiSqvmvTO-";
export const RECAPTCHA_SITE_KEY = "6LfuXdkmAAAAAKEGNxd3xs-wFQjzb4FYVTUB6wO-";
