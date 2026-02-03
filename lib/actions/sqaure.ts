'use server';

import { Square } from 'square';
import { client } from '@/lib/api/sqaure';
import { replace } from '@/lib/utils/bigIntHandler';
import { BookingInfo } from '@/lib/definitions/definitions';
import removeUnavailableSlot from '@/lib/utils/removeUnavailableSlot';

export async function searchAvailabilities(bookingInfo: BookingInfo, selectedDate: string) {

    const { teamMmebers, variationId, serviceDuration } = bookingInfo.selectedPackage;
    const endAt = selectedDate.split('T')[0];

    try {
        const memberAvailabilites = await client.bookings.searchAvailability({
            query: {
                filter: {
                    locationId: process.env.SQUARE_LOCATION_ID,
                    segmentFilters: [
                        {
                            serviceVariationId: variationId,
                            teamMemberIdFilter: {
                                any: teamMmebers,
                            },
                        },
                    ],
                    startAtRange: {
                        startAt: `${selectedDate}`,
                        endAt: `${endAt}T24:00:00.000Z`,
                    },
                },
            },
        });

        const existingBookings = await client.bookings.list({
            locationId: process.env.SQUARE_LOCATION_ID,
        });

        const openSlots = removeUnavailableSlot(
            existingBookings,
            memberAvailabilites,
            serviceDuration,
        );

        // Handle BigInt serialization and return plain data                                                                                                                                                                                                          
        return JSON.parse(JSON.stringify(openSlots, replace));
    } catch (error) {
        console.log(error);
        return Response.json({
            error: 'There was a error fetching the availabilites.',
        });
    }
}

export async function listServices() {
    try {
        const serviceList = await client.catalog.list({ types: 'ITEM' });
        const { data } = serviceList;

        // Handle BigInt serialization and return plain data                                                                                                                                                                                                          
        return JSON.parse(JSON.stringify({ data }, replace));
    } catch (error) {
        console.log(error);
        return Response.json({ error: 'There was a error fetching the services.' });
    }
}


export async function createBooking(bookingInfo: BookingInfo, selectedDate: string) {


    const {
        firstName,
        lastName,
        email,
        address,
        city,
        state,
        postalCode,
        country,
    } = bookingInfo.userInfo;
    const { variationId, variationVersion, teamMembers } = bookingInfo.selectedPackage;

    try {
        // Waterfall method because first request is dependant on the second
        // Create customer first


        const customer = await client.customers.create({
            givenName: firstName,
            familyName: lastName,
            emailAddress: email,
            address: {
                addressLine1: address,
                locality: city,
                administrativeDistrictLevel1: state,
                postalCode: postalCode,
                country: country.toUpperCase() as Square.Country,
            },
        });

        // create booking
        const booking = await client.bookings.create({
            booking: {
                appointmentSegments: [
                    {
                        teamMemberId: teamMembers[1],
                        serviceVariationId: variationId,
                        serviceVariationVersion: BigInt(variationVersion),
                    },
                ],
                locationId: process.env.SQUARE_LOCATION_ID,
                locationType: 'BUSINESS_LOCATION',
                customerId: customer.customer?.id,
                startAt: `${selectedDate}`,
            },
        });

        return JSON.parse(JSON.stringify({ booking }, replace));
    } catch (err) {
        console.log('The error: ', err);
    }
}