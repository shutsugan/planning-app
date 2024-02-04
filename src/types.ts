export type Driver = {
  id: number;
  name: string;
  locaion: string;
};

export type Tour = {
  id: number;
  customerName: string;
  shipmentDate: Date;
  fromLocation: string;
  toLocation: string;
  assignedDriver: number;
};
