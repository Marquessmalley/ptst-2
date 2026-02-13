import { BookingProvider } from '@/context/BookingContext';
import { useBookingInfo } from '@/hooks/useBookingInfo';
import { BookingInfo } from '@/lib/definitions/definitions';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const DummyComponent = () => {
  const { bookingInfo, setBookingInfo } = useBookingInfo();

  return (
    <div>
      <p data-testid="selectedVehicle">{bookingInfo.selectedVehicle}</p>
      <button
        onClick={() =>
          setBookingInfo((prevBookingInfo: BookingInfo) => ({
            ...prevBookingInfo,
            selectedVehicle: 'Sedan',
          }))
        }
      >
        Add Vehicle
      </button>
    </div>
  );
};
describe('Booking Provider test', () => {
  it('Has bookingInfo values', () => {
    const { getByTestId } = render(
      <BookingProvider>
        <DummyComponent />
      </BookingProvider>,
    );
    const selectedVehicle = getByTestId('selectedVehicle');

    expect(selectedVehicle).toHaveTextContent('');
  });

  it('Updates our Booking state with correct value', async () => {
    const { getByTestId, getByRole } = render(
      <BookingProvider>
        <DummyComponent />
      </BookingProvider>,
    );

    const btn = getByRole('button', { name: 'Add Vehicle' });
    await userEvent.click(btn);

    const selectedVehicle = getByTestId('selectedVehicle');

    expect(selectedVehicle).toHaveTextContent('Sedan');
  });
});
