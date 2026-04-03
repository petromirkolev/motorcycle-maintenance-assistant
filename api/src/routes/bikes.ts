import { Router } from 'express';
import { CreateBikeBody } from '../types/bike';
import {
  isIntegerInRange,
  isNonNegativeInteger,
  normalizeString,
} from '../utils/validation';
import {
  createBike,
  deleteBike,
  findBikeById,
  listBikesByUserId,
  updateBike,
} from '../services/bikes-service';
import {
  BIKE_EXISTS,
  ADD_BIKE_PARAMS_REQ,
  ODO_ERROR,
  USER_ID_REQ,
  YEAR_ERROR,
  UPDATE_BIKE_PARAMS_REQ,
  INVALID_YEAR_ERROR,
  BIKE_NOT_FOUND,
  ODO_DECR_ERROR,
  BIKE_UPDATE_SUCCESS,
  BIKE_DELETE_SUCCESS,
  DELETE_BIKE_PARAM_REQ,
} from '../constants/bikes';
import { INTERNAL_SERVER_ERROR } from '../constants/auth';

const bikesRouter = Router();

bikesRouter.get('/', async (req, res) => {
  const user_id = String(req.query.user_id ?? '').trim();

  if (!user_id) {
    res.status(400).json({ error: USER_ID_REQ });
    return;
  }

  try {
    const bikes = await listBikesByUserId(user_id);
    res.json({ bikes });
  } catch (error) {
    console.error('List bikes failed:', error);
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
});

bikesRouter.post('/', async (req, res) => {
  const body = (req.body ?? {}) as CreateBikeBody;

  const user_id = normalizeString(body.user_id);
  const make = normalizeString(body.make);
  const model = normalizeString(body.model);
  const year = body.year;
  const odo = body.odo;

  const user_bikes = await listBikesByUserId(user_id);

  const bikeAlreadyExists = user_bikes.some((bike) => {
    return (
      bike.make === make &&
      bike.model === model &&
      bike.year === year &&
      bike.odo === odo
    );
  });

  if (bikeAlreadyExists) {
    res.status(400).json({ error: BIKE_EXISTS });
    return;
  }

  if (!user_id || !make || !model || year === undefined || odo === undefined) {
    res.status(400).json({ error: ADD_BIKE_PARAMS_REQ });
    return;
  }

  if (!isIntegerInRange(year, 1900, 2100)) {
    res.status(400).json({ error: YEAR_ERROR });
    return;
  }

  if (!isNonNegativeInteger(odo)) {
    res.status(400).json({ error: ODO_ERROR });
    return;
  }

  try {
    const id = await createBike({
      user_id,
      make,
      model,
      year,
      odo,
    });

    res
      .status(201)
      .json({ message: 'Bike created successfully', bike: { id } });
  } catch (error) {
    console.error('Create bike failed:', error);
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
});

bikesRouter.put('/:id', async (req, res) => {
  const bike_id = req.params.id;
  const body = (req.body ?? {}) as CreateBikeBody;
  const user_id = normalizeString(body.user_id);
  const make = normalizeString(body.make);
  const model = normalizeString(body.model);
  const year = body.year;
  const odo = body.odo;

  if (
    !bike_id ||
    !user_id ||
    !make ||
    !model ||
    year === undefined ||
    odo === undefined
  ) {
    res.status(400).json({ error: UPDATE_BIKE_PARAMS_REQ });
    return;
  }

  if (year !== undefined && (year < 1900 || year > 2100)) {
    {
      res.status(400).json({ error: INVALID_YEAR_ERROR });
      return;
    }
  }

  const existingBike = await findBikeById(bike_id);

  if (!existingBike) {
    res.status(404).json({ error: BIKE_NOT_FOUND });
    return;
  }

  if (odo < existingBike.odo) {
    res.status(400).json({ error: ODO_DECR_ERROR });
    return;
  }

  try {
    await updateBike({
      id: bike_id,
      user_id,
      make: make.trim(),
      model: model.trim(),
      year: Number(year),
      odo: Number(odo),
    });

    res.json({ message: BIKE_UPDATE_SUCCESS });
  } catch (error) {
    console.error('Update bike failed:', error);
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
});

bikesRouter.delete('/:id', async (req, res) => {
  const bike_id = req.params.id;
  const user_id = String(req.query.user_id ?? '').trim();

  if (!bike_id || !user_id) {
    res.status(400).json({ error: DELETE_BIKE_PARAM_REQ });
    return;
  }

  try {
    await deleteBike({
      id: bike_id,
      user_id,
    });

    res.json({ message: BIKE_DELETE_SUCCESS });
  } catch (error) {
    console.error('Delete bike failed:', error);
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
});

export default bikesRouter;
