import { z } from "zod";
import jwt from "jsonwebtoken";
import express, { Router } from "express";

const brainRouter = Router();

brainRouter.post("/share", (req, res) => { })

brainRouter.get("/:shareLink", (req, res) => { })

export { brainRouter }