export interface KeyValuePair {
  id: number;
  createdOn: Date;
  lastModified: Date;
  keyType: string;
  value: string;
}

export interface ReservoirDetails {
  id: number;
  createdOn: Date;
  lastModified: Date;
  name: string;
  region: string;
  keyValuePairs: KeyValuePair[];
}

export interface Reservoir {
  name: string;
  region: string;
}
