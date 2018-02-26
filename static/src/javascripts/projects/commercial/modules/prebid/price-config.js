// @flow

import type {PrebidPriceGranularity} from 'commercial/modules/prebid/types';

export const priceGranularity: PrebidPriceGranularity = {
    "buckets": [
        {
            "precision": 2,
            "min": 0,
            "max": 5,
            "increment": 0.01
        },
        {
            "precision": 2,
            "min": 5,
            "max": 8,
            "increment": 0.05
        },
        {
            "precision": 2,
            "min": 8,
            "max": 20,
            "increment": 0.5
        }
    ]
};
