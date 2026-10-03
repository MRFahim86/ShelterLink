import { useCarbonFootprint } from "react-carbon-footprint";

const CarbonFootprintDisplay = () => {
  const [gCO2, bytesTransferred] = useCarbonFootprint();

  return (
    <div>
      <h3>Network Carbon Footprint</h3>
      <p>Bytes Transferred: {bytesTransferred} bytes</p>
      <p>CO2 Emissions: {gCO2.toFixed(2)} grams CO2eq</p>
    </div>
  );
};

export default CarbonFootprintDisplay;