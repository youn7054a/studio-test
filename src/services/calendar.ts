/**
 * Represents an appointment with a title, start date, and end date.
 */
export interface Appointment {
  /**
   * The title of the appointment.
   */
  title: string;
  /**
   * The start date and time of the appointment.
   */
  start: Date;
  /**
   * The end date and time of the appointment.
   */
  end: Date;
}

/**
 * Asynchronously retrieves a list of appointments within a specified date range.
 *
 * @param startDate The start date of the range.
 * @param endDate The end date of the range.
 * @returns A promise that resolves to an array of Appointment objects.
 */
export async function getAppointments(
  startDate: Date,
  endDate: Date
): Promise<Appointment[]> {
  // TODO: Implement this by calling an API.
  return [
    {
      title: 'Sample Appointment',
      start: new Date(),
      end: new Date(),
    },
  ];
}
