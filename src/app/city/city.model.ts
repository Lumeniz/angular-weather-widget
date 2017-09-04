/**
 * Created by Тим on 31.08.2017.
 */

import { Coord } from "./coord.model";

export interface City{
    id: number;
    name: string;
    aww_id: number;
    country: string;
    coord: Coord;
}