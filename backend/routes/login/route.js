import { Router } from "express";

export const router=Router()

router.get("/users", (req, res) => {
  res.send("List of Users");
});