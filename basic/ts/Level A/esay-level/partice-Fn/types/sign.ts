type Reservation = {
  from: Date;
  toDate: string | Date;
  destination: string;
};

type Reserve = (
  from: Date,
  toDate: string | Date,
  destination: string,
) => Reservation;

var fun: Reserve = (from, toDate, destination) => {
  return {
    from,
    toDate,
    destination,
  };
};
