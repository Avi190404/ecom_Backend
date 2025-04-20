import { Router } from "express";
import ProductRoutes from "./productRoutes";
import UserRoutes from "./userRoutes";
import CartRoutes from "./cartRoutes";
import wishListRoutes from "./wishListRouets";

const router = Router();

router.use(ProductRoutes);
router.use(UserRoutes);
router.use(CartRoutes);
router.use(wishListRoutes);

export default router;