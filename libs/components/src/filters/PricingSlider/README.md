# PriceInput Component

A simplified price filtering component with manual input fields only.

## Overview

The PriceInput component (formerly PricingSlider) provides basic price range filtering functionality through manual number inputs. All slider functionality has been removed for simplicity.

## Features

- ✅ **Manual Price Inputs**: Min and max price input fields
- ✅ **Conditional Activation**: Only enabled when "Paid" pricing option is selected
- ✅ **Value Validation**: Automatic clamping to valid ranges
- ✅ **Redux Integration**: Real-time updates to price range state
- ✅ **Bootstrap Styling**: Dark theme with consistent styling
- ✅ **Visual Feedback**: Clear display of current price range

## Usage

```tsx
import { PriceInput, PricingSlider } from '@connectstore/components';

// New component name
<PriceInput />

// Legacy name (backward compatible)
<PricingSlider />

// With custom className
<PriceInput className="my-custom-class" />
```

## Component Interface

```tsx
interface PriceInputProps {
  className?: string;
}
```

## State Management

The component integrates with Redux through:

- `selectPriceRange` - Current price range from store
- `selectPricingOptions` - Current pricing options (checks for PAID)
- `setPriceRange` - Updates price range in store

## Price Validation

- **Min Price**: 0 to (current max)
- **Max Price**: (current min) to 999
- **Auto-clamping**: Invalid values are automatically corrected
- **Real-time updates**: Changes immediately update Redux store

## Visual States

1. **Disabled**: When "Paid" option not selected (opacity reduced, inputs disabled)
2. **Active**: When "Paid" option selected (full interaction enabled)
3. **Filtering**: Shows active filter indicator when range is not default

## Cleanup Changes

This component was simplified by removing:

- ❌ **MUI Dependencies**: @mui/material, @emotion/\* packages removed
- ❌ **Range Sliders**: All slider functionality removed
- ❌ **Complex Styling**: Custom slider themes and animations
- ❌ **Dual-handle Logic**: Simplified to basic input validation

## Bundle Impact

- **Before**: 471.58 kB (with MUI)
- **After**: 374.63 kB (MUI removed)
- **Savings**: ~97 kB reduction in bundle size

## File Structure

```
PricingSlider/
├── PricingSlider.tsx    # Main component (renamed to PriceInput)
└── README.md           # This documentation
```

## Backward Compatibility

The component maintains backward compatibility by exporting both names:

- `PriceInput` - New preferred name
- `PricingSlider` - Legacy name (alias)

Existing imports will continue to work without changes.
