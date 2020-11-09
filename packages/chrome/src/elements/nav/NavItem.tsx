/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { StyledNavItem, StyledLogoNavItem, StyledBrandmarkNavItem } from '../../styled';
import { PRODUCT, PRODUCTS } from '../../utils/types';
import { useNavContext } from '../../utils/useNavContext';
import { useChromeContext } from '../../utils/useChromeContext';

interface INavItemProps extends HTMLAttributes<any> {
  /** Sets a product-specific color palette */
  product?: PRODUCT;
  /** Adds the current item to the nav */
  isCurrent?: boolean;
  /** Adds a product logo to the item */
  hasLogo?: boolean;
  /** Adds a brandmark to the item */
  hasBrandmark?: boolean;
}

/**
 * Accepts all `<button>` attributes and events
 */
export const NavItem = React.forwardRef<any, INavItemProps>(
  ({ hasLogo, hasBrandmark, product, ...other }, ref) => {
    const { hue, isLight, isDark } = useChromeContext();
    const { isExpanded } = useNavContext();

    if (hasLogo) {
      return (
        <StyledLogoNavItem
          ref={ref}
          isDark={isDark}
          isLight={isLight}
          product={product}
          {...other}
        />
      );
    }

    if (hasBrandmark) {
      return <StyledBrandmarkNavItem ref={ref} {...other} />;
    }

    return (
      <StyledNavItem
        tabIndex={0}
        ref={ref}
        isExpanded={isExpanded}
        hue={hue}
        isDark={isDark}
        isLight={isLight}
        {...other}
      />
    );
  }
);

NavItem.displayName = 'NavItem';

NavItem.propTypes = {
  product: PropTypes.oneOf(PRODUCTS),
  hasLogo: PropTypes.bool,
  hasBrandmark: PropTypes.bool,
  isCurrent: PropTypes.bool
};
