console.log("executed in env.js");
(function (window) {
  window["env"] = window["env"] || {};

  // Environment variables
  window["env"]["backendBaseUrl"] = "${BACKEND_BASE_URL}";
})(this);
