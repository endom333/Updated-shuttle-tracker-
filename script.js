
document.addEventListener("DOMContentLoaded", function () {

  const buses = [
    {
      id: "BUS-001",
      driver: "Driver A",
      route: "Main Gate - Library",
      status: "Moving"
    },
    {
      id: "BUS-002",
      driver: "Driver B",
      route: "Hostel - Faculty of Science",
      status: "Moving"
    },
    {
      id: "BUS-003",
      driver: "Driver C",
      route: "Administrative Block - Hostel",
      status: "Stationary"
    }
  ];

  const busList = document.getElementById("busList");
  const busDetails = document.getElementById("busDetails");

  if (!busList || !busDetails) {
    console.error("Required HTML elements were not found!");
    return;
  }

  function displayBuses() {

    busList.innerHTML = "";

    buses.forEach((bus) => {

      const item = document.createElement("div");

      item.className = "bus-item";

      item.innerHTML = `
        <strong>${bus.id}</strong>
        <p>${bus.route}</p>
        <span>${bus.status}</span>
      `;

      item.addEventListener("click", () => {
        showDetails(bus);
      });

      busList.appendChild(item);

    });

    document.getElementById("totalBuses").textContent =
      buses.length;

    document.getElementById("movingBuses").textContent =
      buses.filter(bus => bus.status === "Moving").length;

    document.getElementById("stoppedBuses").textContent =
      buses.filter(bus => bus.status === "Stationary").length;
  }

  function showDetails(bus) {

    busDetails.innerHTML = `
      <h3>${bus.id}</h3>
      <p><strong>Driver:</strong> ${bus.driver}</p>
      <p><strong>Route:</strong> ${bus.route}</p>
      <p><strong>Status:</strong> ${bus.status}</p>
    `;

  }

  displayBuses();

  console.log("Shuttle Tracker loaded successfully!");
  

// GPS TRACKING SYSTEM

const startButton = document.getElementById("startTracking");
const stopButton = document.getElementById("stopTracking");

const gpsStatus = document.getElementById("gpsStatus");
const latitudeDisplay = document.getElementById("latitude");
const longitudeDisplay = document.getElementById("longitude");
const accuracyDisplay = document.getElementById("accuracy");

let watchID = null;
// INITIALIZE OUR MAP
const map = L.map("map").setView([6.5244, 3.3792], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
let userMarker = null;
function updateMapLocation(latitude, longitude) {
    const position = [latitude, longitude];

    if (userMarker === null) {
        userMarker = L.marker(position).addTo(map);
        userMarker.bindPopup("Your Current Location");
    } else {
        userMarker.setLatLng(position);
    }

    map.setView(position, 16);
}
// Start GPS tracking
startButton.addEventListener("click", function () {

  if (!navigator.geolocation) {
    gpsStatus.textContent = "GPS is not supported by this browser.";
    return;
  }

  gpsStatus.textContent = "Requesting GPS permission...";

  startButton.disabled = true;

  watchID = navigator.geolocation.watchPosition(

    function (position) {

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      latitudeDisplay.textContent = latitude.toFixed(6);
      longitudeDisplay.textContent = longitude.toFixed(6);
      accuracyDisplay.textContent = accuracy.toFixed(1) + " metres";
updateMapLocation(latitude, longitude);
      gpsStatus.textContent = "GPS tracking active";

      stopButton.disabled = false;

    },

    function (error) {
  gpsStatus.textContent =
    "Error code: " + error.code + " - " + error.message;

  startButton.disabled = false;

  console.error("GPS Error:", error.code, error.message);
},

    {
  enableHighAccuracy: false,
  maximumAge: 0,
  timeout: 60000
}

  );

});

// Stop GPS tracking
stopButton.addEventListener("click", function () {

  if (watchID !== null) {
    navigator.geolocation.clearWatch(watchID);
    watchID = null;
  }

  gpsStatus.textContent = "GPS tracking stopped";

  startButton.disabled = false;
  stopButton.disabled = true;

});

});
