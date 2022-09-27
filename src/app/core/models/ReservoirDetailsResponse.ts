export interface ReservoirDetailsResponseDto {
  id: number;
  createdOn: Date;
  lastModified: Date;
  reservoir: ReservoirDto;
  user: UserDto;
  fullHeight: number;
  capacity: number;
  presentDepthOfStorage: number;
  presentStorage: number;
  inflow: number;
  outflow: number;
  rainfall: number;
  date: Date;
}

export interface ReservoirDto {
  id: number;
  createdOn: Date;
  lastModified: Date;
  fullHeight: number;
  capacity: number;
  name: string;
  region: string;
}

export interface UserDto {
  id: number;
  username: string;
  email: string;
  phone: string;
  name: string;
  businessTitle: string;
  roles: RoleDto[];
  reservoirs: ReservoirDto[];
}

export interface RoleDto {
  id: number;
  name: string;
  description: null;
}
