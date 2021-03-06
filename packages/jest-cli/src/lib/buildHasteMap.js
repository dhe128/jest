/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

import type {Config} from 'types/Config';
import type {HasteResolverContext} from 'jest-resolve';

const createHasteMap = require('./createHasteMap');
const createResolver = require('./createResolver');
const utils = require('jest-util');

export type Options = {
  maxWorkers: number,
};

module.exports = function buildHasteMap(
  config: Config,
  options: Options,
): Promise<HasteResolverContext> {
  utils.createDirectory(config.cacheDirectory);
  const instance = createHasteMap(config, {
    resetCache: !config.cache,
    maxWorkers: options.maxWorkers,
  });
  return instance.build().then(moduleMap => ({
    instance,
    moduleMap,
    resolver: createResolver(config, moduleMap),
  }));
};
