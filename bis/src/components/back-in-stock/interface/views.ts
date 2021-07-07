interface APIResponse {
    "Estimated Shipment": EstimatedShipment[];
    "Estimated Shipdate": string;
    inventory: string;
    error: string;
}
interface EstimatedShipment {
    date:  string;
    units: string;
}

const defaultResponse:APIResponse = {
    "Estimated Shipment": [{ date: "0000-00-00", units: '0' }],
    "Estimated Shipdate": "0000-00-00",
    inventory: '0',
    error: ''
} 

export { APIResponse, defaultResponse };