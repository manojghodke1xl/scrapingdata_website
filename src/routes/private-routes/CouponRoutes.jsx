import { lazy } from 'react';

// Lazy load the CouponList component
const CouponList = lazy(() => import('../../pages/coupon/CouponList'));
// Lazy load the AddCoupon component
const AddCoupon = lazy(() => import('../../pages/coupon/AddCoupon'));

// Define the routes for the coupons feature
const CouponRoutes = [
  // Route to display the list of coupons
  { path: 'coupon/coupon-list', Component: CouponList },
  // Route to add a new coupon
  { path: 'coupon/add-coupon', Component: AddCoupon },
  // Route to edit an existing coupon
  { path: 'coupon/edit-coupon/:id', Component: AddCoupon },
  // Route to duplicate an existing coupon
  { path: 'coupon/duplicate-coupon/:id', Component: AddCoupon }
];

// Export the CouponRoutes array as the default export
export default CouponRoutes;
