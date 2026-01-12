/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

// FIX: Augment the global JSX namespace directly.
// We add an index signature to ensure standard HTML elements and R3F elements are recognized.
// This bypasses issues where 'ThreeElements' is a type alias and cannot be extended by an interface.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
