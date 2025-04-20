import { Request, Response, Router } from "express";
import USERS from "../schema/userSchema";
import PRODUCTS from "../schema/productSchema";

const router = Router();

router.post("/cart/add", async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, userId, quantity, size, action } = req.body;

    if (!productId || !userId || !quantity || !size) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const user = await USERS.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const exsistProductIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (exsistProductIndex !== -1) {
      if (action === "increment") {
        user.cart[exsistProductIndex].count += 1;
      } else if (action === "decrement") {
        user.cart[exsistProductIndex].count -= 1;

        if (user.cart[exsistProductIndex].count <= 0) {
          user.cart.splice(exsistProductIndex, 1);
        }
      }

      await user.save();
      res.status(200).json({ message: "Cart updated" });
    } else {
      user.cart.push({
        product: productId,
        count: quantity,
        size: size,
      });

      await user.save();
      res.status(200).json({ message: "Cart Saved" });
    }

    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

router.post("/cart/remove", async (req: Request, res: Response): Promise<void> => {
    try {
      const { productId, userId, size } = req.body;

      if (!productId || !userId || !size) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }

      const user = await USERS.findByIdAndUpdate(
        userId,
        {
          $pull: {
            cart: {
              product: productId,
              size: size,
            },
          },
        },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({ massage: "Product removed from cart" });
      return;
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
);

router.get("/cart/:userId", async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;

      const user = await USERS.findById(userId).populate("cart.product");

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(user.cart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
);

router.post("/cart/clear", async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;

    const user = await USERS.findByIdAndUpdate(
      userId,
      { cart: [] },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

export default router;
