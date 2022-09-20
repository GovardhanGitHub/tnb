export interface ReservoirEveryDayUpdateDto {
  id: number;
  reservoirId: number;
  userId: number;

  date : string;
  fullHeight: number;
  capacity: number;
  presentDepthOfStorage: number;
  presentStorage: number;
  inflow: number;
  outflow: number;
  rainfall: number;
}
export interface ReservoirDto {
  id: number;
}
export interface UserRequestDto {
  id: number;
  username: string;
}
