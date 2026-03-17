import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function DeliveryMap({ driverLocation, destination }) {
  if (!driverLocation || !destination) {
    return <p className="text-gray-500 mt-4">Location not available</p>;
  }

  const center = [
    (driverLocation[0] + destination[0]) / 2,
    (driverLocation[1] + destination[1]) / 2,
  ];

  return (
    <div className="h-72 w-full rounded-xl overflow-hidden mt-6">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Driver Marker */}

        <Marker position={driverLocation}>
          <Popup>🚚 Delivery Partner</Popup>
        </Marker>

        {/* Customer Marker */}

        <Marker position={destination}>
          <Popup>📦 Your Address</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
