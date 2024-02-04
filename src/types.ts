export type Driver = {
  id: number;
  name: string;
  location: string;
};

export type Tour = {
  id: number;
  customerName: string;
  shipmentDate: string;
  fromLocation: string;
  toLocation: string;
  assignedDriver: number;
};
