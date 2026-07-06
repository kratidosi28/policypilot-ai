import {drizzle} from 'drizzle-orm/node-postgres'
import { database } from '../config/db'
import * as schema from './schema.js'

export const db = drizzle(database, { schema })