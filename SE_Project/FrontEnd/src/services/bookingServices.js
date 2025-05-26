import api from "./api";

export const createBooking = async (eventId, quantity) => {
  try {
    const response = await api.post("/bookings", {
      eventId,
      numberOfTickets: quantity,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Booking failed");
  }
};

export const fetchUserBookings = async () => {
  try {
    const response = await api.get("/users/bookings");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to load bookings");
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    await api.delete(`/bookings/${bookingId}`);
  } catch (error) {
    throw new Error(error.response?.data?.error || "Cancellation failed");
  }
};
