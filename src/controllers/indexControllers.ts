import axios from 'axios';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';

import { Country } from '@/models/Country';
import { CountryDetailed } from '@/models/CountryDetailed';
import { CountryFlagRequest } from '@/models/CountryFlag';
import { CountryPopulationRequest } from '@/models/CountryPopulation';

// I could've made a wrapper or used a library for try-catch, but this project at the moment is way too small for this

export const getAllCountries = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const data = await axios
      .get('https://date.nager.at/api/v3/AvailableCountries')
      .then(({ data }) => data as Country[]);

    res
      .setHeader('Access-Control-Allow-Origin', `http://localhost:${process.env.FRONTEND_PORT}`)
      .status(200)
      .json(data);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getCountryInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { countryCode } = req.params as { countryCode: string };

    const countryDetails = await axios
      .get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`)
      .then(({ data }) => data as CountryDetailed)
      .catch(() => null);

    const population = await axios
      .post('https://countriesnow.space/api/v0.1/countries/population', {
        country: countryDetails?.commonName,
      })
      .then(({ data }) => (data as CountryPopulationRequest).data.populationCounts)
      .catch(() => null);

    const flagUrl = await axios
      .post('https://countriesnow.space/api/v0.1/countries/flag/images', {
        iso2: countryCode,
      })
      .then(({ data }) => (data as CountryFlagRequest).data.flag)
      .catch(() => null);

    res
      .setHeader('Access-Control-Allow-Origin', `http://localhost:${process.env.FRONTEND_PORT}`)
      .status(200)
      .json({ flagUrl, population, ...countryDetails });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
